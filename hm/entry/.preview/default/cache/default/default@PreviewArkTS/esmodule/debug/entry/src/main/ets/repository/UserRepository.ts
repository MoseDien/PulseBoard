import type common from "@ohos:app.ability.common";
import { MockData } from "@normalized:N&&&entry/src/main/ets/model/MockData&";
import type { UserProfile } from '../model/UserProfile';
export class UserRepository {
    async getUsers(context: common.UIAbilityContext): Promise<UserProfile[]> {
        return MockData.load(context);
    }
    async getUser(context: common.UIAbilityContext, userId: number): Promise<UserProfile | undefined> {
        const users = await this.getUsers(context);
        return users.find((item: UserProfile) => item.id === userId);
    }
}
