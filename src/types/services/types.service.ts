import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../../users/interfaces';
import { SCHEMA } from '../../common/mock';
import {
  createSearchQuery,
} from '../../common/utils/helper';
import { IType, ITypes } from '../interfaces';
import { CreateTypeDto, SearchTypeDto, TypeDto, UpdateTypeDto } from '../dto';

@Injectable()
export class TypesService {
  /**
   * Constructor
   * @param {Model<IType>} model
   */
  constructor(
    @InjectModel(SCHEMA.TYPE)
    private readonly model: Model<IType>,
  ) {}

  /**
   * Create category
   * @param {IUser} user
   * @param {CreateTypeDto} data
   * @returns {Promise<IType>}
   */
  async create(
    data: CreateTypeDto,
    user: IUser,
    files?: {
      image: Express.Multer.File[];
    },
  ): Promise<IType> {
    try {
      const newObj = {
        ...data,
        cBy: user._id,
      };
      if (files) {
        if (files?.image) {
          return Promise.reject(new BadRequestException('Currently we do not provide file service.'));
        }
      }
      const body = new TypeDto(newObj);
      const registerDoc = new this.model(body);
      return await registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Update type
   * @param {IUser} user
   * @param {string} id
   * @param {UpdateTypeDto} data
   * @returns {Promise<IType>}
   */
  async update(
    id: string,
    data: UpdateTypeDto,
    user: IUser,
    files?: {
      image: Express.Multer.File[];
    },
  ): Promise<IType> {
    try {
      const record = await this.model.findOne({
        _id: id,
        isDeleted: false,
      });
      if (!record) {
        return Promise.reject(
          new NotFoundException('Could not find type.'),
        );
      }
      const body = new TypeDto({
        ...data,
        uBy: user._id,
      });
      if (files) {
        if (files && files.image) {
          return Promise.reject(new BadRequestException('Currently we do not provide file service.'));
        }
      }
      return await record.set(body).save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Find All type
   * @param {SearchTypeDto} query
   * @returns {Promise<ITypes>}
   */
  async findAll(query: SearchTypeDto): Promise<ITypes> {
    try {
      const searchQuery = createSearchQuery(query);
      const limit: number = (query && query.limit) || 10;
      const skip: number = (query && query.skip) || 0;

      const cursor = !query.getAllRecord
        ? this.model.find(searchQuery).limit(limit).skip(skip)
        : this.model.find(searchQuery);
      if (query.hasOwnProperty('sort') && query.sort) {
        cursor.sort(JSON.parse(query.sort));
      }

      const result: ITypes = {
        data: await cursor.exec(),
      };

      if (query.pagination) {
        result.pagination = {
          total: await this.model.countDocuments(searchQuery),
          limit,
          skip,
        };
      }
      return result;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * Find one category
   * @param {string} id
   * @returns {Promise<IType>}
   */
  async findOne(id: string): Promise<IType> {
    try {
      const res = await this.model.findOne({ _id: id });

      if (!res) {
        return Promise.reject(
          new NotFoundException('Could not find category.'),
        );
      }
      return res;
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }

  /**
   * count category
   * @returns {Promise<number>}
   */
  async count(query: SearchTypeDto): Promise<number> {
    try {
      const searchQuery = createSearchQuery(query);
      return await this.model.countDocuments(searchQuery);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
        cause: new Error(err),
      });
    }
  }
}
