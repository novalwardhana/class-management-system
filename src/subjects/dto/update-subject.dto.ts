import { IsEnum, IsNotEmpty } from "class-validator";
import { SubjectLevelEnum } from "../entity/subject-level-enum.entity";

export class UpdateSubjectDto {

    @IsNotEmpty()
    name: string

    description: string

    @IsNotEmpty()
    @IsEnum(SubjectLevelEnum)
    level: SubjectLevelEnum

}