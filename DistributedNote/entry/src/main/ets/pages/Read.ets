/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import router from '@ohos.router'
import util from '@ohos.util'
import fs from '@ohos.file.fs'
import picker from '@ohos.file.picker'
import Logger from '../model/Logger'
import mediaQuery from '@ohos.mediaquery';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import common from '@ohos.app.ability.common'
import DistributedReaderModel from "../model/DistributedReaderModel"
import deviceManager from '@ohos.distributedDeviceManager';
import { ReaderDataSource } from '../common/BasicDataSource';
import RemoteDeviceModel from '../model/RemoteDeviceModel';
import DeviceDialog from '../common/DeviceDialog'

const TAG: string = 'Index'
const EXIT: string = 'exit'
const DATA_CHANGE: string = 'dataChange'

@Entry
@Component
struct Index {
  @StorageLink('sessionId') globalSessionId: string = '';
  @StorageLink('readerModel') globalObject: DistributedReaderModel = new DistributedReaderModel();
  @StorageLink('isOnline') globalIsOnline: boolean = false;

  @State devices: Array<deviceManager.DeviceBasicInfo> = [];
  @State isOnline: boolean = false;
  @State scorOff: number = 0;
  @State tit: string = (router.getParams() as Record<string, string>)['title'] as string
  @State res: string = (router.getParams() as Record<string, string>)['text'] as string
  @State yoffset: number = (router.getParams() as Record<string, number>)['progress'] as number
  @State fontSize: number = (router.getParams() as Record<string, number>)['fontsize'] as number
  @State selectText: string = ((router.getParams() as Record<string, number>)['fontsize'] as number).toString() + "vp"
  @State uri: string = 'uri'
  @State curOffset: number = 0
  @State maxOffset: number = 0
  @State progress: number = 0
  @State strProg: string = '0'
  @State clockID: number = 0
  @State isShow: boolean = false
  @State isLand: boolean = false
  @State isDistributed: boolean = false

