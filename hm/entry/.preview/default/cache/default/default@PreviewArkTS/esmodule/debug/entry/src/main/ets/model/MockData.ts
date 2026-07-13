import buffer from "@ohos:buffer";
import type common from "@ohos:app.ability.common";
import type { UserProfile } from './UserProfile';
export class MockData {
    static async load(context: common.UIAbilityContext): Promise<UserProfile[]> {
        try {
            const content = await context.resourceManager.getRawFileContent('users.json');
            const text = buffer.from(content).toString();
            return JSON.parse(text) as UserProfile[];
        }
        catch (error) {
            return [];
        }
    }
}
