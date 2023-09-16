import { Controller, Get, Post, Delete, Put, UsePipes, ValidationPipe, Body, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Response } from 'express';
import { SuccessResponse } from "./response/success.response"
import { FilterSubjectDto } from './dto/filter-subject.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetSubjectsBadRequest, GetSubjectsDescription, GetSubjectsInternalServerError, GetSubjectsQueryLimit, GetSubjectsQueryPage, GetSubjectsSuccess } from './swagger/get-datas.swagger';

@Controller('subjects')
@ApiTags('subjects')
export class SubjectsController {

    constructor(private readonly subjectsService: SubjectsService) {}

    @Get()
    @UsePipes(ValidationPipe)
    @ApiOperation(GetSubjectsDescription)                               /* Swagger get datas: operation */
    @ApiQuery(GetSubjectsQueryPage)                                     /* Swagger get datas: query page */
    @ApiQuery(GetSubjectsQueryLimit)                                    /* Swagger get datas: query limit */
    @ApiOkResponse(GetSubjectsSuccess)                                  /* Swagger get datas: response success */
    @ApiBadRequestResponse(GetSubjectsBadRequest)                       /* Swagger get datas: response bad request */
    @ApiInternalServerErrorResponse(GetSubjectsInternalServerError)     /* Swagger get datas: response internal server error */
    async getDatas(@Query() filterSubjectDto: FilterSubjectDto, @Res() res: Response) {
        const responseData = await this.subjectsService.getDatas(filterSubjectDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get subjects data", responseData))
    }

    @Get("/:id")
    async getData(@Param("id") id: string, @Res() res: Response) {
        const responseData = await this.subjectsService.getData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createData(@Body() createSubjectDto: CreateSubjectDto, @Res() res: Response) {
        const responseData = await this.subjectsService.createData(createSubjectDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Delete("/:id")
    async deleteData(@Param("id") id: string, @Res() res: Response) {
        await this.subjectsService.deleteData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success delete subject data with uuid: ${id}`, null))
    }

    @Put("/:id")
    @UsePipes(ValidationPipe)
    async updateData(@Param("id") id: string, @Body() updateSubjectDto: UpdateSubjectDto, @Res() res: Response) {
        const responseData = await this.subjectsService.updateData(id, updateSubjectDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

}
