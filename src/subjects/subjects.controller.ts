import { Controller, Get, Post, Delete, Put, UsePipes, ValidationPipe, Body, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { Response } from 'express';
import { SuccessResponse } from "./response/success.response"
import { FilterSubjectDto } from './dto/filter-subject.dto';

/* Swagger dependencies */
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetSubjectsBadRequest, GetSubjectsDescription, GetSubjectsInternalServerError, GetSubjectsQueryLimit, GetSubjectsQueryPage, GetSubjectsSuccess } from './swagger/get-datas.swagger';
import { GetSubjectDescription, GetSubjectInternalServerError, GetSubjectNotFound, GetSubjectParam, GetSubjectSuccess } from './swagger/get-data.swagger';
import { CreateSubjectBadRequest, CreateSubjectDescription, CreateSubjectInternalServerError, CreateSubjectRequestBody, CreateSubjectSuccess } from './swagger/create-data.swagger';
import { DeleteSubjectDescription, DeleteSubjectInternalServerError, DeleteSubjectNotAcceptable, DeleteSubjectNotFound, DeleteSubjectParam, DeleteSubjectSuccess } from './swagger/delete-data.swagger';
import { UpdateSubjectBadRequest, UpdateSubjectDescription, UpdateSubjectInternalServerError, UpdateSubjectNotFound, UpdateSubjectParam, UpdateSubjectRequestBody, UpdateSubjectSuccess } from './swagger/update-data.swagger';

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
    @ApiOperation(GetSubjectDescription)                                /* Swagger get data: operation */
    @ApiParam(GetSubjectParam)                                          /* Swagger get data: param */
    @ApiOkResponse(GetSubjectSuccess)                                   /* Swagger get data: response success */
    @ApiNotFoundResponse(GetSubjectNotFound)                            /* Swagger get data: response not found */
    @ApiInternalServerErrorResponse(GetSubjectInternalServerError)      /* Swagger get data: response internal server error */
    async getData(@Param("id") id: string, @Res() res: Response) {
        const responseData = await this.subjectsService.getData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get subject data", responseData))
    }

    @Post()
    @ApiOperation(CreateSubjectDescription)                             /* Swagger create data: operation */
    @ApiBody({schema: CreateSubjectRequestBody})                        /* Swagger create data: body */
    @ApiOkResponse(CreateSubjectSuccess)                                /* Swagger create data: response success */
    @ApiBadRequestResponse(CreateSubjectBadRequest)                     /* Swagger create data: response bad request */
    @ApiInternalServerErrorResponse(CreateSubjectInternalServerError)   /* Swagger create data: response internal server error */
    @UsePipes(ValidationPipe)
    async createData(@Body() createSubjectDto: CreateSubjectDto, @Res() res: Response) {
        const responseData = await this.subjectsService.createData(createSubjectDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success create subject data", responseData))
    }

    @Delete("/:id")
    @ApiOperation(DeleteSubjectDescription)                             /* Swagger delete data: operation */
    @ApiParam(DeleteSubjectParam)                                       /* Swagger delete data: param */
    @ApiOkResponse(DeleteSubjectSuccess)                                /* Swagger delete data: response success */
    @ApiNotFoundResponse(DeleteSubjectNotFound)                         /* Swagger delete data: response not found */
    @ApiNotAcceptableResponse(DeleteSubjectNotAcceptable)               /* Swagger delete data: response not acceptable */
    @ApiInternalServerErrorResponse(DeleteSubjectInternalServerError)   /* Swagger delete data: response internal server error */
    async deleteData(@Param("id") id: string, @Res() res: Response) {
        await this.subjectsService.deleteData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success delete subject data with subject_id: ${id}`, null))
    }

    @Put("/:id")
    @ApiOperation(UpdateSubjectDescription)                             /* Swagger update data: operation */
    @ApiParam(UpdateSubjectParam)                                       /* Swagger update data: param */
    @ApiBody({schema: UpdateSubjectRequestBody})                        /* Swagger update data: body */
    @ApiOkResponse(UpdateSubjectSuccess)                                /* Swagger update data: response success */
    @ApiBadRequestResponse(UpdateSubjectBadRequest)                     /* Swagger update data: response bad request */
    @ApiNotFoundResponse(UpdateSubjectNotFound)                         /* Swagger update data: response not found */
    @ApiInternalServerErrorResponse(UpdateSubjectInternalServerError)   /* Swagger update data: response internal server error */
    @UsePipes(ValidationPipe)
    async updateData(@Param("id") id: string, @Body() updateSubjectDto: UpdateSubjectDto, @Res() res: Response) {
        const responseData = await this.subjectsService.updateData(id, updateSubjectDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success update subject data with subject_id: ${id}`, responseData))
    }

}
