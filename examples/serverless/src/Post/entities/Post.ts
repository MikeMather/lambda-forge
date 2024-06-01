import { Attribute, Entity, INDEX_TYPE } from "@typedorm/common";
import BaseModel from "../../shared/BaseModel";
import { IsString } from "class-validator";

@Entity({
  name: "Post",
    primaryKey: {
        partitionKey: "POST#{{id}}",
        sortKey: "POST#{{createdAt}}"
    },
    indexes: {
      GSI1: {
        partitionKey: "USER#{{username}}",
        sortKey: "POST#{{id}}",
        type: INDEX_TYPE.GSI
      }
    }
})
export default class Post extends BaseModel {
  @IsString()
  @Attribute()
  title: string;

  @IsString()
  @Attribute()
  content: string;

  @IsString()
  @Attribute()
  userHandle: string;
}