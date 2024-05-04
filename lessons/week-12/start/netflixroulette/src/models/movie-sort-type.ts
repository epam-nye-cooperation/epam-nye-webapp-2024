export enum MovieSortType {
  TITLE_ASC = 'title.ASC',
  TITLE_DESC = 'title.DESC',
  RATING_ASC = 'vote_average.ASC',
  RATING_DESC = 'vote_average.DESC',
  RELEASE_DATE_ASC = 'release_date.ASC',
  RELEASE_DATE_DESC = 'release_date.DESC',
}

export const SORT: Record<MovieSortType, string> = {
  [MovieSortType.TITLE_ASC]: 'Title (A-Z)',
  [MovieSortType.TITLE_DESC]: 'Title (Z-A)',
  [MovieSortType.RATING_ASC]: 'Never see again',
  [MovieSortType.RATING_DESC]: 'Best first',
  [MovieSortType.RELEASE_DATE_ASC]: 'Release date (oldest first)',
  [MovieSortType.RELEASE_DATE_DESC]: 'Release date (newest first)',
};
