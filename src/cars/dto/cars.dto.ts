import {
    IsMongoId,
    IsString,
    ValidateNested,
    IsArray,
    IsEnum
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    MediaDto,
    BaseDto,
} from '../../common/dto';
import { IMedia } from '../../common/interfaces';
import { ICar } from '../interfaces';
import { Currency } from 'src/common/mock';

export class CarDto extends BaseDto implements Readonly<CarDto> {
    @ApiProperty()
    carId: string;
    
    @ApiProperty()
    @IsMongoId()
    owner: string;

    @ApiProperty()
    @IsMongoId()
    type: string;

    @ApiProperty()
    @IsMongoId()
    brand: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    slug: string;

    @ApiProperty()
    @IsString()
    make: string;

    @ApiProperty()
    @IsString()
    model: string;

    @ApiProperty()
    year: number;

    @ApiProperty()
    color: string;

    @ApiProperty()
    mileage: number;

    @ApiProperty()
    transmission: string;

    @ApiProperty()
    fuelType: string;

    @ApiProperty()
    numberOfSeats: number;

    @ApiProperty()
    rentPerDayPrice: number;

    @ApiProperty({
        required: false,
        enum: Currency
    })
    @IsEnum(Currency)
    @IsString()
    priceCurrency: string;

    @ApiProperty()
    features: string[];

    @ApiProperty()
    additionalRules: string;

    @ApiProperty({
        type: MediaDto
    })
    @Type(() => MediaDto)
    thumbnail: IMedia;    

    @ApiProperty({
        type: [MediaDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MediaDto)
    images: IMedia[];

    @ApiProperty({
        type: [MediaDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MediaDto)
    videos: IMedia[];

    @ApiProperty()
    ratings: number;

    constructor(data?: ICar) {
        super(data);
        if (data) {
            data.carId && (this.carId = data.carId);
            data.owner && (this.owner = data.owner);
            data.type && (this.type = data.type);
            data.brand && (this.brand = data.brand);
            data.name && (this.name = data.name);
            data.slug && (this.slug = data.slug);
            data.make && (this.make = data.make);
            data.model && (this.model = data.model);
            data.year && (this.year = data.year);
            data.color && (this.color = data.color);
            data.priceCurrency && (this.priceCurrency = data.priceCurrency);
            data.mileage && (this.mileage = data.mileage);
            data.transmission && (this.transmission = data.transmission);
            data.videos && (this.videos = data.videos);
            data.fuelType && (this.fuelType = data.fuelType);
            data.numberOfSeats && (this.numberOfSeats = data.numberOfSeats);
            data.rentPerDayPrice && (this.rentPerDayPrice = data.rentPerDayPrice);
            data.priceCurrency && (this.priceCurrency = data.priceCurrency);
            data.features && (this.features = data.features);
            data.additionalRules && (this.additionalRules = data.additionalRules);
            data.thumbnail && (this.thumbnail = data.thumbnail);
            data.images && (this.images = data.images);
            data.videos && (this.videos = data.videos);
            data.ratings && (this.ratings = data.ratings);            
        }
    }
}
