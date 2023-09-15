import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource, ObjectId } from "typeorm";
import { Class } from "../entity/class.entity";
import { Teacher } from "../../teachers/entity/teacher.entity";
import { Subject } from "../../subjects/entity/subject.entity";
import { CreateClassDto } from "../dto/create-class.dto";
import { v4 as uuidv4 } from "uuid"
import * as moment from "moment";
import { ClassStatusEnum } from "../entity/class-status-enum.entity";
import mongoose from "mongoose";


@Injectable()
export class ClassRepository extends Repository<Class> {

    constructor(private dataSource: DataSource) {
        super(Class, dataSource.createEntityManager())
    }

    async getTotalDatas(): Promise<number> {
        const count = await this.count()
        return count
    } 

    async getDatas(limit: number, offset: number): Promise<Class[]> {
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

    async createData(createClassDto: CreateClassDto, teacher: Teacher, subject: Subject): Promise<Class> {
        
        const { title, date, start_time, end_time, duration, teacher_id, subject_id } = createClassDto
       
        const classData = this.create()
        classData.class_id = uuidv4()
        classData.title = title
        classData.teacher = teacher
        classData.subject = subject
        classData.date = date
        classData.start_time = start_time
        classData.end_time = end_time
        classData.duration = duration
        classData.status = ClassStatusEnum.active
        classData.reference_teacher_id = teacher_id
        classData.reference_subject_id = subject_id
        classData.created_at = moment().add(7, 'hours').toDate()
        classData.updated_at = moment().add(7, 'hours').toDate()
    
        try {
            await classData.save()
            return classData
        } catch(e) {
            throw new InternalServerErrorException(e)
        }

        
    }

}