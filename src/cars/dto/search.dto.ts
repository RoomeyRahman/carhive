import { SearchQueryDto } from '../../common/dto';

export class SearchCarDto
    extends SearchQueryDto
    implements Readonly<SearchCarDto>
{}
