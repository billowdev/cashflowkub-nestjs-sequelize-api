import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from './entities/role.enum';
import { JwtAuthGuard, RolesGuard, UserIsExist } from 'src/common/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { FastifyReply } from 'fastify';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserIsExist)
  @Post()
  @ApiBody({
    description: 'The body of user for create',
    schema: {
      example: {
        "email": "email@gmail.com",
        "username": "yourusername",
        "password": "yourpassword1234",
        "firstName": "first name",
        "lastName": "last name",
        "role": "premium"
      }
    }
  })
  @ApiCreatedResponse({
    description: 'create user was successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create user successfuly",
        data: {
          "createdAt": "2022-10-23T09:30:13.144Z",
          "updatedAt": "2022-10-23T09:30:13.144Z",
          "id": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          "isActive": true,
          "role": "premium",
          "email": "email@gmail.com",
          "username": "test3",
          "firstName": "test3",
          "lastName": "test3",
          "phone": null
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'create user was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "create user was failed",
        error: "Bad Request"
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'If username already exist',
    schema: {
      example: {
        "statusCode": 403,
        "message": "This username already exist",
        "error": "Forbidden"
      }
    }
  })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: FastifyReply) {
    const data: UserEntity = await this.userService.create(createUserDto);
    res.status(201).send({
      statusCode: res.statusCode,
      message: 'create user successfuly',
      data
    })
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiForbiddenResponse({
    description: 'If user not admin',
    schema: {
      example:
      {
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
      }
    }
  })
  @ApiOkResponse({
    description: 'get all user was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all user was successfuly",
        data:
          [{
            "createdAt": "2022-10-23T09:30:13.144Z",
            "updatedAt": "2022-10-23T09:30:13.144Z",
            "id": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
            "isActive": true,
            "role": "premium",
            "email": "email@gmail.com",
            "username": "test3",
            "firstName": "test3",
            "lastName": "test3",
            "phone": null
          }]

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all user was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get all user was failed",
        error: "Bad Request"
      }
    }
  })
  async findAll(@Res() res: FastifyReply) {
    const data: UserEntity[] = await this.userService.findAll();
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'get all user successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get all user failed',
        data: {}
      })
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your user id that you want to request data',
    example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
  })
  @ApiOkResponse({
    description: 'get user was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get user was successfuly",
        data:
        {
          "createdAt": "2022-10-23T09:30:13.144Z",
          "updatedAt": "2022-10-23T09:30:13.144Z",
          "id": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          "isActive": true,
          "role": "premium",
          "email": "email@gmail.com",
          "username": "test3",
          "firstName": "test3",
          "lastName": "test3",
          "phone": null
        }

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get user was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get user was failed",
        error: "Bad Request"
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'If user not admin',
    schema: {
      example:
      {
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
      }
    }
  })
  async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
    const data: UserEntity = await this.userService.findOne(id);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'get user successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get user failed',
        data: {}
      })
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your user id that you want to update data',
    example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
  })
  @ApiBody({
    description: 'The body of user for update',
    schema: {
      example: {
        "email": "email@gmail.com",
        "username": "yourusername",
        "password": "yourpassword1234",
        "firstName": "first name",
        "lastName": "last name",
        "role": "premium"
      }
    }
  })
  @ApiOkResponse({
    description: 'update user was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update user was successfuly",
        data: [1]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update user was failed', schema: {
      example: {
        statusCode: 400,
        message: "update user was failed",
        error: "Bad Request"
      }
    }
  })
  @ApiForbiddenResponse({
    description: 'If user not admin',
    schema: {
      example:
      {
        "statusCode": 403,
        "message": "Forbidden resource",
        "error": "Forbidden"
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: FastifyReply) {
    const data: [number, UserEntity[]] = await this.userService.update(id, updateUserDto);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'update user was successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'update user was failed',
        data: {}
      })
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOkResponse({
    description: 'delete user was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete user was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete user was failed', schema: {
      example: {
        statusCode: 400,
        message: "delete user was failed",
        error: "Bad Request"
      }
    }
  })
  @ApiParam({
    name: 'id',
    description: 'Enter your user id that you want to delete data',
    example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
  })
  async remove(@Param('id') id: string, @Res() res: FastifyReply) {
    const data: number = await this.userService.remove(id);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'delete user successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'delete user failed',
        data: {}
      })
    }
  }
}
