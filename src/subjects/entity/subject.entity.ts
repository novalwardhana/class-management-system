import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectId, OneToMany } from "typeorm";
import { SubjectLevelEnum } from "./subject-level-enum.entity";
import { Class } from "../../classes/entity/class.entity"
import { DateTime } from 'luxon';

@Entity()
export class Subject extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column({ unique: true })
    subject_id: string

    @Column({ unique: true })
    @IsNotEmpty()
    name: string

    @Column()
    description: string

    @Column({
        type: "enum",
        enum: SubjectLevelEnum
    })
    @IsNotEmpty()
    level: SubjectLevelEnum

    @Column({ type: 'timestamp' })
    created_at: DateTime
  
    @Column({ type: 'timestamp' })
    updated_at: DateTime

    @OneToMany(() => Class, (classData) => classData.subject)
    classes: Class[]
}