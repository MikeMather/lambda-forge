import { IsString, IsInt } from 'class-validator';

export class CreateDogDTO {
  @IsString()
  breed: string;
}

export class Dog {
  @IsInt()
  id: number;

  @IsString()
  breed: string;
}