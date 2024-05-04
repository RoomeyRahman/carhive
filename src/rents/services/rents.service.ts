import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateRentDto,
    SearchRentDto,
    RentDto,
    UpdateRentDto,
} from '../dto';
import { IRents, IRent } from '../interfaces';
import { IUser } from '../../users/interfaces';
import { 
    createSearchQuery,
    generateUniqueCode,
} from '../../common/utils/helper';
import { SCHEMA } from '../../common/mock';

@Injectable()
export class RentsService {
    /**
     * Constructor
     * @param {Model<IRent>} model
     */
    constructor(
        @InjectModel(SCHEMA.RENT)
        private readonly model: Model<IRent>,
    ) { }

    /**
     * Create record
     * @param {CreateRentDto} data
     * @param {IUser} user
     * @returns {Promise<IRent>}
     */
    async create(data: CreateRentDto, user: IUser): Promise<IRent> {
        try {
            if (data.owner === user._id) {
                return Promise.reject(
                    new BadRequestException("Car owner can't rent his own car")
                );
            }
            const body = new RentDto({
                ...data,
                customer: user._id,
                rentId: generateUniqueCode('1234567890', 8),
                cBy: user._id
            });
            const registerDoc = new this.model(body);
            return await registerDoc.save();
        } catch (err) {
            throw new HttpException(
                err,
                err.status || HttpStatus.BAD_REQUEST,
                {
                    cause: new Error(err)
                }
            );
        }
    }

    /**
     * Update record
     * @param {IUser} user
     * @param {string} id
     * @param {UpdateRentDto} data
     * @returns {Promise<IRent>}
     */
    async update(
        id: string,
        data: UpdateRentDto,
        user: IUser,
    ): Promise<IRent> {
        try {
            const record = await this.model.findOne({
                _id: id,
                isDeleted: false,
            });
            if (!record) {
                return Promise.reject(new NotFoundException('Could not find record.'));
            }
            const body = new RentDto({
                ...data,
                uBy: user._id
            });
            return await record.set(body).save();
        } catch (err) {
            throw new HttpException(
                err,
                err.status || HttpStatus.BAD_REQUEST,
                {
                    cause: new Error(err)
                }
            );
        }
    }

    /**
     * Find All record
     * @param {SearchRentDto} query
     * @returns {Promise<IRents>}
     */
    async findAll(query: SearchRentDto): Promise<IRents> {
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

            const result: IRents = {
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
            throw new HttpException(
                err,
                err.status || HttpStatus.BAD_REQUEST,
                {
                    cause: new Error(err)
                }
            );
        }
    }


    /**
     * Find one record
     * @param {string} id
     * @returns {Promise<IRent>}
     */
    async findOne(id: string): Promise<IRent> {
        try {
            const res = await this.model.findOne({ _id: id });

            if (!res) {
                return Promise.reject(new NotFoundException('Could not find record.'));
            }
            return res;
        } catch (err) {
            throw new HttpException(
                err,
                err.status || HttpStatus.BAD_REQUEST,
                {
                    cause: new Error(err)
                }
            );
        }
    }

    /**
     * count record
     * @returns {Promise<number>}
     */
    async count(query: SearchRentDto): Promise<number> {
        try {
            const searchQuery = createSearchQuery(query);
            return await this.model.countDocuments(searchQuery);
        } catch (err) {
            throw new HttpException(
                err,
                err.status || HttpStatus.BAD_REQUEST,
                {
                    cause: new Error(err)
                }
            );
        }
    }
}



