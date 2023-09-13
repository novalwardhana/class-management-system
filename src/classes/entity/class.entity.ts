import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectId, ManyToOne } from "typeorm";
import { ClassStatusEnum } from "./class-status-enum.entity";
import { Teacher } from "../../teachers/entity/teacher.entity";
import { Subject } from "../../subjects/entity/subject.entity";

@Entity()
export class Class extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectId

    @Column({ unique: true })
    class_id: string

    @Column({ unique: true })
    @IsNotEmpty()
    title: string

    @Column("uuid")
    teacher_id: string

    @Column('json')    
    @ManyToOne(() => Teacher, (teacher) => teacher.classes)
    teacher: Teacher

    @Column("uuid")
    subject_id: string

    @Column('json')    
    @ManyToOne(() => Subject, (subject) => subject.classes)
    subject: Subject

    @Column()
    @IsNotEmpty()
    date: Date

    @Column({type: "time"})
    @IsNotEmpty()
    start_time: string

    @Column({type: "time"})
    @IsNotEmpty()
    end_time: string

    @Column()
    @IsNotEmpty()
    duration: number

    @Column({
        type: "enum",
        enum: ClassStatusEnum,
        default: "active"
    })
    @IsNotEmpty()
    status: string

}