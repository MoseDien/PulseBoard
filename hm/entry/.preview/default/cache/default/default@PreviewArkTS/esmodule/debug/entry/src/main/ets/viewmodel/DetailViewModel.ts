import type common from "@ohos:app.ability.common";
import type { DetailUiState } from '../model/UiState';
import type { LoadUserDetailUseCase } from '../usecase/LoadUserDetailUseCase';
export class DetailViewModel {
    private loadUserDetail: LoadUserDetailUseCase;
    constructor(loadUserDetail: LoadUserDetailUseCase) {
        this.loadUserDetail = loadUserDetail;
    }
    async load(context: common.UIAbilityContext, userId: number): Promise<DetailUiState> {
        try {
            const user = await this.loadUserDetail.execute(context, userId);
            return {
                user: user,
                isLoading: false,
                errorMessage: user === undefined ? '没有找到这位朋友' : ''
            };
        }
        catch (error) {
            return {
                user: undefined,
                isLoading: false,
                errorMessage: '无法加载用户数据'
            };
        }
    }
}
