import { HttpResponse } from '../../../utils/httpResponse';
export declare class MockDto {
    name: string;
}
export declare class MockLambda {
    main(): Promise<HttpResponse>;
}
export declare class MockService {
    hasRun: boolean;
    create(): Promise<string>;
    beforeExecution(): Promise<string>;
}
