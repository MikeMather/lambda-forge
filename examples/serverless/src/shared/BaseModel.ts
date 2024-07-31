import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { IsString, validateSync } from "class-validator";
import { ValidationError } from 'lambda-forge';

export default class BaseModel {
  @IsString()
  PK: string;

  @IsString()
  SK: string;

  @IsString()
  id: string;

  @IsString()
  createdAt: string;

  validate() {
    const errors = validateSync(this);
    if (errors.length) {
      const constraints = errors
        .map((error: any) => {
          return Object.values(error.constraints)
        })
        .flat() as string[];
      throw new ValidationError("Validation error", constraints);
    }
  }

  toObject() {
    return instanceToPlain(this);
  }

  public static fromObject<T>(obj: any): T {
    return plainToInstance(this, obj) as T;
  }

}