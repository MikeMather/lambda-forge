export interface RestLambdaHandler {
    main(...args: any[]): Promise<any>;
}
