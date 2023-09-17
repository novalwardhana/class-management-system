import { HttpStatus, Injectable } from '@nestjs/common';
import * as moment from "moment";
import { ClassRepository } from './repository/class.repository';
import { TeacherRepository } from '../teachers/repository/teacher.repository';
import { SubjectRepository } from '../subjects/repository/subject.repository';
import { Class } from './entity/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ErrorResponse } from "./response/error.response"
import { ClassStatusEnum } from './entity/class-status-enum.entity';
import { FilterClassDto } from './dto/filter-class.dto';

@Injectable()
export class ClassesService {

    constructor(
        private readonly classRepository: ClassRepository,
        private readonly teacherRepository: TeacherRepository,
        private readonly subjectRepository: SubjectRepository,
    ) {}

    async getDatas(filterClassDto: FilterClassDto): Promise<any> {
        try {

            const page = parseInt(filterClassDto.page)
            const limit = parseInt(filterClassDto.limit)
            const offset = (page - 1) * limit

            const total = await this.teacherRepository.getTotalDatas()
            const total_page = Math.ceil(total/limit)

            const classDatas = await this.classRepository.getDatas(limit, offset)
            return {
                page: page,
                per_page: limit,
                total_page: total_page,
                total_data: total,
                data: classDatas
            }
        } catch(e) {
            throw new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.message)
        }
    }

    async getData(id: string): Promise<Class> {
        try {
            const data = await this.classRepository.findOneBy({'class_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Class data with class_id: ${id} is not found`)
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

    async createData(createClassDto: CreateClassDto): Promise<Class> {

        try {

            const teacherData = await this.teacherRepository.findOneBy({'teacher_id': createClassDto.teacher_id})
            if (!teacherData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Teacher data with teacher_id: ${createClassDto.teacher_id} is not found`)
            }

            const subjectData = await this.subjectRepository.findOneBy({'subject_id': createClassDto.subject_id})
            if (!subjectData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Subject data with subject_id: ${createClassDto.subject_id} is not found`)
            }

            const parseStartTime = moment(createClassDto.start_time, "HH:mm")
            const parseEndTime = moment(createClassDto.end_time, "HH:mm")
            const duration = parseEndTime.diff(parseStartTime, "minutes")
            if (duration < 0) {
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "Start time and end time is not valid")
            }
            createClassDto.duration = duration
            
            const classData = await this.classRepository.createData(createClassDto, teacherData, subjectData)
            return classData

        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }

        return null
    }

    async deleteData(id: string): Promise<void> {
        try {
            const data = await this.classRepository.findOneBy({'class_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Subject data with subject_id: ${id} is not found`)
            }
            await this.classRepository.delete({class_id: id})
        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

    async updateData(id: string, updateClassDto: UpdateClassDto): Promise<Class> {

        try {

            const classData = await this.classRepository.findOneBy({'class_id': id})
            if (!classData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Class data with class_id: ${id} is not found`)
            }

            const teacherData = await this.teacherRepository.findOneBy({'teacher_id': updateClassDto.teacher_id})
            if (!teacherData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Teacher data with teacher_id: ${updateClassDto.teacher_id} is not found`)
            }

            const subjectData = await this.subjectRepository.findOneBy({'subject_id': updateClassDto.subject_id})
            if (!subjectData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Subject data with subject_id: ${updateClassDto.subject_id} is not found`)
            }

            const parseStartTime = moment(updateClassDto.start_time, "HH:mm")
            const parseEndTime = moment(updateClassDto.end_time, "HH:mm")
            const timeDuration = parseEndTime.diff(parseStartTime, "minutes")
            if (timeDuration < 0) {
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "Start time and end time is not valid")
            }
            updateClassDto.duration = timeDuration

            const { title, teacher_id, subject_id, date, start_time, end_time, duration } = updateClassDto
            classData.class_id = id
            classData.title = title
            classData.teacher = teacherData
            classData.subject = subjectData
            classData.date = date
            classData.start_time = start_time
            classData.end_time = end_time
            classData.duration = duration
            classData.status = ClassStatusEnum.active
            classData.reference_teacher_id = teacher_id
            classData.reference_subject_id = subject_id
            classData.updated_at = moment().add(7, 'hours').toDate()

            await classData.save()
            return classData
        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

    async setStatus(id: string, status: string): Promise<Class> {
        
        try {

            const classData = await this.classRepository.findOneBy({'class_id': id})
            if (!classData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Class data with class_id: ${id} is not found`)
            }
            classData.status = status

            await classData.save()
            return classData

        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

    async unassignedTeacher(id: string): Promise<Class> {
        try {

            const classData = await this.classRepository.findOneBy({'class_id': id})
            if (!classData) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Class data with class_id: ${id} is not found`)
            }
            classData.teacher = null
            classData.reference_teacher_id = null

            await classData.save()
            return classData

        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }
}   
