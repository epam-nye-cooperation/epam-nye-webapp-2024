/**
 * Keressünk a Roxfort-i házak között
 * Keresési feltételek lehetnek:
 *  - név, leírás vagy elem alapján (bármelyik a háromból, kis és nagybetű nem számít) - query,
 *  - alapértékek egyike megtalálható (pl. bátorság, szerénység, stb.) - traits (tömb vagy null)
 *  - rendezés név, jelkép vagy pontszám alapján, növekvő vagy csökkenő sorrendben - orderBy: 'name.ASC', 'name.DESC', 'animal.ASC', 'animal.DESC', 'points.ASC', 'points.DESC',
 * Alapértelmezett rendezés: név szerint növekvő sorrend ('name.ASC')
 * Ha valamire nincs keresési kitétel, akkor alapvetően mindegyik elemre igaznak vesszük
 */

import data from './03-input.json';

interface HouseHead {
  id: string;
  firstname: string;
  lastname: string;
}

enum Trait {
  COURAGE = "Bátorság",
  CHIVALRY = "Lovagiasság",
  NERVE = "Magabiztosság",
  DARING = "Merészség",
  DETERMINATION = "Elszántság",
  LEARNING = "Tanulás",
  ACCEPTANCE = "Elfogadás",
  INTELIGENCE = "Intelligencia",
  WISDOM = "Bölcsesség",
  WIT = "Ész",
  CREATIVITY = "Kreativitás",
  HARDWORKING = "Dolgosság",
  PATIENCE = "Türelmesség",
  LOYALTY = "Hűségesség",
  JUST = "Akarat",
  FAIRNESS = "Méltányosság",
  MODESTY = "Szerénység",
  RESOURCEFULNESS = "Találékonyság",
  SELFPRESERVATION = "Önvédelem",
  AMBITION = "Ambíció",
  CUNNING = "Ravaszság",
  PRIDE = "Büszkeség"
};

interface HogwartsHouse {
  id: string;
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
  description: string;
  points: 100;
  heads: HouseHead[];
  traits: Trait[];
}

interface SearchParams {
  query?: string;
  traits?: Trait[];
  orderBy?: 'name.ASC' | 'name.DESC' | 'animal.ASC' | 'animal.DESC' | 'points.ASC' | 'points.DESC';
}

const HOUSES: HogwartsHouse[] = data as unknown as HogwartsHouse[];
const LANG = 'hu-HU';

type FilterCallback = (house: HogwartsHouse, index: number, houses: HogwartsHouse[]) => boolean;
type Comparator = (house1: HogwartsHouse, house2: HogwartsHouse) => number;

const filterByQuery = (query?: string): FilterCallback => {
  if (!query) {
    return Boolean;
  }
  const searchQuery = query.toLocaleLowerCase(LANG);
  return (house) => (
    house.name.toLocaleLowerCase(LANG).indexOf(searchQuery) > -1 ||
    house.description.toLocaleLowerCase(LANG).indexOf(searchQuery) > -1 ||
    house.animal.toLocaleLowerCase(LANG).indexOf(searchQuery) > -1
  );
};

const filterByTraits = (traits?: Trait[]): FilterCallback => {
  if (!(traits && Array.isArray(traits))) {
    return Boolean;
  }
  return (house) => house.traits.some((trait) => traits.includes(trait));
};

const sortOrder = (orderBy: string): Comparator => {
  const [order, direction] = orderBy?.split('.') ?? ['name', 'ASC'];
  return (house1, house2) => {
    let result = 0;
    if (order === 'name' || order === 'animal') {
      result = house1[order].localeCompare(house2[order], LANG);
    } else if (order === 'points') {
      result = house1.points - house2.points;
    }
    return direction === 'ASC' ? result : -result;
  };
};

const search = ({ query, traits, orderBy = 'name.ASC' }: SearchParams): HogwartsHouse[] => {
  return HOUSES
    .filter(filterByQuery(query))
    .filter(filterByTraits(traits))
    .sort(sortOrder(orderBy));
};

console.log(search({ orderBy: 'points.ASC' }));
