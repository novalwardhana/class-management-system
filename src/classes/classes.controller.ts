import { Controller, Post, Body, UsePipes, ValidationPipe, Res, HttpStatus, Get } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from "./dto/create-class.dto";
import { Response } from 'express';
import { SuccessResponse } from "./response/success.response"

@Controller('classes')
export class ClassesController {

    constructor(private readonly classesService: ClassesService) {}

    @Get()
    async getDatas(@Res() res: Response) {
        const responseData = await this.classesService.getDatas()
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createData(@Body() createClassDto: CreateClassDto, @Res() res: Response) {
        const responseData = await this.classesService.createData(createClassDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

}
