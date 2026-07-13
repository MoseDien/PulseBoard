import { common } from '@kit.AbilityKit';
import { HomeUiState } from '../model/UiState';
import { LoadUsersUseCase } from '../usecase/LoadUsersUseCase';

export class HomeViewModel {
  private loadUsers: LoadUsersUseCase;

  constructor(loadUsers: LoadUsersUseCase) {
    this.loadUsers = loadUsers;
  }

  async load(context: common.UIAbilityContext): Promise<HomeUiState> {
    try {
      const users = await this.loadUsers.execute(context);
      return {
        users: users,
        isLoading: false,
        errorMessage: ''
      };
    } catch (error) {
      return {
        users: [],
        isLoading: false,
        errorMessage: '无法加载用户数据'
      };
    }
  }
}
