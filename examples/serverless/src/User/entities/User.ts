import "reflect-metadata";
import { IsString } from "class-validator";
import { Exclude } from "class-transformer";
import BaseModel from "../../shared/BaseModel";

export default class User extends BaseModel {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  @Exclude()
  password: string;
}