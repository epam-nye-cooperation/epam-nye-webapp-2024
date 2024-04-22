import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { HouseElements } from "../houses/houses.type";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum } from "class-validator";

export enum PreferredColor {
  BLACK = 'Black',
  BLUE = 'Blue',
  BRONZE = 'Bronze',
  GOLD = 'Gold',
  GREEN = 'Green',
  SCARLET = 'Scarlet',
  SILVER = 'Silver',
  YELLOW = 'Yellow',
};

export enum PreferredAnimal {
  BADGER = 'Badger',
  EAGLE = 'Eagle',
  LION = 'Lion',
  SERPENT = 'Serpent',
}

export enum Traits {
  ACCEPTANCE = "Acceptance",
  AMBITION = "Ambition",
  BRAVERY = "Bravery",
  CHIVALARY = "Chivalary",
  COURAGE = "Courage",
  CREATIVITY = "Creativity",
  CUNNING = "Cunning",
  DARING = "Daring",
  DETERMINATION = "Determination",
  FAIRNESS = "Fairness",
  HARDWORKING = "Hardworking",
  INTELLIGENCE = "Inteligence",
  JUST = "Just",
  LEARNING = "Learning",
  LOYALTY = "Loyalty",
  MODESTY = "Modesty",
  NERVE = "Nerve",
  PATIENCE = "Patience",
  PRIDE = "Pride",
  RESOURCEFULNESS = "Resourcefulness",
  SELFPRESERVATION = "Selfpreservation",
  WISDOM = "Wisdom",
  WIT = "Wit",
}

export class QuizAnswers {
  @ApiProperty({ type: Array, enum: PreferredColor, minItems: 1, maxItems: 3, description: 'Szín', example: ['Gold', 'Green', 'Yellow'] })
  @IsArray({ message: 'A színeket tömbként adja át!' })
  @ArrayMinSize(1, { message: 'Legalább egy szín megadása kötelező!' })
  @ArrayMaxSize(3, { message: 'Legfeljebb 3 szín adható!' })
  @IsEnum(PreferredColor, { each: true, message: `A választható színek: "${Object.values(PreferredColor).join('", "')}"` })
  color: PreferredColor[];

  @ApiProperty({ enum: PreferredAnimal, description: 'Állat', example: 'Badger' })
  @IsEnum(PreferredAnimal, { message: `A választható állat: "${Object.values(PreferredAnimal).join('", "')}"` })
  animal: PreferredAnimal;

  @ApiProperty({ enum: HouseElements, description: 'Elem', example: 'Earth' })
  @IsEnum(HouseElements, { message: `A választható elem: "${Object.values(HouseElements).join('", "')}"` })
  element: HouseElements;

  @ApiProperty({ type: Array, enum: Traits, description: 'Jellem', minItems: 1, example: ['Bravery', 'Wisdom'] })
  @IsArray({ message: 'A jellemeket tömbként adja át!' })
  @ArrayMinSize(1, { message: 'Legalább egy jellemet válasszon ki!' })
  @IsEnum(Traits, { each: true, message: `A jellemek ezek lehetnek: "${Object.values(Traits).join('", "')}"` })
  traits: Traits[];
}