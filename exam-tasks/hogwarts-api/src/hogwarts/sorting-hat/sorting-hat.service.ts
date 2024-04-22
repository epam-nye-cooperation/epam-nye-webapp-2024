import { Injectable } from '@nestjs/common';
import { QuizAnswers } from './sorting-hat.types';
import { HouseService } from '../houses/houses.service';
import { House, HouseId } from '../houses/houses.type';

@Injectable()
export class SortingHatService {
  constructor(private houses: HouseService) {}

  evaluateAnswers({ animal, color, element, traits }: QuizAnswers): House {
    const houseList = this.houses.getHouses();
    const points = houseList.reduce((map, { houseId }) => ({ ...map, [houseId]: 0 }), {});
    const houseByAnimal = houseList.find((house) => animal === house.animal )?.houseId;
    if (houseByAnimal) {
      points[houseByAnimal] += 1;
    }

    const houseByElement = houseList.find((house) => element === house.element)?.houseId;
    if (houseByElement) {
      points[houseByElement] += 1;
    }

    const uniqueTraits = new Set(traits.map((item) => `${item}`));
    houseList.forEach(({ houseId, traits }) => {
      const matches = traits.filter((trait) => uniqueTraits.has(trait));
      points[houseId] += matches.length;
    });

    const houseByColors = color.map(
      (color) => {
        const house = houseList.find(({ houseColors }) => houseColors.toLowerCase().includes(color.toLowerCase()));
        return house?.houseId;
      }
    ).filter(Boolean);
    houseByColors.forEach((id) => points[id]++);

    const final = (Object.entries(points) as Array<[HouseId, number]>).sort(([houseA, pointA], [houseB, pointB]) => {
      return pointB - pointA;
    });

    return this.houses.getHouse(final[0][0]);
  }
}
