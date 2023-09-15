import { Controller, Get, Post, Delete, Put, UsePipes, ValidationPipe, Body, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { FilterTeacherDto } from './dto/filter-teacher.dto';
import { Response } from 'express';
import { SuccessResponse } from "./response/success-response.interface"


@Controller('teachers')
export class TeachersController {

    constructor(private readonly teachersService: TeachersService) {}

    @Get()
    @UsePipes(ValidationPipe)
    async getDatas(@Query() filterTeacherDto: FilterTeacherDto, @Res() res: Response) {
        const responseData = await this.teachersService.getDatas(filterTeacherDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Get("/:id")
    async getData(@Param("id") id: string, @Res() res: Response) {
        const responseData = await this.teachersService.getData(id)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createData(@Body() createTeacherDto: CreateTeacherDto, @Res() res: Response) {
        const responseData = await this.teachersService.createData(createTeacherDto)
        res.status(HttpStatus.OK).json(new SuccessResponse(HttpStatus.OK, "Success", responseData))
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
