import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Subject } from "../entity/subject.entity";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { v4 as uuidv4 } from "uuid"
import * as moment from "moment-timezone"

@Injectable()
export class SubjectRepository extends Repository<Subject> {
    
    constructor(private dataSource: DataSource) {
        super(Subject, dataSource.createEntityManager())
    }

    async getTotalDatas(): Promise<number> {
        const count = await this.count()
        return count
    } 

    async getDatas(limit: number, offset: number): Promise<Subject[]> {
        const result = await this.find({
            where: {},
            order: {
                created_at: "DESC"
            },
            take: limit,
            skip: offset,
        })
        return result
    }

    async createData(createTeacherDto: CreateSubjectDto): Promise<void> {
        const { name, description, level } = createTeacherDto
        const subject = this.create()
        subject.subject_id = uuidv4() 
        subject.name = name
        subject.description = description
        subject.level = level
        subject.created_at = moment().add(7, 'hours').toDate()
        subject.updated_at = moment().add(7, 'hours').toDate()

        try {
            await subject.save()
        } catch(e) {
            throw new InternalServerErrorException(e)
        }
    }

}