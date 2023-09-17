import { Controller, Post, Get, Delete, Put, Param, Body, UsePipes, ValidationPipe, Res, HttpStatus, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from "./dto/create-class.dto";
import { Response } from 'express';
import { SuccessResponse } from "./response/success.response"
import { ErrorResponse } from './response/error.response'
import { UpdateClassDto } from './dto/update-class.dto'
import { ClassStatusEnum } from './entity/class-status-enum.entity'
import { Class } from './entity/class.entity';
import { FilterClassDto } from './dto/filter-class.dto';

/* Swagger dependencies */
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetClassesBadRequest, GetClassesDescription, GetClassesInternalServerError, GetClassesQueryLimit, GetClassesQueryPage, GetClassesSuccess } from './swagger/get-datas.swagger';
import { GetClassDescription, GetClassInternalServerError, GetClassNotFound, GetClassParam, GetClassSuccess } from './swagger/get-data.swagger';
import { CreateClassBadRequest, CreateClassDescription, CreateClassInternalServerError, CreateClassNotFound, CreateClassRequestBody, CreateClassSuccess } from './swagger/create-data.swagger';
import { DeleteClassDescription, DeleteClassInternalServerError, DeleteClassNotFound, DeleteClassParam, DeleteClassSuccess } from './swagger/delete-data.swagger';

@Controller('classes')
@ApiTags('classes')
export class ClassesController {

    constructor(private readonly classesService: ClassesService) {}

    @Get()
    @UsePipes(ValidationPipe)
    @ApiOperation(GetClassesDescription)                                    /* Swagger get datas: operation */
    @ApiQuery(GetClassesQueryPage)                                          /* Swagger get datas: query page */
    @ApiQuery(GetClassesQueryLimit)                                         /* Swagger get datas: query limit */
    @ApiOkResponse(GetClassesSuccess)                                       /* Swagger get datas: response success */
    @ApiBadRequestResponse(GetClassesBadRequest)                            /* Swagger get datas: response bad request */
    @ApiInternalServerErrorResponse(GetClassesInternalServerError)          /* Swagger get datas: response internal server error */
    async getDatas(@Query() filterClassDto: FilterClassDto, @Res() res: Response) {
        const responseData = await this.classesService.getDatas(filterClassDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get classes data", responseData))
    }

    @Get("/:id")
    @ApiOperation(GetClassDescription)                                      /* Swagger get data: operation */
    @ApiParam(GetClassParam)                                                /* Swagger get data: param */
    @ApiOkResponse(GetClassSuccess)                                         /* Swagger get data: response success */
    @ApiNotFoundResponse(GetClassNotFound)                                  /* Swagger get data: response not found */
    @ApiInternalServerErrorResponse(GetClassInternalServerError)            /* Swagger get data: response internal server error */
    async getData(@Param("id") id: string, @Res() res: Response) {
        const responseData = await this.classesService.getData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success get class data", responseData))
    }

    @Post()
    @ApiOperation(CreateClassDescription)                                   /* Swagger create data: operation */
    @ApiBody({schema: CreateClassRequestBody})                              /* Swagger create data: body */
    @ApiOkResponse(CreateClassSuccess)                                      /* Swagger create data: response success */
    @ApiNotFoundResponse(CreateClassNotFound)                               /* Swagger create data: response not found */
    @ApiBadRequestResponse(CreateClassBadRequest)                           /* Swagger create data: response bad request */
    @ApiInternalServerErrorResponse(CreateClassInternalServerError)         /* Swagger create data: response internal server error */
    @UsePipes(ValidationPipe)
    async createData(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
        const responseData = await this.classesService.createData(createClassDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Delete("/:id")
    @ApiOperation(DeleteClassDescription)                                   /* Swagger delete data: operation */
    @ApiParam(DeleteClassParam)                                             /* Swagger delete data: param */
    @ApiOkResponse(DeleteClassSuccess)                                      /* Swagger delete data: response success */
    @ApiNotFoundResponse(DeleteClassNotFound)                               /* Swagger delete data: response not found */
    @ApiInternalServerErrorResponse(DeleteClassInternalServerError)         /* Swagger delete data: response internal server error */
    async deleteData(@Param("id") id: string, @Res() res: Response) {
        await this.classesService.deleteData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success delete class data with class_id:: ${id}`, null))
    }

    @Put("/:id")
    @UsePipes(ValidationPipe)
    async updateData(@Param("id") id: string, @Body() updateClassDto: UpdateClassDto, @Res() res: Response) {
        const responseData = await this.classesService.updateData(id, updateClassDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Put("/:status/:id")
    async setStatus(@Param("status") status: string, @Param("id") id: string, @Res() res: Response) {
        
        let newStatus: string
        let responseData: Class
        switch (status) {
            case "set-active": 
            {
                newStatus = ClassStatusEnum.active
                responseData = await this.classesService.setStatus(id, newStatus)
                break
            }
            case "set-archived": 
            {
                newStatus = ClassStatusEnum.archived
                responseData = await this.classesService.setStatus(id, newStatus)
                break
            }
            case "unassigned-teacher": 
            {
                responseData = await this.classesService.unassignedTeacher(id)
                break
            }
            default: {
                throw new ErrorResponse(HttpStatus.BAD_REQUEST, "set class status is not valid")
            }
        }

        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

}
