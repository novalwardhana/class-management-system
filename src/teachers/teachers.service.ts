import { Injectable } from '@nestjs/common';
import { TeacherRepository } from './repository/teacher.repository';
import { ClassRepository } from '../classes/repository/class.repository'
import { Teacher } from './entity/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ErrorResponse } from "./response/error-response.interface"

@Injectable()
export class TeachersService {

    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly classRepository: ClassRepository,
    ) {}

    async getDatas(): Promise<Teacher[]> {
        try {
            return await this.teacherRepository.getDatas()
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async getData(id: string): Promise<Teacher> {
        try {
            const data = await this.teacherRepository.findOneBy({'teacher_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }
            return data
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async createData(createTeacherDto: CreateTeacherDto): Promise<CreateTeacherDto> {
        try {
            await this.teacherRepository.createData(createTeacherDto)
            return createTeacherDto
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async deleteData(id: string): Promise<void> {
        try {

            const data = await this.teacherRepository.findOneBy({'teacher_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }

            const countClassData = await this.classRepository.countBy({'reference_teacher_id': id})
            if (countClassData > 0) {
                throw new ErrorResponse("Cannot delete subject data, already used in class")
            }

            await this.teacherRepository.delete({teacher_id: id})
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

    async updateData(id: string, updateTeacherDto: UpdateTeacherDto): Promise<UpdateTeacherDto> {
        try {
            const data = await this.teacherRepository.findOneBy({'teacher_id': id})
            if (!data) {
                throw new ErrorResponse("Data not found")
            }
            
            const { full_name, date_of_birth, employee_id_number, email, phone_number, address } = updateTeacherDto
            data.full_name = full_name
            data.date_of_birth = date_of_birth
            data.employee_id_number = employee_id_number
            data.email = email
            data.phone_number = phone_number
            data.address = address
            await data.save()
            return updateTeacherDto
            
        } catch(e) {
            throw new ErrorResponse(e.message)
        }
    }

}
