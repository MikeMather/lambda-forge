import { IsString } from 'class-validator'
import { HttpResponse } from '../../../utils/httpResponse'
import { Inject, Lambda, Service } from '../../../decorators'
import { OnExecutionStart } from '../../../interfaces'

export class MockDto {
  @IsString()
  name: string
}

@Service
export class MockService implements OnExecutionStart {
  hasRun = false

  async create() {
    return 'created'
  }

  async onExecutionStart() {
    this.hasRun = true
    return Promise.resolve()
  }
}

@Lambda
export class MockLambda {
  constructor(@Inject(MockService) private service: MockService) {}

  async main() {
    throw new Error('Not implemented')
    return HttpResponse.ok()
  }
}
