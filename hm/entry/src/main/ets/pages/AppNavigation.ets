import { HomePage } from './HomePage';
import { DetailPage } from './DetailPage';
import { DetailRouteParam } from '../model/UserProfile';

const INK = $r('app.color.ink');
const MUTED = $r('app.color.muted');
const CARD = $r('app.color.card');

@Entry
@Component
struct AppNavigation {
  @Provide('pageStack') pageStack: NavPathStack = new NavPathStack();
  @Provide('homeStyle') homeStyle: string = '动态';
  @State private showSettings: boolean = false;
  @State private selectedServer: string = '本地 Mock';
  @State private motionEnabled: boolean = true;

  @Builder
  pageMap(name: string, param: Object) {
    if (name === 'DetailPage' && param instanceof DetailRouteParam) {
      NavDestination() {
        DetailPage({
          pageStack: this.pageStack,
          userId: param.id
        });
      }
      .title(param.header.name);
    }
  }

  @Builder
  homeTitle() {
    Row() {
    Text($r('app.string.home_title'))
        .fontSize($r('app.float.font_20'))
        .fontWeight(FontWeight.Bold)
        .fontColor(INK)
    }
    .height($r('app.float.nav_title_height'))
    .padding({ left: 12 })
    .alignItems(VerticalAlign.Center)
    .translate({ y: 12 })
  }

  @Builder
  navigationMenu() {
    Row() {
      Text('⚙')
        .fontSize($r('app.float.font_20'))
        .fontColor(INK)
        .onClick(() => {
          this.showSettings = true;
        })
    }
    .width($r('app.float.nav_action_size'))
    .height($r('app.float.nav_action_size'))
    .justifyContent(FlexAlign.Center)
    .alignItems(VerticalAlign.Center)
    .translate({ y: 12 })
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
  SettingsChoice(label: ResourceStr, selected: boolean, onSelect: () => void) {
    Row() {
      Text(label)
        .fontSize($r('app.float.font_13'))
        .fontColor(selected ? INK : MUTED)
      Blank()
      if (selected) {
        Text('✓')
        .fontSize($r('app.float.font_16'))
          .fontColor($r('app.color.fresh_text'))
      }
    }
    .width('100%')
    .height($r('app.float.size_38'))
    .padding({ left: 12, right: 12 })
    .backgroundColor(selected ? $r('app.color.fresh_surface') : $r('app.color.panel_surface'))
    .borderRadius($r('app.float.radius_12'))
    .onClick(onSelect)
  }

  @Builder
  SettingsPanel() {
    Column() {
      Blank()
        .layoutWeight(1)
        .onClick(() => {
          this.showSettings = false;
        })
      Column({ space: 14 }) {
        Row() {
        Text($r('app.string.settings'))
            .fontSize($r('app.float.font_22'))
            .fontWeight(FontWeight.Bold)
            .fontColor(INK)
          Blank()
          Text('×')
            .fontSize($r('app.float.font_26'))
            .fontColor(MUTED)
            .onClick(() => {
              this.showSettings = false;
            })
        }
        .width('100%')

        Column({ space: 8 }) {
          Text('服务器')
            .fontSize($r('app.float.font_11'))
            .fontColor(MUTED)
          this.SettingsChoice($r('app.string.server_mock'), this.selectedServer === '本地 Mock', () => {
            this.selectedServer = '本地 Mock';
          })
          this.SettingsChoice($r('app.string.server_tokyo'), this.selectedServer === '东京节点', () => {
            this.selectedServer = '东京节点';
          })
          this.SettingsChoice($r('app.string.server_singapore'), this.selectedServer === '新加坡节点', () => {
            this.selectedServer = '新加坡节点';
          })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)

        Column({ space: 8 }) {
          Text($r('app.string.home_style'))
            .fontSize($r('app.float.font_11'))
            .fontColor(MUTED)
          Row({ space: 8 }) {
            Toggle({ type: ToggleType.Button, isOn: this.homeStyle === '列表' }) {
              Text('▤')
                .fontSize($r('app.float.font_18'))
            }
            .width(68)
            .height(42)
            .onChange((isOn: boolean) => {
              if (isOn) {
                this.homeStyle = '列表';
              }
            })
            Toggle({ type: ToggleType.Button, isOn: this.homeStyle === '动态' }) {
              Text('✦')
                .fontSize($r('app.float.font_18'))
            }
            .width(68)
            .height(42)
            .onChange((isOn: boolean) => {
              if (isOn) {
                this.homeStyle = '动态';
              }
            })
          }
          .width('100%')
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)

        Row() {
          Text($r('app.string.page_animation'))
            .fontSize($r('app.float.font_13'))
            .fontColor(INK)
          Blank()
          Text(this.motionEnabled ? $r('app.string.enabled') : $r('app.string.disabled'))
            .fontSize($r('app.float.font_12'))
            .fontColor(this.motionEnabled ? $r('app.color.fresh_text') : MUTED)
            .onClick(() => {
              this.motionEnabled = !this.motionEnabled;
            })
        }
        .width('100%')
      }
      .width('100%')
      .padding($r('app.float.space_22'))
      .backgroundColor(CARD)
      .borderRadius({ topLeft: 26, topRight: 26 })
      .shadow({ radius: $r('app.float.space_20'), color: $r('app.color.panel_shadow'), offsetX: 0, offsetY: -4 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.dim_overlay'))
  }

  @Builder
  settingsOverlay() {
    if (this.showSettings) {
      this.SettingsPanel();
    }
  }

  build() {
    Navigation(this.pageStack) {
      HomePage()
    }
    .title(this.homeTitle)
    .titleMode(NavigationTitleMode.Mini)
    .hideBackButton(this.pageStack.size() === 0)
    .menus(this.navigationMenu)
    .overlay(this.settingsOverlay)
    .navDestination(this.pageMap);
  }
}
