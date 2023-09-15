import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectId, OneToMany } from "typeorm";
import { Class } from "../../classes/entity/class.entity"
import { DateTime } from 'luxon';

@Entity()
export class Teacher extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column({ unique: true })
    teacher_id: string

    @Column({ unique: true })
    @IsNotEmpty()
    full_name: string

    @Column()
    @IsNotEmpty()
    date_of_birth: Date

    @Column({ unique: true })
    @IsNotEmpty()
    employee_id_number: string

    @Column({ unique: true })
    @IsNotEmpty()
    email: string

    @Column({ unique: true })
    @IsNotEmpty()
    phone_number: string

    @Column()
    @IsNotEmpty()
    address: string

    @Column({ type: 'timestamp' })
    created_at: DateTime
  
    @Column({ type: 'timestamp' })
    updated_at: DateTime

    @OneToMany(() => Class, (classData) => classData.teacher)
    classes: Class[]
}