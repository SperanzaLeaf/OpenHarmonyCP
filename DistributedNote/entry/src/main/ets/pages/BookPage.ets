/*
 * Copyright (c) 2023 Shenzhen Kaihong Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';
import DistributedObjectModel from '../model/DistributedObjectModel';
import DistributedCanvasModel from '../model/DistributedCanvasModel';

@Preview
@Component
export struct BookPage {
  @State titleList: Array<string> = ['热门书籍', '分布式阅读'];
  @State urlList: Array<string> = ['pages/IndexCanvas', 'pages/IndexNote'];
  @StorageLink('canvasModel') globalCanvasObject?: DistributedCanvasModel = new DistributedCanvasModel();
  @StorageLink('objectModel') globalObject?: DistributedObjectModel = new DistributedObjectModel();

  onPageShow(): void {
    this.globalCanvasObject = AppStorage.Get('canvasModel');
    this.globalCanvasObject?.distributedCanvas.setSessionId(() => {
      console.info('leave canvas lession.');
    });

    this.globalObject = AppStorage.Get('objectModel');
    this.globalObject?.distributedObject.setSessionId(() => {
      console.info('leave note lession.');
    });
  }

  build() {
    Column() {
      Row(){
        Image($r('app.media.AI_Read_2'))
          .width('100%')
          .height(300)
      }
      Row(){
        Button("分布式阅读")
          .onClick(() => {
            router.pushUrl({
              url: this.urlList[1],
            })
          })
          .width('50%')
          .height(100)
          .fontSize(25)
          .shadow({ radius: 40, color: Color.Yellow, offsetX: 0, offsetY: 0 })
        // Button("热门书籍")
        //   .onClick(() => {
        //     router.pushUrl({
        //       url: this.urlList[0],
        //     })
        //   })
        //   .width('50%')
        //   .height(200)
        //   .fontSize(35)
      }
      .width('100%')
      .height(233)
      .justifyContent(FlexAlign.SpaceEvenly)
     /* List({ space: 6, initialIndex: 0 }) {
        ForEach(this.titleList, (item: string, index) => {
          ListItem() {
            Button('' + item).fontSize(25)
          }
          .backgroundColor(Color.Orange)
          .width("100%")
          .height(75)
          .onClick(() => {
            router.pushUrl({
              url: this.urlList[index],
            })
          })
          .key('chose' + index )
        }, (item: string) => item)
      }
      .width('100%')
      .height(462) */
    }
    .width('100%')
    .height('100%')
    .padding({ left: '5%', right: '5%' })
    .justifyContent(FlexAlign.Center)
  }
}



