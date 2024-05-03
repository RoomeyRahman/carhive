import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../../users/schemas';
import {
    MediaDocument,
    MediaSchema,
} from '../../common/schemas';
import { SCHEMA, Currency } from '../../common/mock';
import { Base } from '../../common/schemas';
import { TypeDocument } from '../../types/schemas';
import { BrandDocument } from 'src/brands/schemas';

export type CarDocument = Car & Document;

@Schema({
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
})
export class Car extends Base {
    @Prop({
        unique: true,
        required: true
    })
    carId: string;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.USER,
        required: true,
    })
    owner: UserDocument;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.TYPE,
        required: true,
    })
    type: TypeDocument;

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: SCHEMA.BRAND,
        required: true,
    })
    brand: BrandDocument;

    @Prop({
        minlength: 1,
        maxlength: 30,
        required: true
    })
    name: string;

    @Prop({
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 10,
    })
    slug: string;

    @Prop()
    make: string;

    @Prop()
    model: string;

    @Prop()
    year: number;

    @Prop()
    color: string;

    @Prop()
    mileage: number;

    @Prop()
    transmission: string;

    @Prop()
    fuelType: string;

    @Prop()
    numberOfSeats: number;

    @Prop()
    rentPerDayPrice: number;

    @Prop({ default: Currency.TK })
    priceCurrency: string;

    @Prop()
    features: string[];

    @Prop()
    additionalRules: string;

    @Prop({
        type: MediaSchema,
    })
    thumbnail: MediaDocument;

    @Prop({
        type: [MediaSchema],
        default: undefined,
    })
    images: MediaDocument[];

    @Prop({
        type: [MediaSchema],
        default: undefined,
    })
    videos: MediaDocument[];

    @Prop()
    ratings: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);

CarSchema.set('toJSON', {
    transform: function (doc, ret) {
        return {
            _id: ret._id,
            carId: ret.carId,
            owner: ret.owner,
            type: ret.type,
            brand: ret.brand,
            name: ret.name,
            slug: ret.slug,
            make: ret.make,
            model: ret.model,
            year: ret.year,
            color: ret.color,
            mileage: ret.mileage,
            transmission: ret.transmission,
            numberOfSeats: ret.numberOfSeats,
            rentPerDayPrice: ret.rentPerDayPrice,
            priceCurrency: ret.priceCurrency,
            features: ret.features,
            additionalRules: ret.additionalRules,
            thumbnail: ret.thumbnail,
            images: ret.images,
            videos: ret.videos,
            ratings: ret.ratings,
            isActive: ret.isActive,
            isDeleted: ret.isDeleted,
        };
    },
});
