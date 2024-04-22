import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchParams, SearchResults } from './search.type';
import { SearchService } from './search.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('bearer')
@ApiTags('Search')
@UseGuards(JwtAuthGuard)
@Controller('/search')
export class SearchController {

  constructor(private service: SearchService) {}

  @ApiOperation({ operationId: 'search', summary: 'Keresés', description: 'Keresés a bájitalok és varázslatok között' })
  @ApiOkResponse({ type: SearchResults, description: 'Találatok' })
  @ApiBadRequestResponse({ description: 'Érvénytelen keresési feltételek' })
  @Get()
  public search(@Query() params: SearchParams) {
    return this.service.search(params);
  }
}
