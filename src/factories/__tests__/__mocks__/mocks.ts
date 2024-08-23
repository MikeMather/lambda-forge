import { IsString } from 'class-validator'
import { HttpResponse } from '../../../utils/httpResponse'
import { Inject, Lambda, Service } from '../../../decorators'

export class MockDto {
  @IsString()
  name: string
}

@Service
export class MockService {
  hasRun = false

  async create() {
    return 'created'
  }

  async onExecutionStart() {
    this.hasRun = true
    console.debug('Service has started')
    return 'before'
  }
}

@Lambda
export class MockLambda {
  constructor(@Inject(MockService) private service: MockService) {}

  async main() {
    return HttpResponse.ok()
  }
}
