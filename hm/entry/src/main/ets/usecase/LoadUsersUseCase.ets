import { common } from '@kit.AbilityKit';
import { UserProfile } from '../model/UserProfile';
import { UserRepository } from '../repository/UserRepository';

export class LoadUsersUseCase {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(context: common.UIAbilityContext): Promise<UserProfile[]> {
    const users = await this.repository.getUsers(context);
    return users.sort((left: UserProfile, right: UserProfile) => {
      return new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime();
    });
  }
}
