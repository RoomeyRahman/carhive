import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../../common/schemas';
import {
    MediaDocument,
    MediaSchema,
} from '../../common/schemas';

export type TypeDocument = Type & Document;

@Schema({
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
})
export class Type extends Base {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({
        type: MediaSchema,
    })
    image: MediaDocument;
}

export const TypeSchema = SchemaFactory.createForClass(Type);

TypeSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        return {
            _id: ret._id,
            name: ret.name,
            image: ret.image,
            isActive: ret.isActive,
        };
    },
});
