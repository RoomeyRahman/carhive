import {
  HttpStatus,
  Controller,
  Body,
  Delete,
  Get,
  HttpException,
  MethodNotAllowedException,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Param,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { TrimPipe, ValidationPipe } from '../../common/pipes';
import { IUser } from '../../users/interfaces';

import { FileUploadDto } from '../../common/dto';
import {  IType, ITypes } from '../interfaces';
import { CreateTypeDto, SearchTypeDto, UpdateTypeDto } from '../dto';
import { TypesService } from '../services';

@ApiTags('Type')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('types')
export class TypesController {
  /**
   * Constructor
   * @param {TypesService} service
   */
  constructor(private readonly service: TypesService) {}

  /**
   * Type create
   * @Body {CreateTypeDto} data
   * @user {IUser} user
   * @returns {Promise<IType>}
   */
  @ApiOperation({ summary: 'Types creation' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Type.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Post()
  create(
    @User() user: IUser,
    @Body() data: CreateTypeDto,
    @UploadedFiles()
    files?: {
      image: Express.Multer.File[];
    },
  ): Promise<IType> {
    try {
      return this.service.create(data, user, files);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * find all types
   * @returns {Promise<ITypes>}
   */
  @ApiOperation({ summary: 'Get all Types' })
  @UsePipes(new ValidationPipe(true))
  @Get()
  public findAll(@Query() query: SearchTypeDto): Promise<ITypes> {
    try {
      return this.service.findAll(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  @ApiExcludeEndpoint()
  @Put()
  public createPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch()
  public createPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete()
  public createDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * count types
   * @returns {Promise<number>}
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Count Types' })
  @UsePipes(new ValidationPipe(true))
  @UseGuards(JwtAuthGuard)
  @Get('count')
  public count(@Query() query: SearchTypeDto): Promise<number> {
    try {
      return this.service.count(query);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }
  @ApiExcludeEndpoint()
  @Post('count')
  public countPost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Put('count')
  public countPut() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Patch('count')
  public countPatch() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete('count')
  public countDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  /**
   * @Param {string} id
   * @returns {Promise<ITypes>}
   */
  @ApiOperation({ summary: 'Get type from id' })
  @ApiResponse({ status: 200, description: 'Return type information.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not found.',
  })
  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<IType> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Type update
   * @Body {UpdateTypeDto} data
   * @User {IUser} user
   * @returns {Promise<IType>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Type update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return updated type.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Type not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Put(':id')
  public async updatePut(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() data: UpdateTypeDto,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
    },
  ): Promise<IType> {
    try {
      return await this.service.update(id, data, user, files);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  @ApiOperation({ summary: 'Type update' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return Type.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @UsePipes(new ValidationPipe(true))
  @UsePipes(new TrimPipe())
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() data: UpdateTypeDto,
  ): Promise<IType> {
    try {
      return this.service.update(id, data, user);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  @ApiExcludeEndpoint()
  @Post(':id')
  public updatePost() {
    throw new MethodNotAllowedException('Method not allowed');
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  public updateDelete() {
    throw new MethodNotAllowedException('Method not allowed');
  }
}
