import { Type } from "class-transformer"
import { IsInt, IsNotEmpty } from "class-validator"

export class FilterTeacherDto {

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    page: string

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    limit: string

}