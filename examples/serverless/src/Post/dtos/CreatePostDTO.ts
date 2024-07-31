import { IsString } from "class-validator";

export default class CreatePostDTO {
    @IsString()
    title: string;

    @IsString()
    content: string;
}