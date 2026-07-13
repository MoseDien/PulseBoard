import type common from "@ohos:app.ability.common";
import type { UserProfile } from '../model/UserProfile';
import type { UserRepository } from '../repository/UserRepository';
export class LoadUserDetailUseCase {
    private repository: UserRepository;
    constructor(repository: UserRepository) {
        this.repository = repository;
    }
    async execute(context: common.UIAbilityContext, userId: number): Promise<UserProfile | undefined> {
        return this.repository.getUser(context, userId);
    }
}
