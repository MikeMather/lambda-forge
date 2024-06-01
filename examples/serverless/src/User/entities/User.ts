import { Attribute, Entity } from "@typedorm/common";
import { IsString } from "class-validator";
import { Exclude } from "class-transformer";
import BaseModel from "../../shared/BaseModel";

@Entity({
  name: "User",
  primaryKey: {
    partitionKey: "USER#{{username}}",
    sortKey: "USER#{{id}}"
  }
})
export default class User extends BaseModel {

  @IsString()
  @Attribute()
  username: string;

  @IsString()
  @Attribute()
  email: string;

  @IsString()
  @Attribute()
  @Exclude()
  password: string;
}