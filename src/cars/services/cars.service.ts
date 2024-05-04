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
    generateUniqueCode,
    slug,
} from '../../common/utils/helper';
import { ICar, ICars } from '../interfaces';
import {
    CreateCarDto,
    CarDto,
    SearchCarDto,
    UpdateCarDto
} from '../dto';

@Injectable()
export class CarsService {
    /**
     * Constructor
     * @param {Model<IHome>} model
     */
    constructor(
        @InjectModel(SCHEMA.CAR)
        private readonly model: Model<ICar>,
    ) { }

    /**
     * Create car
     * @param {IUser} user
     * @param {CreateCarDto} data
     * @returns {Promise<ICar>}
     */
    async create(
        data: CreateCarDto,
        user: IUser,
        files?: {
            image: Express.Multer.File[];
        },
    ): Promise<ICar> {
        try {
            const newObj: any = {
                ...data,
                carId: generateUniqueCode('1234567890', 8),
                slug: slug(),
                host: user._id,
                cBy: user._id,
            };
            if (files) {
                if (files?.image) {
                    return Promise.reject(new BadRequestException('Currently we do not provide file service.'));
                }
            }
            const body = new CarDto(newObj);
            const registerDoc = new this.model(body);
            return await registerDoc.save();
        } catch (err) {
            throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
                cause: new Error(err),
            });
        }
    }

    /**
     * Update car
     * @param {IUser} user
     * @param {string} id
     * @param {UpdateCarDto} data
     * @returns {Promise<ICar>}
     */
    async update(
        id: string,
        data: UpdateCarDto,
        user: IUser,
        files?: {
            image: Express.Multer.File[];
            thumbnail: Express.Multer.File[];
        },
    ): Promise<ICar> {
        try {
            const record = await this.model.findOne({
                _id: id,
                isDeleted: false,
            });
            if (!record) {
                return Promise.reject(new NotFoundException('Could not find car.'));
            }
            const body = new CarDto({
                ...data,
                uBy: user._id,
            });
            if (files) {
                if (files && files.image) {
                    return Promise.reject(new BadRequestException('Currently we do not provide file service.'));
                }
                if (files && files.thumbnail) {
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
     * Find All cars
     * @param {SearchCarDto} query
     * @returns {Promise<ICars>}
     */
    async findAll(query: SearchCarDto): Promise<ICars> {
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

            const result: ICars = {
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
     * Find one car
     * @param {string} id
     * @returns {Promise<ICar>}
     */
    async findOne(id: string): Promise<ICar> {
        try {
            const res = await this.model.findOne({ _id: id });
            if (!res) {
                return Promise.reject(new NotFoundException('Could not find car.'));
            }
            return res;
        } catch (err) {
            throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST, {
                cause: new Error(err),
            });
        }
    }

    /**
     * count car
     * @returns {Promise<number>}
     */
    async count(query: SearchCarDto): Promise<number> {
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

