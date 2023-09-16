import { HttpStatus, Injectable } from '@nestjs/common';
import { TeacherRepository } from './repository/teacher.repository';
import { ClassRepository } from '../classes/repository/class.repository'
import { Teacher } from './entity/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ErrorResponse } from "./response/error-response.interface"
import { FilterTeacherDto } from './dto/filter-teacher.dto'
import * as moment from "moment-timezone"

@Injectable()
export class TeachersService {

    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly classRepository: ClassRepository,
    ) {}

    async getDatas(filterTeacherDto: FilterTeacherDto): Promise<any> {
        try {

            const page = parseInt(filterTeacherDto.page)
            const limit = parseInt(filterTeacherDto.limit)
            const offset = (page - 1) * limit

            const total = await this.teacherRepository.getTotalDatas()
            const total_page = Math.ceil(total/limit)

            const teacherDatas = await this.teacherRepository.getDatas(limit, offset)
            return {
                page: page,
                per_page: limit,
                total_page: total_page,
                total_data: total,
                data: teacherDatas
            }
        } catch(e) {
            throw new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.message)
        }
    }

    async getData(id: string): Promise<Teacher> {
        try {
            const data = await this.teacherRepository.findOneBy({'teacher_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Teacher data with teacher_id: ${id} is not found`)
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

    async createData(createTeacherDto: CreateTeacherDto): Promise<CreateTeacherDto> {
        try {
            await this.teacherRepository.createData(createTeacherDto)
            return createTeacherDto
        } catch(e) {
            throw new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.message)
        }
    }

    async deleteData(id: string): Promise<void> {
        try {

            const data = await this.teacherRepository.findOneBy({'teacher_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, `Teacher data with teacher_id: ${id} is not found`)
            }

            const countClassData = await this.classRepository.countBy({'reference_teacher_id': id})
            if (countClassData > 0) {
                throw new ErrorResponse(HttpStatus.NOT_ACCEPTABLE, `Cannot delete teacher data, teacher_id: ${id} already used in class collection`)
            }

            await this.teacherRepository.delete({teacher_id: id})
        } catch(e) {
            let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            if (e.status) {
                statusCode = e.status
            }
            throw new ErrorResponse(statusCode, e.message)
        }
    }

    async updateData(id: string, updateTeacherDto: UpdateTeacherDto): Promise<UpdateTeacherDto> {
        try {
            const data = await this.teacherRepository.findOneBy({'teacher_id': id})
            if (!data) {
                throw new ErrorResponse(HttpStatus.NOT_FOUND, "Data not found")
            }
            
            const { full_name, date_of_birth, employee_id_number, email, phone_number, address } = updateTeacherDto
            data.full_name = full_name
            data.date_of_birth = date_of_birth
            data.employee_id_number = employee_id_number
            data.email = email
            data.phone_number = phone_number
            data.address = address
            data.updated_at = moment().add(7, 'hours').toDate()

            await data.save()
            await this.classRepository.update({reference_teacher_id: id}, {'teacher': data})

            return updateTeacherDto
            
        } catch(e) {
            throw new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.message)
        }
    }

}
