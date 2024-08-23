import { HttpResponse } from '../../../utils/httpResponse';
import { OnExecutionStart } from '../../../interfaces';
export declare class MockDto {
    name: string;
}
export declare class MockService implements OnExecutionStart {
    hasRun: boolean;
    create(): Promise<string>;
    onExecutionStart(): Promise<void>;
}
export declare class MockLambda {
    private service;
    constructor(service: MockService);
    main(): Promise<HttpResponse>;
}
