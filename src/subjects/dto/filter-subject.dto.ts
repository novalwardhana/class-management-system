import { Type } from "class-transformer"
import { IsInt, IsNotEmpty } from "class-validator"

export class FilterSubjectDto {

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    page: string

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    limit: string

}