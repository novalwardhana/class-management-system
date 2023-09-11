import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Subject } from "../entity/subject.entity";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class SubjectRepository extends Repository<Subject> {
    
    constructor(private dataSource: DataSource) {
        super(Subject, dataSource.createEntityManager())
    }

    async getDatas(): Promise<Subject[]> {
        const result = await this.find()
        return result
    }

    async createData(createTeacherDto: CreateSubjectDto): Promise<void> {
        const { name, description, level } = createTeacherDto
        const subject = this.create()
        subject.subject_id = uuidv4() 
        subject.name = name
        subject.description = description
        subject.level = level

        try {
            await subject.save()
        } catch(e) {
            throw new InternalServerErrorException(e)
        }
    }

}