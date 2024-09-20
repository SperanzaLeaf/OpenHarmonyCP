import router from '@ohos.router'
import promptAction from '@ohos.promptAction'
import { universityInfoData, UniversityInfo } from '../model/UniversityInfo'

@Preview
@Component
export struct UniversityInfoPage {
  @State universityInfoList: UniversityInfo[] = universityInfoData
  scroller:Scroller = new Scroller()

  build() {
    Column() {
      // header
      Text('近期热门')
        .fontSize(18)
        .margin({ top: 45 })
        .fontWeight(FontWeight.Bold)
      Divider()
        .color(Color.Black)
        .margin({ left: 20, right: 20, top: 10 })
      // 学校介绍
      this.listBuilder()
    } // 最外层 Column
    .height('100%')
    .width('100%')
  }

  // 学校介绍列表页面布局
  @Builder
  listBuilder() {
    Stack() { // 将学校介绍列表与控制按钮堆叠在一起
      // 打卡记录列表
      List({scroller:this.scroller}) {  // 学校介绍列表
        ForEach(this.universityInfoList, (universityInfo:UniversityInfo) => {
          ListItem() {
            UniversityInfoItem({ universityInfo: universityInfo })  // 打卡记录
          }
        })
        ListItem().height(10).selectable(false)  // 占位符，不然最后一个项目在屏幕外
      }.width('100%')
      .height('100%')
      .alignListItem(ListItemAlign.Center)
      .onReachEnd(()=>{ // 列表到底了
        promptAction.showToast({message:'没有更多数据了'})
      })

      // 返回顶部按钮和刷新按钮
      Column({ space: 20 }) {
        Button({ type: ButtonType.Circle }) {
          Image($r('app.media.ic_top'))
            .height(14)
            .width(14)
        }
        .height(40)
        .width(40)
        .backgroundColor(Color.Black)
        .opacity(0.5)
        .onClick(() => {
          // 返回顶部
          this.scroller.scrollToIndex(0)
        })

        Button({ type: ButtonType.Circle }) {
          Image($r('app.media.ic_refresh'))
            .height(14)
            .width(14)
        }
        .height(40)
        .width(40)
        .backgroundColor(Color.Black)
        .opacity(0.5)
        .onClick(() => {

        })
      }
      .offset({ x: -20, y: -50 })
    }.width('100%')
    .layoutWeight(1)
    .alignContent(Alignment.BottomEnd)
  }

}


// 自定义学校介绍组件
@Component
struct UniversityInfoItem {
  @BuilderParam universityInfo:UniversityInfo;

  build() {
    Row({ space: 13 }) {
      // 校徽
      Image(this.universityInfo.photoURL)
        .width("15%")
        .borderRadius(5)

      // 学校信息
      Column({ space: 0 }) {
        Text(this.universityInfo.nameCN)
          .height(30)
          .fontSize(25)
          .fontWeight(FontWeight.Bold)
        Text("豆瓣排名：" + String(this.universityInfo.douban_rank))
          .height(20)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)

        Text(this.universityInfo.country+ " " + this.universityInfo.author)
          .height(20)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
        Text("简介："+this.universityInfo.introduction)
          .height(40)
          .width("80%")
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      } // Column: 学校信息
      .alignItems(HorizontalAlign.Start)
    } // Row
    .alignItems(VerticalAlign.Top)
    .padding(10)
    .width('90%')
    .margin({ top: 10 })
    .borderRadius(10)
    .shadow({ radius: 20 })
    // .onClick(()=>{
    //   router.pushUrl({url:'pages/UniversityDetailPage',params:{  // 点击学校介绍时，切换到学校详情页面
    //     universityInfo:this.universityInfo
    //   }})
    // })  // onClick
  } // build

}