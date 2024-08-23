import { IsString } from 'class-validator'
import { HttpResponse } from '../../../utils/httpResponse'
import { Inject, Lambda, OnExecutionStart, Service } from '../../../decorators'

export class MockDto {
  @IsString()
  name: string
}

@Service()
export class MockService {
  hasRun = false

  async create() {
    return 'created'
  }

  @OnExecutionStart()
  async init() {
    this.hasRun = true
    // throw new Error("test")
    return Promise.resolve()
  }
}

@Lambda()
export class MockLambda {
  constructor(@Inject(MockService) private database?: MockService) {}

  async main() {
    return HttpResponse.ok()
  }
}

@Lambda()
export class MockSimplifiedLambda {
  constructor(@Inject(MockService) private database?: MockService) {}

  async main() {
    return []
  }
}