  private dialogController?: CustomDialogController;
  private selectedIndex: number = 0;
  private sessionId: string = '';
  private scroller: Scroller = new Scroller()
  private listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)')
  private readerDataSource : ReaderDataSource = new ReaderDataSource();

  syncUp() {
    this.readerDataSource.mov[0] = this.globalObject.distributedReader.scrollOffset;
    this.readerDataSource.mov[1] = this.globalObject.distributedReader.fontsize
    let temp = this.readerDataSource.mov[0]
    let tmp = this.readerDataSource.mov[1]
    console.log("itis" + this.globalObject.distributedReader.scrollOffset);
    this.readerDataSource.notifyDataReload();
    Logger.info(TAG, `this.sessionId = ${this.sessionId}`);
    Logger.info(TAG, `globalSessionId = ${this.globalSessionId}`);
    if (this.sessionId !== this.globalSessionId) {
      this.sessionId = this.globalSessionId;
      this.share();
    }
    this.scroller.scrollTo({xOffset: 0, yOffset: temp})
    this.fontSize = tmp
  }

  share() {
    Logger.info(TAG, `sessionId = ${this.sessionId}`);
    this.globalObject.setChangeCallback(() => {
      this.readerDataSource.mov[0] = this.globalObject.distributedReader.scrollOffset;
      this.readerDataSource.mov[1] = this.globalObject.distributedReader.fontsize
      this.readerDataSource.notifyDataReload();
    })
    this.globalObject.setStatusCallback((session, networkId, status) => {
      Logger.info(TAG, `StatusCallback,${status}`);
      if (status === 'online') {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    })
    this.globalObject.distributedReader.setSessionId(this.sessionId);
    AppStorage.SetOrCreate('readerModel', this.globalObject);
    AppStorage.SetOrCreate('isOnline', this.globalIsOnline);
  }

  clearSelectState() {
    this.devices = [];
    this.dialogController?.close();
    this.dialogController = undefined;
  }

  onSelectedDevice = (selectedIndex: number) => {
    this.selectedIndex = selectedIndex;
    Logger.info(TAG, 'start ability ......');
    if (RemoteDeviceModel === null || RemoteDeviceModel.discoverDevices.length <= 0) {
      Logger.info(TAG, `start ability device:${JSON.stringify(this.devices)}`);
      this.startAbility(this.devices[this.selectedIndex].networkId as string);
      this.clearSelectState();
      return;
    }
    Logger.info(TAG, 'start ability, needAuth');
    RemoteDeviceModel.authenticateDevice(this.devices[this.selectedIndex], (device: deviceManager.DeviceBasicInfo) => {
      Logger.info(TAG, 'auth and online finished');
      this.startAbility(device.networkId);
    })
    Logger.info(TAG, 'start ability2 ......');
    this.clearSelectState();
  }

  startAbility(deviceId: string) {
    this.globalObject = new DistributedReaderModel();
    this.sessionId = this.globalObject.genSessionId();
    AppStorage.SetOrCreate('sessionId', this.sessionId);
    this.readerDataSource.mov = [];
    this.readerDataSource.notifyDataReload();
    this.globalObject.off();
    this.share();
    Logger.info(TAG, `startAbility deviceId:${deviceId}`);
    let context = getContext(this) as common.UIAbilityContext;
    context.startAbility({
      bundleName: 'ohos.samples.distributednote',
      abilityName: "MainAbility",
      deviceId: deviceId,
      parameters: {
        sessionId: this.sessionId,
      }
    })
  }

  //========================================================================

  onLand(mediaQueryResult: mediaQuery.MediaQueryResult) {
    Logger.info(`${TAG} onLand: mediaQueryResult.matches=${mediaQueryResult.matches}`)
    if (mediaQueryResult.matches) {
      this.isLand = true
    } else {
      this.isLand = false
    }
  }

  aboutToAppear() {
    this.listener.on('change', (mediaQueryResult) => this.onLand(mediaQueryResult));
  }

  aboutToDisappear(): void {
    clearInterval(this.clockID)
  }

  onPageShow(): void {
  //  let mem = 15, pro =0, maxOff = 0;
    this.clockID = setInterval(() => {
            console.log('do every 1s.');
            this.syncUp();
   //         if(this.fontSize != mem){
  //            this.scroller.scrollEdge(Edge.End)
  //            maxOff = this.scroller.currentOffset()
  //            this.scroller.scrollTo({xOffset: 0, yOffset: pro * maxOff})
  //          }
  //          mem = this.fontSize, pro =
          }, 1000);
  }

  getProgress(): void {
    if (this.maxOffset != 0) {
      this.progress = (this.scroller.currentOffset().yOffset / this.maxOffset * 100)
      if (this.progress < 0) {
        this.progress = 0
      }
      if(this.progress > 100){
        this.progress = 100
      }
      this.strProg = this.progress.toFixed(0)
      if (this.strProg == "-0") {
        this.strProg = "0"
      }
    }
  }

  fixProgress(): void {
    this.scroller.scrollEdge(Edge.End);
    setTimeout(() => {
      this.maxOffset = this.scroller.currentOffset().yOffset;
      this.scroller.scrollEdge(Edge.Start)
    }, 2000)
  }

  importURI(): void {
    let textSelector = new picker.DocumentSelectOptions();
    let documentViewPicker = new picker.DocumentViewPicker(); // 创建文件选择器实例
    documentViewPicker.select(textSelector).then((DocumentSelectResult) => {
      this.uri = DocumentSelectResult[0]
    })
  }

  importText(): string {
    let file = fs.openSync(this.uri);
    let buf = new ArrayBuffer(64 * 1024 * 1024); //缓冲区为64Mb
    let rd = new util.TextDecoder("utf-8", { ignoreBOM: true })
    let ret: string = "";
    fs.read(file.fd, buf, (err, readLen) => {
      ret = rd.decode(new Uint8Array(buf.slice(0, readLen)))
      this.res = ret;
      fs.closeSync(file)
    })
    this.fixProgress()
    return ret;
  }

  match(){
      RemoteDeviceModel.registerDeviceListCallback(() => {
        Logger.info(TAG, 'registerDeviceListCallback, callback entered');
        this.devices = [];
        this.devices = RemoteDeviceModel.discoverDevices.length > 0 ? RemoteDeviceModel.discoverDevices : RemoteDeviceModel.devices;
        if (this.dialogController) {
          this.dialogController.close();
          this.dialogController = undefined;
        }
        this.dialogController = new CustomDialogController({
          builder: DeviceDialog({
            devices: this.devices,
            onSelectedIndexChange: this.onSelectedDevice
          }),
          autoCancel: true
        })
        this.dialogController.open();
      })
  }
  // -----------------------------------------------------------------------
  // async aboutToAppear() {
  //   this.listener.on('change', this.onLand)
  //   let context = getContext(this) as common.UIAbilityContext
  //   let atManager = abilityAccessCtrl.createAtManager()
  //   try {
  //     atManager.requestPermissionsFromUser(context, ['ohos.permission.DISTRIBUTED_DATASYNC']).then((data) => {
  //       Logger.info(TAG, `data: ${JSON.stringify(data)}`)
  //     }).catch((err: object) => {
  //       Logger.info(TAG, `err: ${JSON.stringify(err)}`)
  //     })
  //   } catch (err) {
  //     Logger.info(TAG, `catch err->${JSON.stringify(err)}`)
  //   }
  //   Logger.info(TAG, `grantPermission,requestPermissionsFromUser`)
  //   let isRemote: string | undefined = AppStorage.get('isRemote')
  //   if (isRemote === 'isRemote' ? true : false) {
  //     this.isDistributed = true
  //     this.isShow = true
  //   }
  //   this.kvStoreModel.setOnMessageReceivedListener(context, DATA_CHANGE, (value: string) => {
  //     Logger.debug(TAG, `DATA_CHANGE: ${value},this.isDistributed = ${this.isDistributed}`)
  //     if (this.isDistributed) {
  //       if (value.search(EXIT) !== -1) {
  //         Logger.info(TAG, `EXIT ${EXIT}`)
  //         context.terminateSelf((error) => {
  //           Logger.error(TAG, `terminateSelf finished, error= ${error}`)
  //         })
  //       } else {
  //         if (value === 'null') {
  //           this.expression = ''
  //         } else {
  //           this.expression = value
  //         }
  //         // if (this.isOperator(this.expression.substr(this.expression.length - 1, this.expression.length))) {
  //         this.result = "1"
  //         // } else {
  //         //   this.result = "1"
  //         // }
  //       }
  //     }
  //   })
  // }

  build() {
    Column() {
      // TitleBarComponent({
      //   isLand: this.isLand,
      //   startAbilityCallBack: this.startAbilityCallBack,
      //   remoteDeviceModel: this.remoteDeviceModel,
      //   isDistributed: $isDistributed,
      //   isShow: this.isShow
      // })
      Row() {
        Column() {
          Select([{ value: '10vp' }, { value: '15vp' }, { value: '20vp' }, { value: '25vp' }, { value: '30vp' }, { value: '35vp' }])
            .backgroundColor("#FFFFFF")
            .fontColor(Color.Black)
            .selected(1)
            .value("字号")
            .font({ size: 15, weight: FontWeight.Medium})
            .selectedOptionFont({ size: 25, weight: 400 })
            .optionFont({ size: 15, weight: 400 })
            .alignSelf(ItemAlign.Start)
            .onSelect((index: number) => {
              this.fontSize = 5 * (index + 2)
              let temp = this.fontSize
              this.globalObject.updateFont(temp)
            })
        }
        .width("33%")
        Column() {
          Text(this.tit)
            .backgroundColor("##FFFFFF")
            .fontColor(Color.Black)
            .font({ size: 15 })
        }
        .width("34%")
        Column() {
         //   Text(this.strProg + "%")
        //      .backgroundColor("#FFFFFF")
         //     .fontColor(Color.Black)
          //    .fontWeight(FontWeight.Normal)
          //    .fontColor(Color.Black)
          //    .font({ size: 15 })
             // .onClick(() => {this.maxOffset = this.scroller.currentOffset().yOffset})

            Text('发现设备')
              .fontWeight(FontWeight.Bold)
              .height(35)
              .fontSize(18)
              .fontColor(Color.Blue)
       //     Button("传输")
      //        .onClick(() => {
      //          let temp = this.scroller.currentOffset().yOffset;// - this.offMem1;
      //          this.globalObject.update(temp);
      //          this.offMem1 = this.scroller.currentOffset().yOffset;
      //        })
       //     Button("同步")
       //       .onClick(() => {
       //         this.syncUp()
       //       })
        }
        .width("33%")
        .onClick(() => this.match())
      }.height("8%")

      Row() {
        Scroll(this.scroller) {
          Text(this.res)
            .fontSize(this.fontSize)
            .width('100%')
          //  .onClick(() => {
          //    if (this.flag == 0){
          //      let tempProgress = this.progress
          //      this.fixProgress()
          //      this.flag++
          //      setTimeout(() => {
          //        this.scroller.scrollBy(0, tempProgress / 100 * this.maxOffset)
          //      }, 4000)
           //   }
         //  })
        }
        .onScroll(() => {
   //       this.getProgress()
          let temp = this.scroller.currentOffset().yOffset
          this.globalObject.updateOffset(temp);
        //  this.offMem1 = this.scroller.currentOffset().yOffset
        })
        .scrollable(ScrollDirection.Vertical)
        .scrollBar(BarState.Auto)
        .scrollBarColor(Color.Gray)
        .scrollBarWidth(10)
      }
      .height("92%")

      /*Row() {
        Button("回到开头")
          .backgroundColor("#FFFFFF")
          .fontColor(Color.Black)
          .fontWeight(FontWeight.Normal)
          .fontSize(15)
          .onClick(() => {
            this.scroller.scrollEdge(Edge.Top)
            this.getProgress()
          })
        Button("去到结尾")
          .backgroundColor("#FFFFFF")
          .fontColor(Color.Black)
          .fontWeight(FontWeight.Normal)
          .fontSize(15)
          .onClick(() => {
            this.scroller.scrollEdge(Edge.End)
            this.getProgress()
          })
        Button("前进10%")
          .backgroundColor("#FFFFFF")
          .fontColor(Color.Black)
          .fontWeight(FontWeight.Normal)
          .fontSize(15)
          .onClick(() => {
            if (this.progress > 90) {
              this.scroller.scrollEdge(Edge.End)
            } else {
              this.scroller.scrollBy(0, 0.1 * this.maxOffset)
            }
            this.getProgress()
          })
        Button("后退10%")
          .backgroundColor("#FFFFFF")
          .fontColor(Color.Black)
          .fontWeight(FontWeight.Normal)
          .fontSize(15)
          .onClick(() => {
            if (this.progress < 10) {
              this.scroller.scrollEdge(Edge.Top)
            } else {
              this.scroller.scrollBy(0, -0.1 * this.maxOffset)
            }
            this.getProgress()
          })
      }
      .height("8%")*/
    }
    .size({ width: '100%', height: '100%' })
  }
}
