import { IsEmail, IsNotEmpty, IsDate, IsUUID, IsEnum, IsEmpty } from "class-validator";
import { Type } from 'class-transformer';
import { Is24HourTime } from "./time.dto";
import { ClassStatusEnum } from "../entity/class-status-enum.entity";

export class UpdateClassDto {

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsUUID()
    teacher_id: string

    @IsNotEmpty()
    @IsUUID()
    subject_id: string

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date

    @IsNotEmpty()
    @Is24HourTime()
    start_time: string

    @IsNotEmpty()
    @Is24HourTime()
    end_time: string

    @IsEmpty()
    duration: number

}