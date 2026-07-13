import { common } from '@kit.AbilityKit';
import { DetailUiState } from '../model/UiState';
import { BookItem, getUpdateLevel, MediaItem, PlaceItem, UpdateLevel, UserProfile } from '../model/UserProfile';
import { DetailViewModel } from '../viewmodel/DetailViewModel';
import { UserRepository } from '../repository/UserRepository';
import { LoadUserDetailUseCase } from '../usecase/LoadUserDetailUseCase';

const PAGE_BG = $r('app.color.page_bg');
const INK = $r('app.color.ink');
const MUTED = $r('app.color.muted');
const CARD = $r('app.color.card');
const FRESH = $r('app.color.fresh');
const STALE = $r('app.color.stale');

@Component
export struct DetailPage {
  @Prop pageStack: NavPathStack;
  @Prop userId: number;
  @State private uiState: DetailUiState = {
    user: undefined,
    isLoading: true,
    errorMessage: ''
  };
  private viewModel: DetailViewModel = new DetailViewModel(new LoadUserDetailUseCase(new UserRepository()));
  @State private contentOpacity: number = 0;
  @State private contentOffset: number = 20;
  @State private heroScale: number = 0.92;

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
  BookCover(book: BookItem) {
    Column() {
      Text(book.title)
        .fontSize(13)
        .fontWeight(FontWeight.Bold)
        .fontColor(book.accent)
        .maxLines(3)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .width('100%')

      Blank()

      Text(book.author)
        .fontSize(8)
        .fontColor(book.accent)
        .opacity(0.8)
        .maxLines(1)
    }
    .width(104)
    .height(142)
    .padding(12)
    .alignItems(HorizontalAlign.Start)
    .backgroundColor(book.color)
    .borderRadius(7)
    .shadow({ radius: 8, color: $r('app.color.book_shadow'), offsetX: 0, offsetY: 4 })
  }

  @Builder
  SectionTitle(emoji: string, title: string, count: number) {
    Row({ space: 6 }) {
      Text(emoji).fontSize(15)
      Text(title)
        .fontSize(14)
        .fontWeight(FontWeight.Bold)
        .fontColor(INK)
      Blank()
      Text(`${count}`)
        .fontSize(10)
        .fontColor(MUTED)
    }
    .width('100%')
  }

