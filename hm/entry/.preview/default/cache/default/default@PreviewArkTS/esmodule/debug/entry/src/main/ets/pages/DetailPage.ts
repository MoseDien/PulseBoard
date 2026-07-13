if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DetailPage_Params {
    pageStack?: NavPathStack;
    userId?: number;
    uiState?: DetailUiState;
    viewModel?: DetailViewModel;
    contentOpacity?: number;
    contentOffset?: number;
    heroScale?: number;
}
import type common from "@ohos:app.ability.common";
import type { DetailUiState } from '../model/UiState';
import { getUpdateLevel, UpdateLevel } from "@normalized:N&&&entry/src/main/ets/model/UserProfile&";
import type { BookItem, MediaItem, PlaceItem, UserProfile } from "@normalized:N&&&entry/src/main/ets/model/UserProfile&";
import { DetailViewModel } from "@normalized:N&&&entry/src/main/ets/viewmodel/DetailViewModel&";
import { UserRepository } from "@normalized:N&&&entry/src/main/ets/repository/UserRepository&";
import { LoadUserDetailUseCase } from "@normalized:N&&&entry/src/main/ets/usecase/LoadUserDetailUseCase&";
const PAGE_BG = { "id": 16777290, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const INK = { "id": 16777278, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const MUTED = { "id": 16777281, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const CARD = { "id": 16777272, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const FRESH = { "id": 16777274, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
const STALE = { "id": 16777294, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" };
export class DetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = new SynchedPropertyObjectOneWayPU(params.pageStack, this, "pageStack");
        this.__userId = new SynchedPropertySimpleOneWayPU(params.userId, this, "userId");
        this.__uiState = new ObservedPropertyObjectPU({
            user: undefined,
            isLoading: true,
            errorMessage: ''
        }, this, "uiState");
        this.viewModel = new DetailViewModel(new LoadUserDetailUseCase(new UserRepository()));
        this.__contentOpacity = new ObservedPropertySimplePU(0, this, "contentOpacity");
        this.__contentOffset = new ObservedPropertySimplePU(20, this, "contentOffset");
        this.__heroScale = new ObservedPropertySimplePU(0.92, this, "heroScale");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DetailPage_Params) {
        if (params.uiState !== undefined) {
            this.uiState = params.uiState;
        }
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
        if (params.contentOpacity !== undefined) {
            this.contentOpacity = params.contentOpacity;
        }
        if (params.contentOffset !== undefined) {
            this.contentOffset = params.contentOffset;
        }
        if (params.heroScale !== undefined) {
            this.heroScale = params.heroScale;
        }
    }
    updateStateVars(params: DetailPage_Params) {
        this.__pageStack.reset(params.pageStack);
        this.__userId.reset(params.userId);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__userId.purgeDependencyOnElmtId(rmElmtId);
        this.__uiState.purgeDependencyOnElmtId(rmElmtId);
        this.__contentOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__contentOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__heroScale.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        this.__userId.aboutToBeDeleted();
        this.__uiState.aboutToBeDeleted();
        this.__contentOpacity.aboutToBeDeleted();
        this.__contentOffset.aboutToBeDeleted();
        this.__heroScale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageStack: SynchedPropertySimpleOneWayPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private __userId: SynchedPropertySimpleOneWayPU<number>;
    get userId() {
        return this.__userId.get();
    }
    set userId(newValue: number) {
        this.__userId.set(newValue);
    }
    private __uiState: ObservedPropertyObjectPU<DetailUiState>;
    get uiState() {
        return this.__uiState.get();
    }
    set uiState(newValue: DetailUiState) {
        this.__uiState.set(newValue);
    }
    private viewModel: DetailViewModel;
    private __contentOpacity: ObservedPropertySimplePU<number>;
    get contentOpacity() {
        return this.__contentOpacity.get();
    }
    set contentOpacity(newValue: number) {
        this.__contentOpacity.set(newValue);
    }
    private __contentOffset: ObservedPropertySimplePU<number>;
    get contentOffset() {
        return this.__contentOffset.get();
    }
    set contentOffset(newValue: number) {
        this.__contentOffset.set(newValue);
    }
    private __heroScale: ObservedPropertySimplePU<number>;
    get heroScale() {
        return this.__heroScale.get();
    }
    set heroScale(newValue: number) {
        this.__heroScale.set(newValue);
    }
    async aboutToAppear(): Promise<void> {
        const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.uiState = await this.viewModel.load(context, this.userId);
        this.playEnter();
    }
    private playEnter(): void {
        this.getUIContext().animateTo({
            duration: 460,
            curve: Curve.Friction
        }, () => {
            this.contentOpacity = 1;
            this.contentOffset = 0;
            this.heroScale = 1;
        });
    }
    private currentUser(): UserProfile | undefined {
        return this.uiState.user;
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
    Pulse(level: UpdateLevel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 3 });
            Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(66:5)", "entry");
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
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(67:7)", "entry");
            Column.width({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.height({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.backgroundColor(level >= UpdateLevel.Quarter ? FRESH : STALE);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(69:7)", "entry");
            Column.width({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.height({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.backgroundColor(level >= UpdateLevel.Month ? FRESH : STALE);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(71:7)", "entry");
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
            Stack.debugLine("entry/src/main/ets/pages/DetailPage.ets(89:5)", "entry");
            Stack.width(size);
            Stack.height(size);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.debugLine("entry/src/main/ets/pages/DetailPage.ets(90:7)", "entry");
            Circle.width(size);
            Circle.height(size);
            Circle.fill(user.avatarColor);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.avatar);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(94:7)", "entry");
            Text.fontSize(size * 0.34);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        Stack.pop();
    }
    BookCover(book: BookItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(105:5)", "entry");
            Column.width(104);
            Column.height(142);
            Column.padding(12);
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor(book.color);
            Column.borderRadius(7);
            Column.shadow({ radius: 8, color: { "id": 16777271, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }, offsetX: 0, offsetY: 4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(book.title);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(106:7)", "entry");
            Text.fontSize(13);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(book.accent);
            Text.maxLines(3);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/DetailPage.ets(114:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(book.author);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(116:7)", "entry");
            Text.fontSize(8);
            Text.fontColor(book.accent);
            Text.opacity(0.8);
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Column.pop();
    }
    SectionTitle(emoji: string, title: string, count: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(133:5)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(emoji);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(134:7)", "entry");
            Text.fontSize(15);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(135:7)", "entry");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/DetailPage.ets(139:7)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${count}`);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(140:7)", "entry");
            Text.fontSize(10);
            Text.fontColor(MUTED);
        }, Text);
        Text.pop();
        Row.pop();
    }
    MediaCard(title: string, emoji: string, items: MediaItem[], parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 9 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(149:5)", "entry");
            Column.padding(13);
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor(CARD);
            Column.borderRadius(18);
        }, Column);
        this.SectionTitle.bind(this)(emoji, title, items.length);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(152:9)", "entry");
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.emoji);
                    Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(153:11)", "entry");
                    Text.fontSize(18);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 2 });
                    Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(155:11)", "entry");
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(156:13)", "entry");
                    Text.fontSize(12);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(INK);
                    Text.maxLines(1);
                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.meta);
                    Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(163:13)", "entry");
                    Text.fontSize(9);
                    Text.fontColor(MUTED);
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, items.slice(0, 2), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    PlaceCard(items: PlaceItem[], parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 9 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(182:5)", "entry");
            Column.padding(13);
            Column.height('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor(CARD);
            Column.borderRadius(18);
        }, Column);
        this.SectionTitle.bind(this)('⌖', '去过', items.length);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(185:9)", "entry");
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.emoji);
                    Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(186:11)", "entry");
                    Text.fontSize(18);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 2 });
                    Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(187:11)", "entry");
                    Column.alignItems(HorizontalAlign.Start);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.city);
                    Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(188:13)", "entry");
                    Text.fontSize(12);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(INK);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.note);
                    Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(192:13)", "entry");
                    Text.fontSize(9);
                    Text.fontColor(MUTED);
                    Text.maxLines(1);
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, items.slice(0, 2), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    MissingState(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(211:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor(PAGE_BG);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('◌');
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(212:7)", "entry");
            Text.fontSize({ "id": 16777235, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(STALE);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(!this.uiState.isLoading ? { "id": 16777305, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777304, "type": 10003, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(215:7)", "entry");
            Text.fontSize({ "id": 16777228, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(MUTED);
        }, Text);
        Text.pop();
        Column.pop();
    }
    DetailContent(user: UserProfile, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(227:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.padding({ top: { "id": 16777221, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } });
            Column.backgroundColor(PAGE_BG);
            Column.transition(TransitionEffect
                .OPACITY
                .combine(TransitionEffect.translate({ x: '18%' })));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 5 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(228:7)", "entry");
            Column.width('100%');
            Column.padding({
                left: { "id": 16777220, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                right: { "id": 16777220, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                bottom: { "id": 16777221, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }
            });
            Column.alignItems(HorizontalAlign.Start);
            Column.opacity(this.contentOpacity);
            Column.translate({ y: this.contentOffset });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(229:9)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.mood);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(230:11)", "entry");
            Text.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/DetailPage.ets(234:11)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.updateLabel(user.lastUpdated));
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(235:11)", "entry");
            Text.fontSize({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? { "id": 16777277, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : MUTED);
            Text.padding({ left: 9, right: 9, top: 5, bottom: 5 });
            Text.backgroundColor(getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? { "id": 16777276, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" } : { "id": 16777299, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.borderRadius(10);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.bio);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(243:9)", "entry");
            Text.fontSize({ "id": 16777224, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor(MUTED);
            Text.maxLines(1);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 9 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(258:7)", "entry");
            Column.width('100%');
            Column.height(190);
            Column.padding({ left: 20, right: 0, top: 10 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.SectionTitle.bind(this)('▰', '最近读过', user.books.length);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.debugLine("entry/src/main/ets/pages/DetailPage.ets(260:9)", "entry");
            List.listDirection(Axis.Horizontal);
            List.width('100%');
            List.height(150);
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const book = _item;
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
                        ListItem.debugLine("entry/src/main/ets/pages/DetailPage.ets(262:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(263:15)", "entry");
                            Column.opacity(this.contentOpacity);
                            Column.translate({ y: this.contentOffset + index * 2 });
                        }, Column);
                        this.BookCover.bind(this)(book);
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, user.books, forEachItemGenFunction, (book: BookItem) => book.title, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(281:7)", "entry");
            Column.layoutWeight(1);
            Column.width('100%');
            Column.padding({
                left: { "id": 16777220, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                right: { "id": 16777220, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" },
                bottom: { "id": 16777220, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" }
            });
            Column.opacity(this.contentOpacity);
            Column.translate({ y: this.contentOffset });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(282:9)", "entry");
            Row.layoutWeight(1);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(283:11)", "entry");
            Column.layoutWeight(1);
            Column.height('100%');
        }, Column);
        this.MediaCard.bind(this)('看过', '◉', user.movies);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(289:11)", "entry");
            Column.layoutWeight(1);
            Column.height('100%');
        }, Column);
        this.PlaceCard.bind(this)(user.places);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("entry/src/main/ets/pages/DetailPage.ets(298:9)", "entry");
            Row.layoutWeight(1);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(299:11)", "entry");
            Column.layoutWeight(1);
            Column.height('100%');
        }, Column);
        this.MediaCard.bind(this)('听过', '◖', user.podcasts);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/pages/DetailPage.ets(305:11)", "entry");
            Column.layoutWeight(1);
            Column.height('100%');
            Column.padding(14);
            Column.alignItems(HorizontalAlign.Start);
            Column.backgroundColor({ "id": 16777280, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Column.borderRadius(18);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('这一阵的关键词');
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(306:13)", "entry");
            Text.fontSize({ "id": 16777222, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor({ "id": 16777279, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(user.mood);
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(309:13)", "entry");
            Text.fontSize({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(INK);
            Text.maxLines(2);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/DetailPage.ets(314:13)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('LIFE / NOW');
            Text.debugLine("entry/src/main/ets/pages/DetailPage.ets(315:13)", "entry");
            Text.fontSize({ "id": 16777236, "type": 10002, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.fontColor({ "id": 16777279, "type": 10001, params: [], "bundleName": "com.belldien.pulseboard", "moduleName": "entry" });
            Text.letterSpacing(1.5);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.uiState.user !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.DetailContent.bind(this)(this.uiState.user);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.MissingState.bind(this)();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
