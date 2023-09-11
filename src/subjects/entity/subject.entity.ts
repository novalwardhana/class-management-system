import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";
import { SubjectLevelEnum } from "./subject-level-enum.entity";

@Entity()
export class Subject extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
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
}