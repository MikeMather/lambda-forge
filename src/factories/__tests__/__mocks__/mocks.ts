import { IsString } from 'class-validator'
import { HttpResponse } from '../../../utils/httpResponse'
import { Service } from '../../../decorators'

export class MockDto {
  @IsString()
  name: string
}

export class MockLambda {
  async main() {
    return HttpResponse.ok()
  }
}

@Service
export class MockService {
  async create() {
    return 'created'
  }
}
