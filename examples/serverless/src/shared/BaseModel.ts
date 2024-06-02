import "reflect-metadata";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { IsString } from "class-validator";

export default class BaseModel {
  @IsString()
  PK: string;

  @IsString()
  SK: string;

  @IsString()
  id: string;

  @IsString()
  createdAt: string;

  toObject() {
    return instanceToPlain(this);
  }

  public static fromObject<T>(obj: any): T {
    return plainToInstance(this, obj) as T;
  }

}