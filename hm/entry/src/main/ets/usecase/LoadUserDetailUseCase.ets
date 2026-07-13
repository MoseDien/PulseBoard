import { common } from '@kit.AbilityKit';
import { UserProfile } from '../model/UserProfile';
import { UserRepository } from '../repository/UserRepository';

export class LoadUserDetailUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(context: common.UIAbilityContext, userId: number): Promise<UserProfile | undefined> {
    return this.repository.getUser(context, userId);
  }
}
