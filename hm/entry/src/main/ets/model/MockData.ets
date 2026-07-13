import { buffer } from '@kit.ArkTS';
import { common } from '@kit.AbilityKit';
import { UserProfile } from './UserProfile';

export class MockData {
  static async load(context: common.UIAbilityContext): Promise<UserProfile[]> {
    try {
      const content = await context.resourceManager.getRawFileContent('users.json');
      const text = buffer.from(content).toString();
      return JSON.parse(text) as UserProfile[];
    } catch (error) {
      return [];
    }
  }
}
