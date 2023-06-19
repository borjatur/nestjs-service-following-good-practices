import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { UserRepository } from 'src/controllers/db/user.repository';

@Injectable()
export class GracefulShutdownService implements OnApplicationShutdown {
  @Inject(UserRepository) private userRepository: UserRepository;

  async onApplicationShutdown(signal?: string) {
    console.log(`Calling ${signal} onApplicationShutdown`);
    await this.userRepository.shutdown();
    process.exit(0);
  }
}