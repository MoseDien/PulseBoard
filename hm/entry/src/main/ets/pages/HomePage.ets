import { common } from '@kit.AbilityKit';
import { HomeUiState } from '../model/UiState';
import { DetailRouteParam, getUpdateLevel, UpdateLevel, UserProfile } from '../model/UserProfile';
import { UserRepository } from '../repository/UserRepository';
import { HomeViewModel } from '../viewmodel/HomeViewModel';
import { LoadUsersUseCase } from '../usecase/LoadUsersUseCase';

const PAGE_BG = $r('app.color.page_bg');
const INK = $r('app.color.ink');
const MUTED = $r('app.color.muted');
const CARD = $r('app.color.card');
const FRESH = $r('app.color.fresh');
const STALE = $r('app.color.stale');

@Component
export struct HomePage {
  @Consume('pageStack') private pageStack: NavPathStack;
  @Consume('homeStyle') private homeStyle: string;
  @State private uiState: HomeUiState = {
    users: [],
    isLoading: true,
    errorMessage: ''
  };
  private viewModel: HomeViewModel = new HomeViewModel(new LoadUsersUseCase(new UserRepository()));
  @State private pageOpacity: number = 0;
  @State private pageOffset: number = 18;
  @State private pressedId: number = -1;

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
          avatarImage: user.avatarImage,
          avatarColor: user.avatarColor,
          mood: user.mood,
          lastUpdated: user.lastUpdated
        });
      this.pageStack.pushPathByName('DetailPage', routeParam);
    }, 130);
  }

  @Builder
  Pulse(level: UpdateLevel) {
    Row({ space: 3 }) {
      Column().width($r('app.float.space_3')).height($r('app.float.space_8')).borderRadius($r('app.float.radius_3'))
        .backgroundColor(level >= UpdateLevel.Quarter ? FRESH : STALE)
      Column().width($r('app.float.space_3')).height($r('app.float.space_14')).borderRadius($r('app.float.radius_3'))
        .backgroundColor(level >= UpdateLevel.Month ? FRESH : STALE)
      Column().width($r('app.float.space_3')).height($r('app.float.space_10')).borderRadius($r('app.float.radius_3'))
        .backgroundColor(level >= UpdateLevel.Week ? FRESH : STALE)
    }
    .width($r('app.float.size_24'))
    .height($r('app.float.size_24'))
    .justifyContent(FlexAlign.Center)
    .backgroundColor(level > UpdateLevel.Stale ? $r('app.color.fresh_surface') : $r('app.color.stale_surface'))
    .borderRadius(8)
    .shadow(level > UpdateLevel.Stale ? { radius: 12, color: $r('app.color.status_shadow'), offsetX: 0, offsetY: 2 } : {
      radius: 0,
      color: $r('app.color.transparent'),
      offsetX: 0,
      offsetY: 0
    })
  }

  @Builder
  Avatar(user: UserProfile, size: number) {
    Stack() {
      if (user.avatarImage) {
        Image($rawfile(user.avatarImage))
          .width(size)
          .height(size)
          .objectFit(ImageFit.Cover)
          .borderRadius(size / 2)
      } else {
        Circle()
          .width(size)
          .height(size)
          .fill(user.avatarColor)
        Text(user.avatar)
          .fontSize(size * 0.34)
          .fontWeight(FontWeight.Bold)
          .fontColor(INK)
      }
    }
    .width(size)
    .height(size)
  }

  @Builder
  EmptyState() {
    Column({ space: 14 }) {
      Text('◌')
        .fontSize($r('app.float.font_48'))
        .fontColor(STALE)
      Text(this.uiState.isLoading ? $r('app.string.loading_updates') : $r('app.string.empty_users'))
        .fontSize($r('app.float.font_16'))
        .fontColor(MUTED)
    }
    .width('100%')
    .layoutWeight(1)
    .justifyContent(FlexAlign.Center)
  }

  private nodeColor(id: number) {
    switch (id % 8) {
      case 0:
        return $r('app.color.node_purple');
      case 1:
        return $r('app.color.node_blue');
      case 2:
        return $r('app.color.node_orange');
      case 3:
        return $r('app.color.node_pink');
      case 4:
        return $r('app.color.node_yellow');
      case 5:
        return $r('app.color.node_cyan');
      case 6:
        return $r('app.color.node_indigo');
      default:
        return $r('app.color.node_coral');
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
    const positions: string[] = ['2%', '34%', '66%', '18%', '54%', '4%', '38%', '70%'];
    return positions[index % positions.length];
  }

  private nodeY(index: number): number {
    const positions: number[] = [8, 26, 2, 178, 198, 350, 332, 370];
    return positions[index % positions.length];
  }

  private canvasHeight(): number {
    return Math.max(560, Math.ceil(this.uiState.users.length / 3) * 180 + 40);
  }

  @Builder
  NodeStatus(level: UpdateLevel) {
    Row({ space: 2 }) {
      Column()
        .width(2)
        .height(7)
        .borderRadius(1)
        .backgroundColor(level >= UpdateLevel.Quarter ? FRESH : STALE)
      Column()
        .width(2)
        .height(11)
        .borderRadius(1)
        .backgroundColor(level >= UpdateLevel.Month ? FRESH : STALE)
      Column()
        .width(2)
        .height(9)
        .borderRadius(1)
        .backgroundColor(level >= UpdateLevel.Week ? FRESH : STALE)
    }
    .height(16)
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  DynamicNode(user: UserProfile, index: number) {
    Column({ space: 8 }) {
      Stack() {
        if (user.avatarImage) {
          Image($rawfile(user.avatarImage))
            .width(this.avatarSize(user.id))
            .height(this.avatarSize(user.id))
            .objectFit(ImageFit.Cover)
            .borderRadius(this.avatarSize(user.id) / 2)
        } else {
          Circle()
            .width(this.avatarSize(user.id))
            .height(this.avatarSize(user.id))
            .fill(user.avatarColor)
          Text(user.avatar)
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor(INK)
        }
      }
      .width(this.avatarSize(user.id) + 10)
      .height(this.avatarSize(user.id) + 10)

      Row({ space: 6 }) {
        this.NodeStatus(getUpdateLevel(user.lastUpdated))
        Text(user.name)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor(INK)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      }
      .width(140)
      .height(28)
      .justifyContent(FlexAlign.Center)
      .onClick(() => {
        this.openDetail(user);
      })
    }
    .width(150)
    .height(150)
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Start)
    .position({ x: this.nodeX(index), y: this.nodeY(index) })
    .scale({ x: this.pressedId === user.id ? 0.96 : 1, y: this.pressedId === user.id ? 0.96 : 1 })
    .opacity(this.pageOpacity)
    .translate({ x: this.nodeOffsetX(user.id), y: this.pageOffset + this.nodeOffsetY(user.id) })
    .onClick(() => {
      this.openDetail(user);
    })
  }

  @Builder
  DynamicBoard() {
    if (this.uiState.users.length === 0) {
      this.EmptyState()
    } else {
      Scroll() {
        Stack() {
          ForEach(this.uiState.users, (user: UserProfile, index: number) => {
            this.DynamicNode(user, index)
          }, (user: UserProfile) => user.id.toString())
        }
        .width('100%')
        .height(this.canvasHeight())
      }
      .layoutWeight(1)
      .width('100%')
      .scrollBar(BarState.Off)
    }
  }

  build() {
    Column() {
      if (this.homeStyle === '动态') {
        this.DynamicBoard()
      } else {
      if (this.uiState.users.length === 0) {
        this.EmptyState()
      } else {
        List({ space: 10 }) {
          ForEach(this.uiState.users, (user: UserProfile, index: number) => {
            ListItem() {
              Row({ space: 14 }) {
                this.Avatar(user, 58)

                Column({ space: 5 }) {
                  Row({ space: 8 }) {
                    Text(user.name)
                      .fontSize($r('app.float.font_19'))
                      .fontWeight(FontWeight.Bold)
                      .fontColor(INK)
                    Text(user.handle)
                      .fontSize($r('app.float.font_11'))
                      .fontColor(MUTED)
                  }
                  .width('100%')

                  Text(user.mood)
                    .fontSize($r('app.float.font_14'))
                    .fontColor(INK)

                  Text(this.updateLabel(user.lastUpdated))
                    .fontSize($r('app.float.font_11'))
                    .fontColor(getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? $r('app.color.fresh_text') : MUTED)
                }
                .alignItems(HorizontalAlign.Start)
                .layoutWeight(1)

                Column({ space: 7 }) {
                  this.Pulse(getUpdateLevel(user.lastUpdated))
                  Text('›')
                  .fontSize($r('app.float.font_22'))
                    .fontColor(STALE)
                }
              }
              .width('100%')
              .padding($r('app.float.card_padding'))
              .backgroundColor(CARD)
              .borderRadius(22)
              .border({
                width: 1,
                color: getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? $r('app.color.fresh_border') : $r('app.color.stale_border')
              })
              .shadow({
                radius: this.pressedId === user.id ? 4 : 12,
                color: $r('app.color.shadow'),
                offsetX: 0,
                offsetY: this.pressedId === user.id ? 2 : 6
              })
              .scale({
                x: this.pressedId === user.id ? 0.98 : 1,
                y: this.pressedId === user.id ? 0.98 : 1
              })
              .opacity(this.pageOpacity)
              .translate({ y: this.pageOffset + index * 3 })
              .onClick(() => {
                this.openDetail(user);
              })
            }
          }, (user: UserProfile) => user.id.toString())
        }
        .layoutWeight(1)
        .width('100%')
        .padding({
          left: $r('app.float.list_horizontal_padding'),
          right: $r('app.float.list_horizontal_padding'),
          top: $r('app.float.list_top_padding'),
          bottom: $r('app.float.list_bottom_padding')
        })
        .scrollBar(BarState.Off)
      }
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(PAGE_BG)
    .transition(
      TransitionEffect
        .OPACITY
        .combine(TransitionEffect.translate({ x: '-18%' }))
    )
  }
}
