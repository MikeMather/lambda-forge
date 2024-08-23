import { HttpResponse } from '../../../utils/httpResponse';
export declare class MockDto {
    name: string;
}
export declare class MockService {
    hasRun: boolean;
    create(): Promise<string>;
    init(): Promise<void>;
}
export declare class MockLambda {
    private database?;
    constructor(database?: MockService | undefined);
    main(): Promise<HttpResponse>;
}
