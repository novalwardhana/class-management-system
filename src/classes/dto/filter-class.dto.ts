import { Type } from "class-transformer"
import { IsInt, IsNotEmpty } from "class-validator"

export class FilterClassDto {

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    page: string

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    limit: string

}