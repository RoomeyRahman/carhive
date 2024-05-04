import {
    IsMongoId,
    IsString,
    ValidateNested,
    IsEnum
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    BaseDto,
} from '../../common/dto';
import { IRent } from '../interfaces';
import { Status, PaymentStatus } from 'src/common/mock';

export class RentDto extends BaseDto implements Readonly<RentDto> {
    @ApiProperty()
    rentId: string;

    @ApiProperty()
    @IsMongoId()
    carType: string;

    @ApiProperty()
    @IsMongoId()
    car: string;

    @ApiProperty()
    @IsMongoId()
    owner: string;

    @ApiProperty()
    @IsMongoId()
    customer: string;

    @ApiProperty()
    rentFromDate: number;

    @ApiProperty()
    rentToDate: number;

    @ApiProperty()
    pickup: string;

    @ApiProperty()
    dropoff: string;

    @ApiProperty()
    destiniation: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    priceBreakdown: Record<string, any>; // Define as Record<string, any> for JSON object

    @ApiProperty({
        enum: Status
    })
    @IsEnum(Status)
    @IsString()
    status: string;

    @ApiProperty({
        enum: PaymentStatus
    })
    @IsEnum(PaymentStatus)
    @IsString()
    paymentStatus: string;

    @ApiProperty()
    @IsString()
    notesForOwner: string;

    constructor(data?: IRent) {
        super(data);
        if (data) {
            data.rentId && (this.rentId = data.rentId);
            data.carType && (this.carType = data.carType);
            data.car && (this.car = data.car);
            data.owner && (this.owner = data.owner);
            data.customer && (this.customer = data.customer);
            data.rentFromDate && (this.rentFromDate = data.rentFromDate);
            data.rentToDate && (this.rentToDate = data.rentToDate);
            data.pickup && (this.pickup = data.pickup);
            data.dropoff && (this.dropoff = data.dropoff);
            data.destiniation && (this.destiniation = data.destiniation);
            data.price && (this.price = data.price);
            data.priceBreakdown && (this.priceBreakdown = data.priceBreakdown);
            data.status && (this.status = data.status);
            data.paymentStatus && (this.paymentStatus = data.paymentStatus);
            data.notesForOwner && (this.notesForOwner = data.notesForOwner);
        }
    }
}
