import {
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
    MediaDto,
    BaseDto
} from '../../common/dto';
import {
    IMedia,
} from '../../common/interfaces';
import { IType } from '../interfaces';

export class TypeDto extends BaseDto implements Readonly<TypeDto> {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({
        type: MediaDto,
    })
    @ValidateNested({ each: true })
    @Type(() => MediaDto)
    image: IMedia;

    constructor(data?: IType) {
        super(data);
        if (data) {
            data.name && (this.name = data.name);
            data.image && (this.image = data.image);
        }
    }
}
