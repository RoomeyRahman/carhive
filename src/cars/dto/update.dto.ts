import { OmitType } from '@nestjs/swagger';
import { CarDto } from './cars.dto';
import { ICar } from '../interfaces';

export class UpdateCarDto
    extends OmitType(CarDto, [
        'carId',
        'owner',
        'slug',
        'ratings',
        'isActive',
        'isDeleted',
        'cTime',
        'cBy',
        'uTime',
        'uBy'
    ] as const)
    implements Readonly<UpdateCarDto> {
    constructor(data?: ICar) {
        super(data);
    }
}
