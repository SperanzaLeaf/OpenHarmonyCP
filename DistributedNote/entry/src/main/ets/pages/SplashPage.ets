import router from '@ohos.router';

PersistentStorage.persistProp('token', ''); // 在 PersistentStorage 中注册登录 token
AppStorage.setOrCreate('currentTabIndex', 0); // 在 AppStorage 中注册 currentTabIndex

@Entry
@Component
struct SplashPage { // 启动页面
  @State flag: Boolean = false;

  onPageShow(){
    animateTo({duration:1000,onFinish:()=>{
      setTimeout(()=>{
        router.replaceUrl({url:'pages/IndexNote'})  // 切换页面，且不能返回
      },200);
    }},() => {
      this.flag=true;
    });
  }

  build() {
    Column() {
      if (this.flag) {
        Image($r('app.media.ic_logo_lzu'))
          .logoStyle()
          .transition({ type: TransitionType.Insert, opacity: 0, translate: { x: -150 } })
        Text("开源鸿蒙阅读器demo")
          .titleStyle()
          .transition({ type: TransitionType.Insert, opacity: 0, translate: { x: 150 } })
      }
      Blank()
      Text("OpenHarmony Project")// 最底部
        .footerStyle()
    }.bgStyle()
  }
}

@Styles
function bgStyle() {
  .width('100%')
  .height('100%')
  .backgroundImage($r('app.media.bg'))
  .backgroundImageSize({ width: '100%', height: '100%' })
}

@Extend(Image)
function logoStyle() {
  .width(90)
  .height(90)
  .margin({ top: 120 })
}

@Extend(Text)
function titleStyle() {
  .fontSize(21)
  .fontColor(Color.White)
  .fontWeight(FontWeight.Bold)
  .margin({ top: 15 })
}

@Extend(Text)
function footerStyle() {
  .fontSize(12)
  .fontColor('#546B9D')
  .fontWeight(FontWeight.Bold)
  .margin({ bottom: 30 })
}