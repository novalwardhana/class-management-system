import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource, Like, ILike } from "typeorm";
import { Teacher } from "../entity/teacher.entity";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { v4 as uuidv4 } from "uuid"
import * as moment from "moment-timezone"

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
    
    constructor(private dataSource: DataSource) {
        super(Teacher, dataSource.createEntityManager())
    }

    async getTotalDatas(): Promise<number> {
        const count = await this.count()
        return count
    } 

    async getDatas(limit: number, offset: number): Promise<Teacher[]> {

        const query = await this.find({
            where: {},
            order: {
                created_at: "DESC"
            },
            take: limit,
            skip: offset,
        })
        return query
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
        teacher.created_at = moment().add(7, 'hours').toDate()
        teacher.updated_at = moment().add(7, 'hours').toDate()

        try {
            await teacher.save()
        } catch(e) {
            throw new InternalServerErrorException(e)
        }
    }

}