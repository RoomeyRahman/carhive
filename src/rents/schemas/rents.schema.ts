import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../users/schemas';
import { SCHEMA } from '../../common/mock';
import { Base } from '../../common/schemas';
import { CarDocument } from '../../cars/schemas';
import { TypeDocument } from '../../types/schemas';

export type RentDocument = Rent & Document;

@Schema({
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
})
export class Rent extends Base {
    @Prop({
        unique: true,
        required: true
    })
    rentId: string;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.TYPE,
        required: true,
    })
    carType: TypeDocument;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.CAR,
        required: true,
    })
    car: CarDocument;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.USER,
        required: true,
    })
    owner: UserDocument;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.USER,
        required: true,
    })
    customer: UserDocument;

    @Prop()
    rentFromDate: number;

    @Prop()
    rentToDate: number;

    @Prop()
    pickup: string;

    @Prop()
    dropoff: string;

    @Prop()
    destiniation: string;

    @Prop()
    price: number;

    @Prop({
        type: SchemaTypes.Mixed, // Define as Mixed type for JSON object
    })
    priceBreakdown: Record<string, any>; // Define as Record<string, any> for JSON object

    @Prop()
    status: string;

    @Prop()
    paymentStatus: string;

    @Prop()
    notesForOwner: string;
}

export const RentSchema = SchemaFactory.createForClass(Rent);

RentSchema.set('toJSON', {
    transform: function (doc, ret) {
        return {
            _id: ret._id,
            rentId: ret.rentId,
            carType: ret.carType,
            car: ret.car,
            owner: ret.owner,
            customer: ret.customer,
            rentFromDate: ret.rentFromDate,
            rentToDate: ret.rentToDate,
            pickup: ret.pickup,
            dropoff: ret.dropoff,
            destiniation: ret.destiniation,
            price: ret.price,
            priceBreakdown: ret.priceBreakdown,
            status: ret.status,
            paymentStatus: ret.paymentStatus,
            notesForOwner: ret.notesForOwner,
            isActive: ret.isActive,
            isDeleted: ret.isDeleted,
        };
    },
});
