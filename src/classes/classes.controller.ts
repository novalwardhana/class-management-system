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
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetClassesBadRequest, GetClassesDescription, GetClassesInternalServerError, GetClassesQueryLimit, GetClassesQueryPage, GetClassesSuccess } from './swagger/get-datas.swagger';
import { GetClassDescription, GetClassInternalServerError, GetClassNotFound, GetClassParam, GetClassSuccess } from './swagger/get-data.swagger';

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
    @UsePipes(ValidationPipe)
    async createData(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
        const responseData = await this.classesService.createData(createClassDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Delete("/:id")
    async deleteData(@Param("id") id: string, @Res() res: Response) {
        await this.classesService.deleteData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, `Success delete class data with uuid: ${id}`, null))
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
