import { Controller, Post, Get, Delete, Put, Param, Body, UsePipes, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from "./dto/create-class.dto";
import { Response } from 'express';
import { SuccessResponse } from "./response/success.response"
import { ErrorResponse } from './response/error.response'
import { UpdateClassDto } from './dto/update-class.dto'
import { ClassStatusEnum } from './entity/class-status-enum.entity'
import { Class } from './entity/class.entity';


@Controller('classes')
export class ClassesController {

    constructor(private readonly classesService: ClassesService) {}

    @Get()
    async getDatas(@Res() res: Response) {
        const responseData = await this.classesService.getDatas()
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Get("/:id")
    async getData(@Param("id") id: string, @Res() res: Response) {
        const responseData = await this.classesService.getData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
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
                throw new ErrorResponse("set class status is not valid")
            }
        }

        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

}
