import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(0x0000, 'PulseBoard', 'EntryAbility created');
    }
    onWindowStageCreate(windowStage: window.WindowStage): void {
        windowStage.loadContent('pages/AppNavigation', (err) => {
            if (err.code) {
                hilog.error(0x0000, 'PulseBoard', 'Failed to load content: %{public}s', JSON.stringify(err));
            }
        });
    }
}
