import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, UseInterceptors, UploadedFile, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from './entities/role.enum';
import { JwtAuthGuard, RolesGuard, UserIsExist } from 'src/common/guards';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { FastifyReply } from 'fastify';
import { diskStorage } from 'multer';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { FastifyFileInterceptor } from 'src/common/interceptor/fastify-file-interceptor';
import { updateFileName } from 'src/utils/update-file-name.util';
import { imageFileFilter } from 'src/utils/image-file-filter.util';

import {
  ApiUserCreatedBadRequestResponse,
  ApiUserCreatedBody,
  ApiUserCreatedForbiddenResponse,
  ApiUserCreatedOkResponse,
  ApiUserDeleteBadRequestResponse,
  ApiUserDeleteOkResponse,
  ApiUserDeleteParam,
  ApiUserGetAllBadRequestResponse,
  ApiUserGetAllForbiddenResponse,
  ApiUserGetAllOkResponse,
  ApiUserGetOneBadRequestResponse,
  ApiUserGetOneOkResponse,
  ApiUserGetOneParam,
  ApiUserUpdateBadRequestResponse,
  ApiUserUpdateBody,
  ApiUserUpdateOkResponse,
  ApiUserUpdateParam,
  ApiUserUploadedImageBadRequestResponse,
  ApiUserUploadedImageOkResponse
} from './user.document';
import { ApiCommonForbiddenResponse } from 'src/common/swagger-document/forbidden.document';
import { UploadImageDto } from './dto/upload-image-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UserIsExist)
  @Post()
  @ApiBody(ApiUserCreatedBody)
  @ApiCreatedResponse(ApiUserCreatedOkResponse)
  @ApiBadRequestResponse(ApiUserCreatedBadRequestResponse)
  @ApiForbiddenResponse(ApiUserCreatedForbiddenResponse)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: FastifyReply) {
    const data: UserEntity = await this.userService.create(createUserDto);
    res.status(201).send(data)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiForbiddenResponse(ApiUserGetAllForbiddenResponse)
  @ApiOkResponse(ApiUserGetAllOkResponse)
  @ApiBadRequestResponse(ApiUserGetAllBadRequestResponse)
  async findAll(@Res() res: FastifyReply) {
    const data: UserEntity[] = await this.userService.findAll();
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'get all user was successfuly',
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get all user was failed',
      })
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam(ApiUserGetOneParam)
  @ApiOkResponse(ApiUserGetOneOkResponse)
  @ApiBadRequestResponse(ApiUserGetOneBadRequestResponse)
  @ApiForbiddenResponse(ApiCommonForbiddenResponse)
  async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
    const data: UserEntity = await this.userService.findOne(id, true);
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get user was failed',
      })
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @ApiParam(ApiUserUpdateParam)
  @ApiBody(ApiUserUpdateBody)
  @ApiOkResponse(ApiUserUpdateOkResponse)
  @ApiBadRequestResponse(ApiUserUpdateBadRequestResponse)
  @ApiForbiddenResponse(ApiCommonForbiddenResponse)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: FastifyReply) {

    const data: [number, UserEntity[]] = await this.userService.update(id, updateUserDto);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'update user was successfuly',
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'update user was failed',
      })
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiParam(ApiUserDeleteParam)
  @ApiOkResponse(ApiUserDeleteOkResponse)
  @ApiBadRequestResponse(ApiUserDeleteBadRequestResponse)
  @ApiForbiddenResponse(ApiCommonForbiddenResponse)
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

  @Post('/file')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse(ApiUserUploadedImageOkResponse)
  @ApiBadRequestResponse(ApiUserUploadedImageBadRequestResponse)
  @UseInterceptors(
    FastifyFileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploaded/images/user',
        filename: updateFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadImageDto,
    @Res() res: FastifyReply, @Req() req: RequestWithAuth) {
    try {
      await this.userService.update(req.user.sub, {
        image: file.filename
      })
      res.status(200).send({
        message: 'uploaded file was successfuly',
        file_name: file.filename,
      })
    } catch (error) {
      throw new BadRequestException()
    }

  }

}
