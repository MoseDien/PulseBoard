if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    pageStack?: NavPathStack;
    homeStyle?: string;
    uiState?: HomeUiState;
    viewModel?: HomeViewModel;
    pageOpacity?: number;
    pageOffset?: number;
    pressedId?: number;
}
import type common from "@ohos:app.ability.common";
import type { HomeUiState } from '../model/UiState';
import { DetailRouteParam, getUpdateLevel, UpdateLevel } from "@normalized:N&&&entry/src/main/ets/model/UserProfile&";
import type { UserProfile } from "@normalized:N&&&entry/src/main/ets/model/UserProfile&";
import { UserRepository } from "@normalized:N&&&entry/src/main/ets/repository/UserRepository&";
import { HomeViewModel } from "@normalized:N&&&entry/src/main/ets/viewmodel/HomeViewModel&";
import { LoadUsersUseCase } from "@normalized:N&&&entry/src/main/ets/usecase/LoadUsersUseCase&";
const PAGE_BG = { "id": 16777290, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const INK = { "id": 16777278, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const MUTED = { "id": 16777281, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const CARD = { "id": 16777272, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const FRESH = { "id": 16777274, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const STALE = { "id": 16777294, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
export class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = this.initializeConsume('pageStack', "pageStack");
        this.__homeStyle = this.initializeConsume('homeStyle', "homeStyle");
        this.__uiState = new ObservedPropertyObjectPU({
            users: [],
            isLoading: true,
            errorMessage: ''
        }, this, "uiState");
        this.viewModel = new HomeViewModel(new LoadUsersUseCase(new UserRepository()));
        this.__pageOpacity = new ObservedPropertySimplePU(0, this, "pageOpacity");
        this.__pageOffset = new ObservedPropertySimplePU(18, this, "pageOffset");
        this.__pressedId = new ObservedPropertySimplePU(-1, this, "pressedId");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.uiState !== undefined) {
            this.uiState = params.uiState;
        }
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.pageOpacity !== undefined) {
            this.pageOpacity = params.pageOpacity;
        }
        if (params.pageOffset !== undefined) {
            this.pageOffset = params.pageOffset;
        }
        if (params.pressedId !== undefined) {
            this.pressedId = params.pressedId;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__homeStyle.purgeDependencyOnElmtId(rmElmtId);
        this.__uiState.purgeDependencyOnElmtId(rmElmtId);
        this.__pageOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__pageOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__pressedId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        this.__homeStyle.aboutToBeDeleted();
        this.__uiState.aboutToBeDeleted();
        this.__pageOpacity.aboutToBeDeleted();
        this.__pageOffset.aboutToBeDeleted();
        this.__pressedId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageStack: ObservedPropertyAbstractPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private __homeStyle: ObservedPropertyAbstractPU<string>;
    get homeStyle() {
        return this.__homeStyle.get();
    }
    set homeStyle(newValue: string) {
        this.__homeStyle.set(newValue);
    }
    private __uiState: ObservedPropertyObjectPU<HomeUiState>;
    get uiState() {
        return this.__uiState.get();
    }
    set uiState(newValue: HomeUiState) {
        this.__uiState.set(newValue);
    }
    private viewModel: HomeViewModel;
    private __pageOpacity: ObservedPropertySimplePU<number>;
    get pageOpacity() {
        return this.__pageOpacity.get();
    }
    set pageOpacity(newValue: number) {
        this.__pageOpacity.set(newValue);
    }
    private __pageOffset: ObservedPropertySimplePU<number>;
    get pageOffset() {
        return this.__pageOffset.get();
    }
    set pageOffset(newValue: number) {
        this.__pageOffset.set(newValue);
    }
    private __pressedId: ObservedPropertySimplePU<number>;
    get pressedId() {
        return this.__pressedId.get();
    }
    set pressedId(newValue: number) {
        this.__pressedId.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.uiState = await this.viewModel.load(context);
        this.playEnter();
    }
    private playEnter(): void {
        this.getUIContext().animateTo({
            duration: 420,
            curve: Curve.Friction
        }, () => {
            this.pageOpacity = 1;
            this.pageOffset = 0;
        });
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
    private openDetail(user: UserProfile): void {
        this.getUIContext().animateTo({
            duration: 120,
            curve: Curve.EaseOut
        }, () => {
            this.pressedId = user.id;
        });
        setTimeout(() => {
            this.pressedId = -1;
            const routeParam: DetailRouteParam = new DetailRouteParam(user.id, {
                name: user.name,
                handle: user.handle,
                avatar: user.avatar,
                avatarColor: user.avatarColor,
                mood: user.mood,
                lastUpdated: user.lastUpdated
            });
            this.pageStack.pushPathByName('DetailPage', routeParam);
        }, 130);
    }
    Pulse(level: UpdateLevel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 3 });
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(83:5)", "entry");
            Row.width({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.height({ "id": 16777254, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.justifyContent(FlexAlign.Center);
            Row.backgroundColor(level > UpdateLevel.Stale ? { "id": 16777276, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777296, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Row.borderRadius(8);
            Row.shadow(level > UpdateLevel.Stale ? { radius: 12, color: { "id": 16777298, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, offsetX: 0, offsetY: 2 } : {
                radius: 0,
                color: { "id": 16777300, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                offsetX: 0,
                offsetY: 0
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(84:7)", "entry");
            Column.width({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.backgroundColor(level >= UpdateLevel.Quarter ? FRESH : STALE);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(86:7)", "entry");
            Column.width({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.height({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.backgroundColor(level >= UpdateLevel.Month ? FRESH : STALE);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(88:7)", "entry");
            Column.width({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.height({ "id": 16777258, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.backgroundColor(level >= UpdateLevel.Week ? FRESH : STALE);
        }, Column);
        Column.pop();
        Row.pop();
    }
    Avatar(user: UserProfile, size: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/HomePage.ets(106:5)", "entry");
            Stack.width(size);
            Stack.height(size);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.debugLine("entry/src/main/ets/pages/HomePage.ets(107:7)", "entry");
            Circle.width(size);
            Circle.height(size);
            Circle.fill(user.avatarColor);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.avatar);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(111:7)", "entry");
            Text.fontSize(size * 0.34);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        Stack.pop();
    }
    EmptyState(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 14 });
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(122:5)", "entry");
            Column.width('100%');
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('◌');
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(123:7)", "entry");
            Text.fontSize({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(STALE);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.uiState.isLoading ? { "id": 16777312, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777307, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(126:7)", "entry");
            Text.fontSize({ "id": 16777228, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(MUTED);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private nodeColor(id: number) {
        switch (id % 8) {
            case 0:
                return { "id": 16777288, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            case 1:
                return { "id": 16777282, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            case 2:
                return { "id": 16777286, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            case 3:
                return { "id": 16777287, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            case 4:
                return { "id": 16777289, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            case 5:
                return { "id": 16777284, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            case 6:
                return { "id": 16777285, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
            default:
                return { "id": 16777283, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
        }
    }
    private nodeOffsetX(id: number): number {
        const offsets: number[] = [-12, 8, -6, 14, 4, -10, 10, -4];
        return offsets[id % offsets.length];
    }
    private nodeOffsetY(id: number): number {
        const offsets: number[] = [0, 10, -6, 8, -3, 7, -8, 4];
        return offsets[id % offsets.length];
    }
    private avatarSize(id: number): number {
        const sizes: number[] = [78, 86, 82, 90, 80, 88, 84, 76];
        return sizes[id % sizes.length];
    }
    private nodeX(index: number): string {
        const positions: string[] = ['3%', '48%', '22%', '66%', '8%', '54%', '30%', '70%'];
        return positions[index % positions.length];
    }
    private nodeY(index: number): number {
        const positions: number[] = [6, 12, 158, 168, 310, 300, 462, 474];
        return positions[index % positions.length];
    }
    private canvasHeight(): number {
        return Math.max(640, Math.ceil(this.uiState.users.length / 2) * 156 + 30);
    }
    NodeStatus(level: UpdateLevel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 2 });
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(187:5)", "entry");
            Row.height(16);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(188:7)", "entry");
            Column.width(2);
            Column.height(7);
            Column.borderRadius(1);
            Column.backgroundColor(level >= UpdateLevel.Quarter ? FRESH : STALE);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(193:7)", "entry");
            Column.width(2);
            Column.height(11);
            Column.borderRadius(1);
            Column.backgroundColor(level >= UpdateLevel.Month ? FRESH : STALE);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(198:7)", "entry");
            Column.width(2);
            Column.height(9);
            Column.borderRadius(1);
            Column.backgroundColor(level >= UpdateLevel.Week ? FRESH : STALE);
        }, Column);
        Column.pop();
        Row.pop();
    }
    DynamicNode(user: UserProfile, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(210:5)", "entry");
            Column.width(150);
            Column.height(150);
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Start);
            Column.position({ x: this.nodeX(index), y: this.nodeY(index) });
            Column.scale({ x: this.pressedId === user.id ? 0.96 : 1, y: this.pressedId === user.id ? 0.96 : 1 });
            Column.opacity(this.pageOpacity);
            Column.translate({ x: this.nodeOffsetX(user.id), y: this.pageOffset + this.nodeOffsetY(user.id) });
            Column.onClick(() => {
                this.openDetail(user);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/HomePage.ets(211:7)", "entry");
            Stack.width(this.avatarSize(user.id) + 10);
            Stack.height(this.avatarSize(user.id) + 10);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.debugLine("entry/src/main/ets/pages/HomePage.ets(212:9)", "entry");
            Circle.width(this.avatarSize(user.id));
            Circle.height(this.avatarSize(user.id));
            Circle.fill(user.avatarColor);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.avatar);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(216:9)", "entry");
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.debugLine("entry/src/main/ets/pages/HomePage.ets(224:7)", "entry");
            Row.width(140);
            Row.height(28);
            Row.justifyContent(FlexAlign.Center);
            Row.onClick(() => {
                this.openDetail(user);
            });
        }, Row);
        this.NodeStatus.bind(this)(getUpdateLevel(user.lastUpdated));
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.name);
            Text.debugLine("entry/src/main/ets/pages/HomePage.ets(226:9)", "entry");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    DynamicBoard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.uiState.users.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.EmptyState.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/pages/HomePage.ets(258:7)", "entry");
                        Scroll.layoutWeight(1);
                        Scroll.width('100%');
                        Scroll.scrollBar(BarState.Off);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.debugLine("entry/src/main/ets/pages/HomePage.ets(259:9)", "entry");
                        Stack.width('100%');
                        Stack.height(this.canvasHeight());
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const user = _item;
                            this.DynamicNode.bind(this)(user, index);
                        };
                        this.forEachUpdateFunction(elmtId, this.uiState.users, forEachItemGenFunction, (user: UserProfile) => user.id.toString(), true, false);
                    }, ForEach);
                    ForEach.pop();
                    Stack.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/HomePage.ets(274:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(PAGE_BG);
            Column.transition(TransitionEffect
                .OPACITY
                .combine(TransitionEffect.translate({ x: '-18%' })));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.homeStyle === '动态') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.DynamicBoard.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.uiState.users.length === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.EmptyState.bind(this)();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    List.create({ space: 10 });
                                    List.debugLine("entry/src/main/ets/pages/HomePage.ets(281:9)", "entry");
                                    List.layoutWeight(1);
                                    List.width('100%');
                                    List.padding({
                                        left: { "id": 16777239, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                                        right: { "id": 16777239, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                                        top: { "id": 16777240, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                                        bottom: { "id": 16777238, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }
                                    });
                                    List.scrollBar(BarState.Off);
                                }, List);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = (_item, index: number) => {
                                        const user = _item;
                                        {
                                            const itemCreation = (elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                ListItem.create(deepRenderFunction, true);
                                                if (!isInitialRender) {
                                                    ListItem.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            };
                                            const itemCreation2 = (elmtId, isInitialRender) => {
                                                ListItem.create(deepRenderFunction, true);
                                                ListItem.debugLine("entry/src/main/ets/pages/HomePage.ets(283:13)", "entry");
                                            };
                                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                                itemCreation(elmtId, isInitialRender);
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Row.create({ space: 14 });
                                                    Row.debugLine("entry/src/main/ets/pages/HomePage.ets(284:15)", "entry");
                                                    Row.width('100%');
                                                    Row.padding({ "id": 16777219, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                                                    Row.backgroundColor(CARD);
                                                    Row.borderRadius(22);
                                                    Row.border({
                                                        width: 1,
                                                        color: getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? { "id": 16777275, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777295, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }
                                                    });
                                                    Row.shadow({
                                                        radius: this.pressedId === user.id ? 4 : 12,
                                                        color: { "id": 16777293, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                                                        offsetX: 0,
                                                        offsetY: this.pressedId === user.id ? 2 : 6
                                                    });
                                                    Row.scale({
                                                        x: this.pressedId === user.id ? 0.98 : 1,
                                                        y: this.pressedId === user.id ? 0.98 : 1
                                                    });
                                                    Row.opacity(this.pageOpacity);
                                                    Row.translate({ y: this.pageOffset + index * 3 });
                                                    Row.onClick(() => {
                                                        this.openDetail(user);
                                                    });
                                                }, Row);
                                                this.Avatar.bind(this)(user, 58);
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Column.create({ space: 5 });
                                                    Column.debugLine("entry/src/main/ets/pages/HomePage.ets(287:17)", "entry");
                                                    Column.alignItems(HorizontalAlign.Start);
                                                    Column.layoutWeight(1);
                                                }, Column);
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Row.create({ space: 8 });
                                                    Row.debugLine("entry/src/main/ets/pages/HomePage.ets(288:19)", "entry");
                                                    Row.width('100%');
                                                }, Row);
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(user.name);
                                                    Text.debugLine("entry/src/main/ets/pages/HomePage.ets(289:21)", "entry");
                                                    Text.fontSize({ "id": 16777230, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                                                    Text.fontWeight(FontWeight.Bold);
                                                    Text.fontColor(INK);
                                                }, Text);
                                                Text.pop();
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(user.handle);
                                                    Text.debugLine("entry/src/main/ets/pages/HomePage.ets(293:21)", "entry");
                                                    Text.fontSize({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                                                    Text.fontColor(MUTED);
                                                }, Text);
                                                Text.pop();
                                                Row.pop();
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(user.mood);
                                                    Text.debugLine("entry/src/main/ets/pages/HomePage.ets(299:19)", "entry");
                                                    Text.fontSize({ "id": 16777226, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                                                    Text.fontColor(INK);
                                                }, Text);
                                                Text.pop();
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(this.updateLabel(user.lastUpdated));
                                                    Text.debugLine("entry/src/main/ets/pages/HomePage.ets(303:19)", "entry");
                                                    Text.fontSize({ "id": 16777223, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                                                    Text.fontColor(getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? { "id": 16777277, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : MUTED);
                                                }, Text);
                                                Text.pop();
                                                Column.pop();
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Column.create({ space: 7 });
                                                    Column.debugLine("entry/src/main/ets/pages/HomePage.ets(310:17)", "entry");
                                                }, Column);
                                                this.Pulse.bind(this)(getUpdateLevel(user.lastUpdated));
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create('›');
                                                    Text.debugLine("entry/src/main/ets/pages/HomePage.ets(312:19)", "entry");
                                                    Text.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
                                                    Text.fontColor(STALE);
                                                }, Text);
                                                Text.pop();
                                                Column.pop();
                                                Row.pop();
                                                ListItem.pop();
                                            };
                                            this.observeComponentCreation2(itemCreation2, ListItem);
                                            ListItem.pop();
                                        }
                                    };
                                    this.forEachUpdateFunction(elmtId, this.uiState.users, forEachItemGenFunction, (user: UserProfile) => user.id.toString(), true, false);
                                }, ForEach);
                                ForEach.pop();
                                List.pop();
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
