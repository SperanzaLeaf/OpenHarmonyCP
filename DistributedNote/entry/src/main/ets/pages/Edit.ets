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
import { MARKS } from '../model/Const'
import DistributedObjectModel from '../model/DistributedObjectModel'
import Note from '../model/Note'
import TitleBar from '../common/TitleBar'
import picker from '@ohos.file.picker'
import fs from '@ohos.file.fs'
import util from '@ohos.util'
import File, { FileDeleteOption } from '@system.file'
import  { IndexNote } from './IndexNote'

@Entry
@Component
struct Edit {
  @State note: Note = (router.getParams() as Record<string, Object>)['note'] as Note;
  private isAdd: boolean = (router.getParams() as Record<string, Object>)['isAdd'] as boolean;
  private uri: string = "empty";
  @State imageShow: boolean = false
  @StorageLink('objectModel') globalObject: DistributedObjectModel = new DistributedObjectModel()

 // onBackPress(): boolean | void {
 //   router.replaceUrl({url: "pages/IndexNote"})
 // }


  build() {
    Column() {
      TitleBar({ title: this.note.title === '' ? "添加书籍" : this.note.title })
      Column() {
        /*Row() {
          Image(this.note.mark >= 0 ? MARKS[this.note.mark] : $r('app.media.mark'))
            .width(30)
            .aspectRatio(1)
            .margin({ left: 16, top: 16 })
            .objectFit(ImageFit.Contain)
            .alignSelf(ItemAlign.Start)
          Select([{ value: '   ', icon: MARKS[0] },
                  { value: '   ', icon: MARKS[1] },
                  { value: '   ', icon: MARKS[2] },
                  { value: '   ', icon: MARKS[3] },
                  { value: '   ', icon: MARKS[4] }])
            .selected(this.note.mark)
            .margin({ top: 5 })
            .onSelect((index: number) => {
              this.note.mark = index
            })
        }
        .width('100%')*/
        Text("标题")
          .margin({ top: 15 })
        TextInput({ placeholder: '请输入标题', text: this.note.title })
          .id('titleInput')
          .placeholderColor(Color.Gray)
          .fontSize(30)
          .margin({ left: 15, right: 15, top: 15 })
          .height(60)
          .backgroundColor(Color.White)
          .onChange((value: string) => {
            this.note.title = value
          })
        Text("简介")
          .margin({ top: 15 })
        TextArea({ placeholder: '请输入简介', text: this.note.intro })
          .id('contentInput')
          .placeholderColor(Color.Gray)
          .backgroundColor(Color.White)
          .fontSize(30)
          .height('35%')
          .margin({ left: 16, right: 16, top: 16 })
          .textAlign(TextAlign.Start)
          .onChange((value: string) => {
            this.note.intro = value
          })
        Row(){
          Button("选择文件").onClick(() => {
            let textSelector = new picker.DocumentSelectOptions();
            let documentViewPicker = new picker.DocumentViewPicker(); // 创建文件选择器实例
            documentViewPicker.select(textSelector).then((DocumentSelectResult) => {
              this.uri = DocumentSelectResult[0]
            })
          })
            .height(50)
            .margin({right: 5, top: 60})
            .backgroundColor('#0D9FFB')
          Button("导入书籍").onClick(() => {
            let file: fs.File | null = null;
            if(this.uri != "empty"){
              file = fs.openSync(this.uri);
            }
            let buf = new ArrayBuffer(64 * 1024 * 1024); //缓冲区为64Mb
            let rd = new util.TextDecoder("utf-8", { ignoreBOM: true })
            let ret: string = "";
            if(file != null){
              fs.read(file.fd, buf, (err, readLen) => {
                ret = rd.decode(new Uint8Array(buf.slice(0, readLen)))
                this.note.content = ret;
                fs.closeSync(file)
              })
            }
          })
            .height(50)
            .margin({left: 5, top: 60})
            .backgroundColor('#0D9FFB')
        }
        .height(60)
        Button() {
          Text("保存")
            .fontColor(Color.White)
            .fontSize(17)
        }
        .id('saveNote')
        .backgroundColor('#0D9FFB')
        .height(50)
        .width(200)
        .margin({ top: 40 })
        .onClick(() => {
          if (!this.isAdd) {
            let index: number = (router.getParams() as Record<string, Object>)['index'] as number;
            this.globalObject.update(index, this.note.title, this.note.content, this.note.mark, this.note.intro, this.note.prog, this.note.fontsize)
          } else {
            this.globalObject.add(this.note.title, this.note.content, this.note.mark, this.note.intro, this.note.prog, this.note.fontsize)
          }
          router.replaceUrl({url: "pages/IndexNote"})
        })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}