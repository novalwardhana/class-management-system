import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Teacher } from "../entity/teacher.entity";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
    
    constructor(private dataSource: DataSource) {
        super(Teacher, dataSource.createEntityManager())
    }

    async getDatas(): Promise<Teacher[]> {
        const result = await this.find()
        return result
    }

    async createData(createTeacherDto: CreateTeacherDto): Promise<void> {
        const { full_name, date_of_birth, employee_id_number, email, phone_number, address } = createTeacherDto
        const teacher = this.create()
        teacher.teacher_id = uuidv4()
        teacher.full_name = full_name
        teacher.date_of_birth = date_of_birth
        teacher.employee_id_number = employee_id_number
        teacher.email = email
        teacher.phone_number = phone_number
        teacher.address = address

        try {
            await teacher.save()
        } catch(e) {
            throw new InternalServerErrorException(e)
        }
    }

}