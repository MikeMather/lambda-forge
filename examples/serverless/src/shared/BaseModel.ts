import { AUTO_GENERATE_ATTRIBUTE_STRATEGY, Attribute, AutoGenerateAttribute } from "@typedorm/common";
import { instanceToPlain, plainToInstance } from "class-transformer";


export default class BaseModel {
  PK: string;
  SK: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.KSUID
  })
  id: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE
  })
  createdAt: string;

  toObject() {
    return instanceToPlain(this);
  }

  public static fromObject<T>(obj: any): T {
    return plainToInstance(this, obj) as T;
  }

}