  @Builder
  MediaCard(title: string, emoji: string, items: MediaItem[]) {
    Column({ space: 9 }) {
      this.SectionTitle(emoji, title, items.length)
      ForEach(items.slice(0, 2), (item: MediaItem) => {
        Row({ space: 8 }) {
          Text(item.emoji)
            .fontSize(18)
          Column({ space: 2 }) {
            Text(item.title)
              .fontSize(12)
              .fontWeight(FontWeight.Medium)
              .fontColor(INK)
              .maxLines(1)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
              .width('100%')
            Text(item.meta)
              .fontSize(9)
              .fontColor(MUTED)
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
        }
        .width('100%')
      })
    }
    .padding(13)
    .height('100%')
    .alignItems(HorizontalAlign.Start)
    .backgroundColor(CARD)
    .borderRadius(18)
  }

  @Builder
  PlaceCard(items: PlaceItem[]) {
    Column({ space: 9 }) {
      this.SectionTitle('⌖', '去过', items.length)
      ForEach(items.slice(0, 2), (item: PlaceItem) => {
        Row({ space: 8 }) {
          Text(item.emoji).fontSize(18)
          Column({ space: 2 }) {
            Text(item.city)
              .fontSize(12)
              .fontWeight(FontWeight.Medium)
              .fontColor(INK)
            Text(item.note)
              .fontSize(9)
              .fontColor(MUTED)
              .maxLines(1)
          }
          .alignItems(HorizontalAlign.Start)
        }
        .width('100%')
      })
    }
    .padding(13)
    .height('100%')
    .alignItems(HorizontalAlign.Start)
    .backgroundColor(CARD)
    .borderRadius(18)
  }

  @Builder
  MissingState() {
    Column({ space: 16 }) {
      Text('◌')
        .fontSize($r('app.float.font_54'))
        .fontColor(STALE)
      Text(!this.uiState.isLoading ? $r('app.string.detail_missing') : $r('app.string.detail_loading'))
        .fontSize($r('app.float.font_16'))
        .fontColor(MUTED)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor(PAGE_BG)
  }

  @Builder
  DetailContent(user: UserProfile) {
    Column() {
      Column({ space: 5 }) {
        Row() {
          Text(user.mood)
            .fontSize($r('app.float.font_22'))
            .fontWeight(FontWeight.Bold)
            .fontColor(INK)
          Blank()
          Text(this.updateLabel(user.lastUpdated))
            .fontSize($r('app.float.font_10'))
            .fontColor(getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? $r('app.color.fresh_text') : MUTED)
            .padding({ left: 9, right: 9, top: 5, bottom: 5 })
            .backgroundColor(getUpdateLevel(user.lastUpdated) > UpdateLevel.Stale ? $r('app.color.fresh_surface') : $r('app.color.status_stale_surface'))
            .borderRadius(10)
        }
        .width('100%')
        Text(user.bio)
          .fontSize($r('app.float.font_12'))
          .fontColor(MUTED)
          .maxLines(1)
      }
      .width('100%')
      .padding({
        left: $r('app.float.detail_side_padding'),
        right: $r('app.float.detail_side_padding'),
        bottom: $r('app.float.detail_top_padding')
      })
      .alignItems(HorizontalAlign.Start)
      .opacity(this.contentOpacity)
      .translate({ y: this.contentOffset })

      Column({ space: 9 }) {
        this.SectionTitle('▰', '最近读过', user.books.length)
        List({ space: 12 }) {
          ForEach(user.books, (book: BookItem, index: number) => {
            ListItem() {
              Column() {
                this.BookCover(book)
              }
              .opacity(this.contentOpacity)
              .translate({ y: this.contentOffset + index * 2 })
            }
          }, (book: BookItem) => book.title)
        }
        .listDirection(Axis.Horizontal)
        .width('100%')
        .height(150)
        .scrollBar(BarState.Off)
      }
      .width('100%')
      .height(190)
      .padding({ left: 20, right: 0, top: 10 })
      .alignItems(HorizontalAlign.Start)

      Column({ space: 10 }) {
        Row({ space: 10 }) {
          Column() {
            this.MediaCard('看过', '◉', user.movies)
          }
          .layoutWeight(1)
          .height('100%')

          Column() {
            this.PlaceCard(user.places)
          }
          .layoutWeight(1)
          .height('100%')
        }
        .layoutWeight(1)
        .width('100%')

        Row({ space: 10 }) {
          Column() {
            this.MediaCard('听过', '◖', user.podcasts)
          }
          .layoutWeight(1)
          .height('100%')

          Column({ space: 8 }) {
            Text('这一阵的关键词')
              .fontSize($r('app.float.font_10'))
              .fontColor($r('app.color.keyword'))
            Text(user.mood)
              .fontSize($r('app.float.font_18'))
              .fontWeight(FontWeight.Bold)
              .fontColor(INK)
              .maxLines(2)
            Blank()
            Text('LIFE / NOW')
              .fontSize($r('app.float.font_8'))
              .fontColor($r('app.color.keyword'))
              .letterSpacing(1.5)
          }
          .layoutWeight(1)
          .height('100%')
          .padding(14)
          .alignItems(HorizontalAlign.Start)
          .backgroundColor($r('app.color.keyword_surface'))
          .borderRadius(18)
        }
        .layoutWeight(1)
        .width('100%')
      }
      .layoutWeight(1)
      .width('100%')
      .padding({
        left: $r('app.float.detail_side_padding'),
        right: $r('app.float.detail_side_padding'),
        bottom: $r('app.float.detail_side_padding')
      })
      .opacity(this.contentOpacity)
      .translate({ y: this.contentOffset })
    }
    .width('100%')
    .height('100%')
    .padding({ top: $r('app.float.detail_top_padding') })
    .backgroundColor(PAGE_BG)
    .transition(
      TransitionEffect
        .OPACITY
        .combine(TransitionEffect.translate({ x: '18%' }))
    )
  }

  build() {
    if (this.uiState.user !== undefined) {
      this.DetailContent(this.uiState.user)
    } else {
      this.MissingState()
    }
  }
}
