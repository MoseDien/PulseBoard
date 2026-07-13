if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AppNavigation_Params {
    pageStack?: NavPathStack;
    homeStyle?: string;
    showSettings?: boolean;
    selectedServer?: string;
    motionEnabled?: boolean;
}
import { HomePage } from "@normalized:N&&&entry/src/main/ets/pages/HomePage&";
import { DetailPage } from "@normalized:N&&&entry/src/main/ets/pages/DetailPage&";
import { DetailRouteParam } from "@normalized:N&&&entry/src/main/ets/model/UserProfile&";
const INK = { "id": 16777278, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const MUTED = { "id": 16777281, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const CARD = { "id": 16777272, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
class AppNavigation extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageStack");
        this.addProvidedVar("pageStack", this.__pageStack, false);
        this.__homeStyle = new ObservedPropertySimplePU('动态', this, "homeStyle");
        this.addProvidedVar("homeStyle", this.__homeStyle, false);
        this.__showSettings = new ObservedPropertySimplePU(false, this, "showSettings");
        this.__selectedServer = new ObservedPropertySimplePU('本地 Mock', this, "selectedServer");
        this.__motionEnabled = new ObservedPropertySimplePU(true, this, "motionEnabled");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AppNavigation_Params) {
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
        if (params.homeStyle !== undefined) {
            this.homeStyle = params.homeStyle;
        }
        if (params.showSettings !== undefined) {
            this.showSettings = params.showSettings;
        }
        if (params.selectedServer !== undefined) {
            this.selectedServer = params.selectedServer;
        }
        if (params.motionEnabled !== undefined) {
            this.motionEnabled = params.motionEnabled;
        }
    }
    updateStateVars(params: AppNavigation_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__homeStyle.purgeDependencyOnElmtId(rmElmtId);
        this.__showSettings.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedServer.purgeDependencyOnElmtId(rmElmtId);
        this.__motionEnabled.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        this.__homeStyle.aboutToBeDeleted();
        this.__showSettings.aboutToBeDeleted();
        this.__selectedServer.aboutToBeDeleted();
        this.__motionEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private __homeStyle: ObservedPropertySimplePU<string>;
    get homeStyle() {
        return this.__homeStyle.get();
    }
    set homeStyle(newValue: string) {
        this.__homeStyle.set(newValue);
    }
    private __showSettings: ObservedPropertySimplePU<boolean>;
    get showSettings() {
        return this.__showSettings.get();
    }
    set showSettings(newValue: boolean) {
        this.__showSettings.set(newValue);
    }
    private __selectedServer: ObservedPropertySimplePU<string>;
    get selectedServer() {
        return this.__selectedServer.get();
    }
    set selectedServer(newValue: string) {
        this.__selectedServer.set(newValue);
    }
    private __motionEnabled: ObservedPropertySimplePU<boolean>;
    get motionEnabled() {
        return this.__motionEnabled.get();
    }
    set motionEnabled(newValue: boolean) {
        this.__motionEnabled.set(newValue);
    }
    pageMap(name: string, param: Object, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === 'DetailPage' && param instanceof DetailRouteParam) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new DetailPage(this, {
                                            pageStack: this.pageStack,
                                            userId: param.id
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AppNavigation.ets", line: 22, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                pageStack: this.pageStack,
                                                userId: param.id
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            pageStack: this.pageStack,
                                            userId: param.id
                                        });
                                    }
                                }, { name: "DetailPage" });
                            }
                        }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AppNavigation" });
                        NavDestination.title(param.header.name);
                        NavDestination.debugLine("entry/src/main/ets/pages/AppNavigation.ets(21:7)", "entry");
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    homeTitle(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AppNavigation.ets(33:5)", "entry");
            Row.height({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.padding({ left: 12 });
            Row.alignItems(VerticalAlign.Center);
            Row.translate({ y: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777311, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(34:5)", "entry");
            Text.fontSize({ "id": 16777231, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        Row.pop();
    }
    navigationMenu(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AppNavigation.ets(47:5)", "entry");
            Row.width({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.height({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.translate({ y: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚙');
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(48:7)", "entry");
            Text.fontSize({ "id": 16777231, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(INK);
            Text.onClick(() => {
                this.showSettings = true;
            });
        }, Text);
        Text.pop();
        Row.pop();
    }
    private updateLabel(dateText: string): string {
        const days = Math.max(0, Math.floor((Date.now() - new Date(dateText).getTime()) / 86400000));
        if (days === 0) {
            return '今天更新';
        }
        if (days === 1) {
            return '昨天更新';
        }
        if (days <= 30) {
            return `${days} 天前更新`;
        }
        return dateText.replace(/-/g, '.');
    }
    SettingsChoice(label: ResourceStr, selected: boolean, onSelect: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AppNavigation.ets(78:5)", "entry");
            Row.width('100%');
            Row.height({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.padding({ left: 12, right: 12 });
            Row.backgroundColor(selected ? { "id": 16777276, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777292, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.onClick(onSelect);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(79:7)", "entry");
            Text.fontSize({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(selected ? INK : MUTED);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/AppNavigation.ets(82:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (selected) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('✓');
                        Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(84:9)", "entry");
                        Text.fontSize({ "id": 16777228, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777277, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    SettingsPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/AppNavigation.ets(99:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777273, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/AppNavigation.ets(100:7)", "entry");
            Blank.layoutWeight(1);
            Blank.onClick(() => {
                this.showSettings = false;
            });
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.debugLine("entry/src/main/ets/pages/AppNavigation.ets(105:7)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.backgroundColor(CARD);
            Column.borderRadius({ topLeft: 26, topRight: 26 });
            Column.shadow({ radius: { "id": 16777263, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, color: { "id": 16777291, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, offsetX: 0, offsetY: -4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AppNavigation.ets(106:9)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777319, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(107:9)", "entry");
            Text.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/AppNavigation.ets(111:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('×');
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(112:11)", "entry");
            Text.fontSize({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(MUTED);
            Text.onClick(() => {
                this.showSettings = false;
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/pages/AppNavigation.ets(121:9)", "entry");
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('服务器');
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(122:11)", "entry");
            Text.fontSize({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(MUTED);
        }, Text);
        Text.pop();
        this.SettingsChoice.bind(this)({ "id": 16777316, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, this.selectedServer === '本地 Mock', () => {
            this.selectedServer = '本地 Mock';
        });
        this.SettingsChoice.bind(this)({ "id": 16777318, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, this.selectedServer === '东京节点', () => {
            this.selectedServer = '东京节点';
        });
        this.SettingsChoice.bind(this)({ "id": 16777317, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, this.selectedServer === '新加坡节点', () => {
            this.selectedServer = '新加坡节点';
        });
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/pages/AppNavigation.ets(138:9)", "entry");
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777309, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(139:11)", "entry");
            Text.fontSize({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(MUTED);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/pages/AppNavigation.ets(142:11)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Button, isOn: this.homeStyle === '列表' });
            Toggle.debugLine("entry/src/main/ets/pages/AppNavigation.ets(143:13)", "entry");
            Toggle.width(68);
            Toggle.height(42);
            Toggle.onChange((isOn: boolean) => {
                if (isOn) {
                    this.homeStyle = '列表';
                }
            });
        }, Toggle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▤');
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(144:15)", "entry");
            Text.fontSize({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Toggle.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Button, isOn: this.homeStyle === '动态' });
            Toggle.debugLine("entry/src/main/ets/pages/AppNavigation.ets(154:13)", "entry");
            Toggle.width(68);
            Toggle.height(42);
            Toggle.onChange((isOn: boolean) => {
                if (isOn) {
                    this.homeStyle = '动态';
                }
            });
        }, Toggle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✦');
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(155:15)", "entry");
            Text.fontSize({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Toggle.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/AppNavigation.ets(171:9)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777314, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(172:11)", "entry");
            Text.fontSize({ "id": 16777225, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/AppNavigation.ets(175:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.motionEnabled ? { "id": 16777308, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777306, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/AppNavigation.ets(176:11)", "entry");
            Text.fontSize({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(this.motionEnabled ? { "id": 16777277, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : MUTED);
            Text.onClick(() => {
                this.motionEnabled = !this.motionEnabled;
            });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    settingsOverlay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showSettings) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.SettingsPanel.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AppNavigation", isUserCreateStack: true });
            Navigation.debugLine("entry/src/main/ets/pages/AppNavigation.ets(204:5)", "entry");
            Navigation.title({ builder: this.homeTitle.bind(this) });
            Navigation.titleMode(NavigationTitleMode.Mini);
            Navigation.hideBackButton(this.pageStack.size() === 0);
            Navigation.menus({ builder: this.navigationMenu.bind(this) });
            Navigation.overlay({ builder: this.settingsOverlay.bind(this) });
            Navigation.navDestination({ builder: this.pageMap.bind(this) });
        }, Navigation);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new HomePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AppNavigation.ets", line: 205, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "HomePage" });
        }
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AppNavigation";
    }
}
registerNamedRoute(() => new AppNavigation(undefined, {}), "", { bundleName: "com.belldien.pulseboard", moduleName: "entry", pagePath: "pages/AppNavigation", pageFullPath: "entry/src/main/ets/pages/AppNavigation", integratedHsp: "false", moduleType: "followWithHap" });
