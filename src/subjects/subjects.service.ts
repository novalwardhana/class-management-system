import { HttpStatus, Injectable } from '@nestjs/common';
import { SubjectRepository } from './repository/subject.repository';
import { ClassRepository } from '../classes/repository/class.repository'
import { Subject } from './entity/subject.entity';
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { ErrorResponse } from "./response/error.response"
import * as moment from "moment-timezone"
import { FilterSubjectDto } from './dto/filter-subject.dto';

@Injectable()
export class SubjectsService {

    constructor(
        private readonly subjectRepository: SubjectRepository,
        private readonly classRepository: ClassRepository,
    ) {}

    async getDatas(filterSubjectDto: FilterSubjectDto): Promise<any> {
        try {

            const page = parseInt(filterSubjectDto.page)
            const limit = parseInt(filterSubjectDto.limit)
            const offset = (page - 1) * limit

            const total = await this.subjectRepository.getTotalDatas()
            const total_page = Math.ceil(total/limit)

            const subjectDatas = await this.subjectRepository.getDatas(limit, offset)
            return {
                page: page,
                per_page: limit,
                total_page: total_page,
                total_data: total,
                data: subjectDatas
            }
        } catch(e) {
            throw new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.message)
        }
    }

    async getData(id: string): Promise<Subject> {
        try {
            const data = await this.subjectRepository.findOneBy({'subject_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Subject data with subject_id: ${id} is not found`)
            }
            return data
        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

    async createData(createSubjectDto: CreateSubjectDto): Promise<CreateSubjectDto> {
        try {
            await this.subjectRepository.createData(createSubjectDto)
            return createSubjectDto
        } catch(e) {
            throw new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.message)
        }
    }

    async deleteData(id: string): Promise<void> {
        try {
            const data = await this.subjectRepository.findOneBy({'subject_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Subject data with subject_id: ${id} is not found`)
            }

            
            const countClassData = await this.classRepository.countBy({'reference_subject_id': id})
            if (countClassData > 0) {
                throw new ErrorResponse(HttpStatus.NOT_ACCEPTABLE, `Cannot delete subject data, subject_id: ${id} already used in class collection`)
            }

            await this.subjectRepository.delete({subject_id: id})
        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

    async updateData(id: string, updateSubjectDto: UpdateSubjectDto): Promise<UpdateSubjectDto> {
        try {
            const data = await this.subjectRepository.findOneBy({'subject_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Subject data with subject_id: ${id} is not found`)
            }
            
            const { name, description, level } = updateSubjectDto
            data.name = name
            data.description = description
            data.level = level
            data.updated_at = moment().add(7, 'hours').toDate()

            await data.save()
            await this.classRepository.update({reference_subject_id: id}, {'subject': data})

            return updateSubjectDto
            
        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

}
