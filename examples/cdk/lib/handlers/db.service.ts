import { OnExecutionStart, Service } from 'lambda-forge';

@Service({ singleton: true })
export class DbService {

  private cnt = 0;

  @OnExecutionStart()
  async init() {
    this.cnt += 1;
    console.log('DB initialized', this.cnt);
  }
}