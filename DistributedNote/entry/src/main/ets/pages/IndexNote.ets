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

import deviceManager from '@ohos.distributedDeviceManager';
import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import DeviceDialog from '../common/DeviceDialog';
import DistributedObjectModel from '../model/DistributedObjectModel';
import Logger from '../model/Logger';
import Note from '../model/Note';
import { NoteDataSource } from '../common/BasicDataSource';
import NoteItem from '../common/NoteItem';
import RemoteDeviceModel from '../model/RemoteDeviceModel';
import TitleBar from '../common/TitleBar';

const TAG: string = 'Sample_IndexNote';

@Entry
@Component
 export struct IndexNote {
  private dialogController?: CustomDialogController;
  private selectedIndex: number = 0;
  private sessionId: string = '';
  @StorageLink('sessionId') globalSessionId: string = '';
  @StorageLink('objectModel') globalObject: DistributedObjectModel = new DistributedObjectModel();
  @State devices: Array<deviceManager.DeviceBasicInfo> = [];
  @State isOnline: boolean = false;
  @State notes: Array<Note> = [];
  @State clockID: number = 0
  private noteDataSource : NoteDataSource = new NoteDataSource();
  private nmsl: number = 0;

  test(){
    this.noteDataSource.dataArray = this.globalObject.distributedObject.documents;
    this.noteDataSource.notifyDataReload();
    Logger.info(TAG, `this.sessionId = ${this.sessionId}`);
    Logger.info(TAG, `globalSessionId = ${this.globalSessionId}`);
    if (this.sessionId !== this.globalSessionId) {
      this.sessionId = this.globalSessionId;
      this.share();
    }
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

  syncUp() {
    this.noteDataSource.dataArray = this.globalObject.distributedObject.documents;
    this.noteDataSource.notifyDataReload();
    Logger.info(TAG, `this.sessionId = ${this.sessionId}`);
    Logger.info(TAG, `globalSessionId = ${this.globalSessionId}`);
    if (this.sessionId !== this.globalSessionId) {
      this.sessionId = this.globalSessionId;
      this.share();
    }
  }


  onPageShow() {
    this.syncUp();
  }

  share() {
    Logger.info(TAG, `sessionId = ${this.sessionId}`);
    this.globalObject.setChangeCallback(() => {
      this.noteDataSource.dataArray = this.globalObject.distributedObject.documents;
      this.noteDataSource.notifyDataReload();
    })
    this.globalObject.setStatusCallback((session, networkId, status) => {
      Logger.info(TAG, `StatusCallback,${status}`);
      if (status === 'online') {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    })
    this.globalObject.distributedObject.setSessionId(this.sessionId);
    AppStorage.SetOrCreate('objectModel', this.globalObject);
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
    this.globalObject = new DistributedObjectModel();
    this.sessionId = this.globalObject.genSessionId();
    AppStorage.SetOrCreate('sessionId', this.sessionId);
    this.noteDataSource.dataArray = [];
    this.noteDataSource.notifyDataReload();
    this.globalObject.off();
    this.share();
    Logger.info(TAG, `startAbility deviceId:${deviceId}`);
    let context = getContext(this) as common.UIAbilityContext;
    context.startAbility({
      bundleName: 'ohos.samples.distributednote',
      abilityName: 'MainAbility',
      deviceId: deviceId,
      parameters: {
        sessionId: this.sessionId,
      }
    })
  }

  build() {
    Column() {
      Row() {
        Column() {
          Text('我的书籍')
            .fontWeight(FontWeight.Bold)
            .height(35)
            .fontSize(18)
        }
        .width('33%')
        .padding({ left: 10 })
        .margin({ top: 10 })
        .alignItems(HorizontalAlign.Start)

        Column() {
          Row(){
            Text("连接状态 ")
              .fontWeight(FontWeight.Bold)
              .height(35)
              .fontSize(18)
            Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
              .size({ width: 20, height: 20 })
              .objectFit(ImageFit.Contain)
          }
        }
        .width('34%')
        .padding({ left: 10 })
        .margin({ top: 10 })

        Column() {
          Text('发现设备')
            .fontWeight(FontWeight.Bold)
            .height(35)
            .fontSize(18)
            .fontColor(Color.Blue)
        }
        .width('33%')
        .padding({ right: 10 })
        .margin({ top: 10 })
        .onClick(() => {
          this.match()
        })
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
      .height('5%')
      .constraintSize({ minHeight: 70 })
      .padding({ left: 10, right: 10 })
      Divider()
        .color(Color.Black)
        .margin({ left: 20, right: 20})

      /* Row() {
         Text($r('app.string.state'))
           .fontSize(30)
         Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
           .size({ width: 30, height: 30 })
           .objectFit(ImageFit.Contain)
       }
       .width('100%')
       .padding(16)*/

      List({ space: 10 }) {
        LazyForEach(this.noteDataSource, (item: Note, index) => {
          ListItem() {
            NoteItem({ note: item, index: index })
              .id(`${item.title}`)
          }
        }, (item: Note) => JSON.stringify(item))
      }
      .width('95%')
      .margin(10)
      .layoutWeight(1)
      .onClick(() => this.syncUp())
    //  .onClick(() =>  this.test())


      Divider()
        .color(Color.Black)
        .margin({ left: 20, right: 20})

      Row() {
        Column() {
          Image($r('app.media.clear'))
            .size({ width: 20, height: 20 })
          Text($r('app.string.clear'))
            .fontColor(Color.Red)
            .fontSize(20)
        }.layoutWeight(1)
        .id('clearNote')
        .onClick(() => {
          Logger.info(TAG, 'clear notes');
          this.noteDataSource.dataArray = [];
          this.noteDataSource.notifyDataReload();
          this.globalObject.clear();
          AppStorage.SetOrCreate('sessionId', this.sessionId);
        })

        Column() {
          Image($r('app.media.add'))
            .size({ width: 20, height: 20 })
          Text($r('app.string.add'))
            .fontColor(Color.Black)
            .fontSize(20)
        }.layoutWeight(1)
        .id('addNote')
        .onClick(() => {
         // clearInterval(this.nmsl);
          router.replaceUrl({
            url: 'pages/Edit',
            params: {
              note: new Note('', '', '', -1, 0, 15),
              isAdd: true
            }
          })
         // this.nmsl = setInterval(() => {
         //   console.log('do every 1s.');
        //    this.test();
        //  }, 1000);
        })
      }
      .width('100%')
      .padding(10)
    }
    .width('100%')
    .height('100%')
  }
}