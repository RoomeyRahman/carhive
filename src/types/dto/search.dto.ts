import { SearchQueryDto } from '../../common/dto';

export class SearchTypeDto
    extends SearchQueryDto
    implements Readonly<SearchTypeDto> { }
