import { common } from '@kit.AbilityKit';
import { MockData } from '../model/MockData';
import { UserProfile } from '../model/UserProfile';

export class UserRepository {
  async getUsers(context: common.UIAbilityContext): Promise<UserProfile[]> {
    return MockData.load(context);
  }

  async getUser(context: common.UIAbilityContext, userId: number): Promise<UserProfile | undefined> {
    const users = await this.getUsers(context);
    return users.find((item: UserProfile) => item.id === userId);
  }
}
