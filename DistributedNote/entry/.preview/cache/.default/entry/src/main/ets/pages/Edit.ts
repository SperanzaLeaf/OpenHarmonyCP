interface Edit_Params {
    note?: Note;
    isAdd?: boolean;
    uri?: string;
    imageShow?: boolean;
    globalObject?: DistributedObjectModel;
}
import router from "@ohos:router";
import DistributedObjectModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedObjectModel";
import type Note from '../model/Note';
import TitleBar from "@bundle:ohos.samples.distributednote/entry/ets/common/TitleBar";
import picker from "@ohos:file.picker";
import fs from "@ohos:file.fs";
import util from "@ohos:util";
class Edit extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__note = new ObservedPropertyObjectPU((router.getParams() as Record<string, Object>)['note'] as Note, this, "note");
        this.isAdd = (router.getParams() as Record<string, Object>)['isAdd'] as boolean;
        this.uri = "empty";
        this.__imageShow = new ObservedPropertySimplePU(false, this, "imageShow");
        this.__globalObject = this.createStorageLink('objectModel', new DistributedObjectModel(), "globalObject");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Edit_Params) {
        if (params.note !== undefined) {
            this.note = params.note;
        }
        if (params.isAdd !== undefined) {
            this.isAdd = params.isAdd;
        }
        if (params.uri !== undefined) {
            this.uri = params.uri;
        }
        if (params.imageShow !== undefined) {
            this.imageShow = params.imageShow;
        }
    }
    updateStateVars(params: Edit_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__note.purgeDependencyOnElmtId(rmElmtId);
        this.__imageShow.purgeDependencyOnElmtId(rmElmtId);
        this.__globalObject.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__note.aboutToBeDeleted();
        this.__imageShow.aboutToBeDeleted();
        this.__globalObject.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __note: ObservedPropertyObjectPU<Note>;
    get note() {
        return this.__note.get();
    }
    set note(newValue: Note) {
        this.__note.set(newValue);
    }
    private isAdd: boolean;
    private uri: string;
    private __imageShow: ObservedPropertySimplePU<boolean>;
    get imageShow() {
        return this.__imageShow.get();
    }
    set imageShow(newValue: boolean) {
        this.__imageShow.set(newValue);
    }
    private __globalObject: ObservedPropertyAbstractPU<DistributedObjectModel>;
    get globalObject() {
        return this.__globalObject.get();
    }
    set globalObject(newValue: DistributedObjectModel) {
        this.__globalObject.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Edit.ets(36:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let paramsLambda = () => {
                        return {
                            title: this.note.title === '' ? "添加书籍" : this.note.title
                        };
                    };
                    ViewPU.create(new TitleBar(this, { title: this.note.title === '' ? "添加书籍" : this.note.title }, undefined, elmtId, paramsLambda));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, null);
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Edit.ets(38:7)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
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
            Text.create("标题");
            Text.debugLine("entry/src/main/ets/pages/Edit.ets(58:9)");
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
            Text.margin({ top: 15 });
        }, Text);
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
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入标题', text: this.note.title });
            TextInput.debugLine("entry/src/main/ets/pages/Edit.ets(60:9)");
            TextInput.id('titleInput');
            TextInput.placeholderColor(Color.Gray);
            TextInput.fontSize(30);
            TextInput.margin({ left: 15, right: 15, top: 15 });
            TextInput.height(60);
            TextInput.backgroundColor(Color.White);
            TextInput.onChange((value: string) => {
                this.note.title = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("简介");
            Text.debugLine("entry/src/main/ets/pages/Edit.ets(70:9)");
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '请输入简介', text: this.note.intro });
            TextArea.debugLine("entry/src/main/ets/pages/Edit.ets(72:9)");
            TextArea.id('contentInput');
            TextArea.placeholderColor(Color.Gray);
            TextArea.backgroundColor(Color.White);
            TextArea.fontSize(30);
            TextArea.height('35%');
            TextArea.margin({ left: 16, right: 16, top: 16 });
            TextArea.textAlign(TextAlign.Start);
            TextArea.onChange((value: string) => {
                this.note.intro = value;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Edit.ets(83:9)");
            Row.height(60);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("选择文件");
            Button.debugLine("entry/src/main/ets/pages/Edit.ets(84:11)");
            Button.onClick(() => {
                let textSelector = new picker.DocumentSelectOptions();
                let documentViewPicker = new picker.DocumentViewPicker(); // 创建文件选择器实例
                documentViewPicker.select(textSelector).then((DocumentSelectResult) => {
                    this.uri = DocumentSelectResult[0];
                });
            });
            Button.height(50);
            Button.margin({ right: 5, top: 60 });
            Button.backgroundColor('#0D9FFB');
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("导入书籍");
            Button.debugLine("entry/src/main/ets/pages/Edit.ets(94:11)");
            Button.onClick(() => {
                let file: fs.File | null = null;
                if (this.uri != "empty") {
                    file = fs.openSync(this.uri);
                }
                let buf = new ArrayBuffer(64 * 1024 * 1024); //缓冲区为64Mb
                let rd = new util.TextDecoder("utf-8", { ignoreBOM: true });
                let ret: string = "";
                if (file != null) {
                    fs.read(file.fd, buf, (err, readLen) => {
                        ret = rd.decode(new Uint8Array(buf.slice(0, readLen)));
                        this.note.content = ret;
                        fs.closeSync(file);
                    });
                }
            });
            Button.height(50);
            Button.margin({ left: 5, top: 60 });
            Button.backgroundColor('#0D9FFB');
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/pages/Edit.ets(115:9)");
            Button.id('saveNote');
            Button.backgroundColor('#0D9FFB');
            Button.height(50);
            Button.width(200);
            Button.margin({ top: 40 });
            Button.onClick(() => {
                if (!this.isAdd) {
                    let index: number = (router.getParams() as Record<string, Object>)['index'] as number;
                    this.globalObject.update(index, this.note.title, this.note.content, this.note.mark, this.note.intro);
                }
                else {
                    this.globalObject.add(this.note.title, this.note.content, this.note.mark, this.note.intro);
                }
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("保存");
            Text.debugLine("entry/src/main/ets/pages/Edit.ets(116:11)");
            Text.fontColor(Color.White);
            Text.fontSize(17);
        }, Text);
        Text.pop();
        Button.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Edit(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
