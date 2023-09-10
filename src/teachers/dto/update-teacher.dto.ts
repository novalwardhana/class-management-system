import { IsEmail, IsNotEmpty, IsDate } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateTeacherDto {

    @IsNotEmpty()
    full_name: string

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date_of_birth: Date

    @IsNotEmpty()
    employee_id_number: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    address: string

}