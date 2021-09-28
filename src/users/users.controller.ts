import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { User } from './shared/user';
import { UserService } from './shared/user.service';

@Controller('users')
export class UsersController {

    //construtor dos métodos criados no service -> regra de negócio
    constructor(
        private userService: UserService
        ){ }

        //decorator que indica que é uma requisição do tipo GET
        @Get()
        async getAll() : Promise<User[]> {
            return this.userService.getAll();
        }

        @Get(':id')
        async getById(@Param('id') id:number) : Promise<User> {
            return this.userService.getById(id);
        }

        @Post()
        async create(@Body() user: User): Promise<User>{
            return this.userService.create(user);
        }

        @Put(':id')
        async update(@Param('id') id: number, @Body() user: User): Promise<User>{
            user.id = id;
            return this.userService.update(user);
        }

        @Delete(':id')
        async delete(@Param('id') id: number) {
            this.userService.delete(id);
        }
}


