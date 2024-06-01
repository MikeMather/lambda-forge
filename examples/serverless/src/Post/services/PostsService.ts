import { Service, Inject, HttpResponse } from "lambda-forge";
import DatabaseService from "../../shared/services/databaseService";
import Post from "../entities/Post";

@Service
export default class PostsService {
    constructor(@Inject(DatabaseService) private databaseService: DatabaseService) {}

    async getPosts() {
        return await this.databaseService.objects.find(Post, {});
    }
}