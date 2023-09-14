import { Injectable } from '@nestjs/common';
import { SubjectRepository } from './repository/subject.repository';
import { ClassRepository } from '../classes/repository/class.repository'
import { Subject } from './entity/subject.entity';
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { ErrorResponse } from "./response/error.response"

@Injectable()
export class SubjectsService {

    constructor(
        private readonly subjectRepository: SubjectRepository,
        private readonly classRepository: ClassRepository,
    ) {}

    async getDatas(): Promise<Subject[]> {
        try {
            return await this.subjectRepository.getDatas()
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async getData(id: string): Promise<Subject> {
        try {
            const data = await this.subjectRepository.findOneBy({'subject_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }
            return data
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async createData(createSubjectDto: CreateSubjectDto): Promise<CreateSubjectDto> {
        try {
            await this.subjectRepository.createData(createSubjectDto)
            return createSubjectDto
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async deleteData(id: string): Promise<void> {
        try {
            const data = await this.subjectRepository.findOneBy({'subject_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }

            
            const countClassData = await this.classRepository.countBy({'reference_subject_id': id})
            if (countClassData > 0) {
                throw new ErrorResponse("Cannot delete subject data, already used in class")
            }

            await this.subjectRepository.delete({subject_id: id})
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async updateData(id: string, updateSubjectDto: UpdateSubjectDto): Promise<UpdateSubjectDto> {
        try {
            const data = await this.subjectRepository.findOneBy({'subject_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }
            
            const { name, description, level } = updateSubjectDto
            data.name = name
            data.description = description
            data.level = level
            
            await data.save()
            await this.classRepository.update({reference_subject_id: id}, {'subject': data})

            return updateSubjectDto
            
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

}
