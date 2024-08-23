export interface LambdaHandler {
  main(...args: any[]): Promise<any>
}
