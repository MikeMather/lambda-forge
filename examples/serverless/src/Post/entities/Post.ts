import "reflect-metadata";
import BaseModel from "../../shared/BaseModel";
import { IsString } from "class-validator";

export default class Post extends BaseModel {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  userHandle: string;
}