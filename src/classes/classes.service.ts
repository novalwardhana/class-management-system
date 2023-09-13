import { Injectable } from '@nestjs/common';
import { ClassRepository } from './repository/class.repository';
import { TeacherRepository } from '../teachers/repository/teacher.repository';
import { SubjectRepository } from '../subjects/repository/subject.repository';
import { Class } from './entity/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { ErrorResponse } from "./response/error.response"

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
            
            const classData = await this.classRepository.createData(createClassDto, teacherData, subjectData)
            return classData
        } catch(e) {
            throw new ErrorResponse(e.message)
        }

        return null
    }

}
