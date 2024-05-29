import { GetDogHandler } from "../getDogHandler";
import { DogsService } from "../dogs.service";

jest.mock('../dogs.service');

describe('getDogHandler', () => {

    let getDogHandler: GetDogHandler;

    beforeEach(() => {
        jest.resetModules();
        getDogHandler = new GetDogHandler(new DogsService())
    })

    it('should return a dog', async () => {
        const resp = await getDogHandler.main('1');
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual(JSON.stringify({ id: 1, breed: 'Golden Retriever' }));
    });
});
