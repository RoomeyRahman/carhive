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
  import { CarsService } from '../services';
  import { ICar, ICars } from '../interfaces';
  import { 
    CreateCarDto,
    SearchCarDto,
    UpdateCarDto 
} from '../dto';
  
  @ApiTags('Car')
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error!',
  })
  @Controller('cars')
  export class CarsController {
    /**
     * Constructor
     * @param {CarsService} service
     */
    constructor(private readonly service: CarsService) {}
  
    /**
     * Car create
     * @Body {CreateCarDto} data
     * @user {IUser} user
     * @returns {Promise<ICar>}
     */
    @ApiOperation({ summary: 'Car creation' })
    @ApiBearerAuth()
    @ApiHeader({
      name: 'Authorization',
      description: 'Bearer Token',
    })
    @ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Return Car.',
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
      @Body() data: CreateCarDto,
      @UploadedFiles()
      files?: {
        image: Express.Multer.File[];
      },
    ): Promise<ICar> {
      try {
        return this.service.create(data, user, files);
      } catch (err) {
        throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
          cause: new Error(err),
        });
      }
    }
  
    /**
     * find all cars
     * @returns {Promise<ICars>}
     */
    @ApiOperation({ summary: 'Get all cars' })
    @UsePipes(new ValidationPipe(true))
    @Get()
    public findAll(@Query() query: SearchCarDto): Promise<ICars> {
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
     * count cars
     * @returns {Promise<number>}
     */
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Count cars' })
    @UsePipes(new ValidationPipe(true))
    @UseGuards(JwtAuthGuard)
    @Get('count')
    public count(@Query() query: SearchCarDto): Promise<number> {
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
     * @returns {Promise<ICar>}
     */
    @ApiOperation({ summary: 'Get car from id' })
    @ApiResponse({ status: 200, description: 'Return car information.' })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User Not found.',
    })
    @Get(':id')
    public async getOne(@Param('id') id: string): Promise<ICar> {
      try {
        return await this.service.findOne(id);
      } catch (err) {
        throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
          cause: new Error(err),
        });
      }
    }
  
    /**
     * Car update
     * @Body {UpdateCarDto} data
     * @User {IUser} user
     * @returns {Promise<ICar>}
     */
    @ApiBearerAuth()
    @ApiHeader({
      name: 'Authorization',
      description: 'Bearer Token',
    })
    @ApiOperation({ summary: 'Car update' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Return updated car.',
    })
    @ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Car not found',
    })
    @ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid data',
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileUploadDto })
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]))
    @Put(':id')
    public async updatePut(
      @User() user: IUser,
      @Param('id') id: string,
      @Body() data: UpdateCarDto,
      @UploadedFiles()
      files: {
        image: Express.Multer.File[],
        thumbnail: Express.Multer.File[]
      }   
    ): Promise<ICar> {
      try {
        return await this.service.update(id, data, user, files);
      } catch (err) {
        throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
          cause: new Error(err),
        });
      }
    }
  
    @ApiOperation({ summary: 'Car update' })
    @ApiBearerAuth()
    @ApiHeader({
      name: 'Authorization',
      description: 'Bearer Token',
    })
    @ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Return Car.',
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
      @Body() data: UpdateCarDto,
    ): Promise<ICar> {
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
  