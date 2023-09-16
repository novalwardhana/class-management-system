import { Controller, Get, Post, Delete, Put, UsePipes, ValidationPipe, Body, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FilterTeacherDto } from './dto/filter-teacher.dto';
import { Response } from 'express';
import { SuccessResponse } from "./response/success-response.interface"

import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTeachersSuccess, GetTeachersBadRequest, GetTeachersQueryPage, GetTeachersQueryLimit, GetTeachersDescription, GetTeachersInternalServerError } from 'src/classes/swagger/get-datas.swagger';
import { CreateTeacherBadRequest, CreateTeacherDescription, CreateTeacherInternalServerError, CreateTeacherRequestBody, CreateTeacherSuccess } from 'src/classes/swagger/create-data.swagger';
import { GetTeacherDescription, GetTeacherInternalServerError, GetTeacherNotFound, GetTeacherParam, GetTeacherSuccess } from 'src/classes/swagger/get-data.swagger';


@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {

    constructor(private readonly teachersService: TeachersService) {}

    @Get()
    @UsePipes(ValidationPipe)
    @ApiOperation(GetTeachersDescription)                               /* Swagger get datas: operation */
    @ApiQuery(GetTeachersQueryPage)                                     /* Swagger get datas: query page */
    @ApiQuery(GetTeachersQueryLimit)                                    /* Swagger get datas: query limit */
    @ApiOkResponse(GetTeachersSuccess)                                  /* Swagger get datas: response success */
    @ApiBadRequestResponse(GetTeachersBadRequest)                       /* Swagger get datas: response bad request */
    @ApiInternalServerErrorResponse(GetTeachersInternalServerError)     /* Swagger get datas: response internal server error */
    async getDatas(@Query() filterTeacherDto: FilterTeacherDto, @Res() res: Response) {
        const responseData = await this.teachersService.getDatas(filterTeacherDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get teacher data", responseData))
    }
   
    @Get("/:id")
    @ApiOperation(GetTeacherDescription)                                /* Swagger delete data: operation */
    @ApiParam(GetTeacherParam)                                          /* Swagger delete data: param */
    @ApiOkResponse(GetTeacherSuccess)                                   /* Swagger delete data: response success */
    @ApiNotFoundResponse(GetTeacherNotFound)                            /* Swagger delete data: response not found */
    @ApiInternalServerErrorResponse(GetTeacherInternalServerError)      /* Swagger delete data: response internal server error */
    async getData(@Param("id") id: string, @Res() res: Response) {
        const responseData = await this.teachersService.getData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get teacher data", responseData))
    }

    @Post()
    @ApiOperation(CreateTeacherDescription)                             /* Swagger create data: operation */
    @ApiBody({schema: CreateTeacherRequestBody})                        /* Swagger create data: body */
    @ApiOkResponse(CreateTeacherSuccess)                                /* Swagger create data: response success */
    @ApiBadRequestResponse(CreateTeacherBadRequest)                     /* Swagger create data: response bad request */
    @ApiInternalServerErrorResponse(CreateTeacherInternalServerError)   /* Swagger create data: response internal server error */
    @UsePipes(ValidationPipe)
    async createData(@Body() createTeacherDto: CreateTeacherDto, @Res() res: Response) {
        const responseData = await this.teachersService.createData(createTeacherDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success create teacher data", responseData))
    }

    @Delete("/:id")
    async deleteData(@Param("id") id: string, @Res() res: Response) {
        await this.teachersService.deleteData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success delete teacher data with uuid: ${id}`, null))
    }

    @Put("/:id")
    @UsePipes(ValidationPipe)
    async updateData(@Param("id") id: string, @Body() updateTeacherDto: UpdateTeacherDto, @Res() res: Response) {
        const responseData = await this.teachersService.updateData(id, updateTeacherDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

}
