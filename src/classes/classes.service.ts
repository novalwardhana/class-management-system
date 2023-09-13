import { Injectable } from '@nestjs/common';
import * as moment from "moment";
import { ClassRepository } from './repository/class.repository';
import { TeacherRepository } from '../teachers/repository/teacher.repository';
import { SubjectRepository } from '../subjects/repository/subject.repository';
import { Class } from './entity/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ErrorResponse } from "./response/error.response"
import { ClassStatusEnum } from './entity/class-status-enum.entity';

@Injectable()
export class ClassesService {

    constructor(
        private readonly classRepository: ClassRepository,
        private readonly teacherRepository: TeacherRepository,
        private readonly subjectRepository: SubjectRepository,
    ) {}

    async getDatas(): Promise<Class[]> {
        try {
            return await this.classRepository.getDatas()
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async getData(id: string): Promise<Class> {
        try {
            const data = await this.classRepository.findOneBy({'class_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }
            return data
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async createData(createClassDto: CreateClassDto): Promise<Class> {

        try {

            const teacherData = await this.teacherRepository.findOneBy({'teacher_id': createClassDto.teacher_id})
            if (!teacherData) {
                throw new ErrorResponse(`Teacher with id: ${createClassDto.teacher_id} is not found`)
            }

            const subjectData = await this.subjectRepository.findOneBy({'subject_id': createClassDto.subject_id})
            if (!subjectData) {
                throw new ErrorResponse(`Subject with id: ${createClassDto.subject_id} is not found`)
            }

            const parseStartTime = moment(createClassDto.start_time, "HH:mm")
            const parseEndTime = moment(createClassDto.end_time, "HH:mm")
            const duration = parseEndTime.diff(parseStartTime, "minutes")
            if (duration < 0) {
                throw new ErrorResponse("Start time and end time is not valid")
            }
            createClassDto.duration = duration
            
            const classData = await this.classRepository.createData(createClassDto, teacherData, subjectData)
            return classData

        } catch(e) {
            throw new ErrorResponse(e.message)
        }

        return null
    }

    async deleteData(id: string): Promise<void> {
        try {
            const data = await this.classRepository.findOneBy({'class_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }
            await this.classRepository.delete({class_id: id})
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async updateData(id: string, updateClassDto: UpdateClassDto): Promise<Class> {

        try {

            const classData = await this.classRepository.findOneBy({'class_id': id})
            if (!classData) {
                throw new ErrorResponse("Data class not found")
            }

            const teacherData = await this.teacherRepository.findOneBy({'teacher_id': updateClassDto.teacher_id})
            if (!teacherData) {
                throw new ErrorResponse(`Teacher with id: ${updateClassDto.teacher_id} is not found`)
            }

            const subjectData = await this.subjectRepository.findOneBy({'subject_id': updateClassDto.subject_id})
            if (!subjectData) {
                throw new ErrorResponse(`Subject with id: ${updateClassDto.subject_id} is not found`)
            }

            const parseStartTime = moment(updateClassDto.start_time, "HH:mm")
            const parseEndTime = moment(updateClassDto.end_time, "HH:mm")
            const timeDuration = parseEndTime.diff(parseStartTime, "minutes")
            if (timeDuration < 0) {
                throw new ErrorResponse("Start time and end time is not valid")
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

            await classData.save()
            return classData
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }
}   
