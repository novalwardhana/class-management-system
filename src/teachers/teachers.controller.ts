import { Controller, Get, Post, Delete, Put, UsePipes, ValidationPipe, Body, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FilterTeacherDto } from './dto/filter-teacher.dto';
import { Response } from 'express';
import { SuccessResponse } from "./response/success-response.interface"

/* Swagger dependencies */
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTeachersSuccess, GetTeachersBadRequest, GetTeachersQueryPage, GetTeachersQueryLimit, GetTeachersDescription, GetTeachersInternalServerError } from './swagger/get-datas.swagger';
import { CreateTeacherBadRequest, CreateTeacherDescription, CreateTeacherInternalServerError, CreateTeacherRequestBody, CreateTeacherSuccess } from './swagger/create-data.swagger';
import { GetTeacherDescription, GetTeacherInternalServerError, GetTeacherNotFound, GetTeacherParam, GetTeacherSuccess } from './swagger/get-data.swagger';
import { DeleteTeacherDescription, DeleteTeacherInternalServerError, DeleteTeacherNotAcceptable, DeleteTeacherNotFound, DeleteTeacherParam, DeleteTeacherSuccess } from './swagger/delete-data.swagger';
import { UpdateTeacherBadRequest, UpdateTeacherDescription, UpdateTeacherInternalServerError, UpdateTeacherNotFound, UpdateTeacherParam, UpdateTeacherRequestBody, UpdateTeacherSuccess } from './swagger/update-data.swagger';


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
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get teachers data", responseData))
    }
   
    @Get("/:id")
    @ApiOperation(GetTeacherDescription)                                /* Swagger get data: operation */
    @ApiParam(GetTeacherParam)                                          /* Swagger get data: param */
    @ApiOkResponse(GetTeacherSuccess)                                   /* Swagger get data: response success */
    @ApiNotFoundResponse(GetTeacherNotFound)                            /* Swagger get data: response not found */
    @ApiInternalServerErrorResponse(GetTeacherInternalServerError)      /* Swagger get data: response internal server error */
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
    @ApiOperation(DeleteTeacherDescription)                             /* Swagger delete data: operation */
    @ApiParam(DeleteTeacherParam)                                       /* Swagger delete data: param */
    @ApiOkResponse(DeleteTeacherSuccess)                                /* Swagger delete data: response success */
    @ApiNotFoundResponse(DeleteTeacherNotFound)                         /* Swagger delete data: response not found */
    @ApiNotAcceptableResponse(DeleteTeacherNotAcceptable)               /* Swagger delete data: response not acceptable */
    @ApiInternalServerErrorResponse(DeleteTeacherInternalServerError)   /* Swagger delete data: response internal server error */
    async deleteData(@Param("id") id: string, @Res() res: Response) {
        await this.teachersService.deleteData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success delete teacher data with teacher id: ${id}`, null))
    }

    @Put("/:id")
    @ApiOperation(UpdateTeacherDescription)                             /* Swagger update data: operation */
    @ApiParam(UpdateTeacherParam)                                       /* Swagger update data: param */
    @ApiBody({schema: UpdateTeacherRequestBody})                        /* Swagger update data: body */
    @ApiOkResponse(UpdateTeacherSuccess)                                /* Swagger update data: response success */
    @ApiBadRequestResponse(UpdateTeacherBadRequest)                     /* Swagger update data: response bad request */
    @ApiNotFoundResponse(UpdateTeacherNotFound)                         /* Swagger update data: response not found */
    @ApiInternalServerErrorResponse(UpdateTeacherInternalServerError)   /* Swagger update data: response internal server error */
    @UsePipes(ValidationPipe)
    async updateData(@Param("id") id: string, @Body() updateTeacherDto: UpdateTeacherDto, @Res() res: Response) {
        const responseData = await this.teachersService.updateData(id, updateTeacherDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success update teacher data with teacher id: ${id}`, responseData))
    }

}
