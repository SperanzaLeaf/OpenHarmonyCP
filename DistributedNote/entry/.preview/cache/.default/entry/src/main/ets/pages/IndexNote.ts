interface IndexNote_Params {
    dialogController?: CustomDialogController;
    selectedIndex?: number;
    sessionId?: string;
    globalSessionId?: string;
    globalObject?: DistributedObjectModel;
    devices?: Array<deviceManager.DeviceBasicInfo>;
    isOnline?: boolean;
    notes?: Array<Note>;
    noteDataSource?: NoteDataSource;
    nmsl?: number;
    onSelectedDevice?;
}
import type deviceManager from "@ohos:distributedDeviceManager";
import router from "@ohos:router";
import type common from "@ohos:app.ability.common";
import { BUNDLE, ABILITY } from "@bundle:ohos.samples.distributednote/entry/ets/model/Const";
import DeviceDialog from "@bundle:ohos.samples.distributednote/entry/ets/common/DeviceDialog";
import DistributedObjectModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedObjectModel";
import Logger from "@bundle:ohos.samples.distributednote/entry/ets/model/Logger";
import Note from "@bundle:ohos.samples.distributednote/entry/ets/model/Note";
import { NoteDataSource } from "@bundle:ohos.samples.distributednote/entry/ets/common/BasicDataSource";
import NoteItem from "@bundle:ohos.samples.distributednote/entry/ets/common/NoteItem";
import RemoteDeviceModel from "@bundle:ohos.samples.distributednote/entry/ets/model/RemoteDeviceModel";
const TAG: string = 'Sample_IndexNote';
export class IndexNote extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dialogController = undefined;
        this.selectedIndex = 0;
        this.sessionId = '';
        this.__globalSessionId = this.createStorageLink('sessionId', '', "globalSessionId");
        this.__globalObject = this.createStorageLink('objectModel', new DistributedObjectModel(), "globalObject");
        this.__devices = new ObservedPropertyObjectPU([], this, "devices");
        this.__isOnline = new ObservedPropertySimplePU(false, this, "isOnline");
        this.__notes = new ObservedPropertyObjectPU([], this, "notes");
        this.noteDataSource = new NoteDataSource();
        this.nmsl = 0;
        this.onSelectedDevice = (selectedIndex: number) => {
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
            });
            Logger.info(TAG, 'start ability2 ......');
            this.clearSelectState();
        };
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: IndexNote_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.sessionId !== undefined) {
            this.sessionId = params.sessionId;
        }
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
        if (params.isOnline !== undefined) {
            this.isOnline = params.isOnline;
        }
        if (params.notes !== undefined) {
            this.notes = params.notes;
        }
        if (params.noteDataSource !== undefined) {
            this.noteDataSource = params.noteDataSource;
        }
        if (params.nmsl !== undefined) {
            this.nmsl = params.nmsl;
        }
        if (params.onSelectedDevice !== undefined) {
            this.onSelectedDevice = params.onSelectedDevice;
        }
    }
    updateStateVars(params: IndexNote_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__globalSessionId.purgeDependencyOnElmtId(rmElmtId);
        this.__globalObject.purgeDependencyOnElmtId(rmElmtId);
        this.__devices.purgeDependencyOnElmtId(rmElmtId);
        this.__isOnline.purgeDependencyOnElmtId(rmElmtId);
        this.__notes.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__globalSessionId.aboutToBeDeleted();
        this.__globalObject.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
        this.__isOnline.aboutToBeDeleted();
        this.__notes.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dialogController?: CustomDialogController;
    private selectedIndex: number;
    private sessionId: string;
    private __globalSessionId: ObservedPropertyAbstractPU<string>;
    get globalSessionId() {
        return this.__globalSessionId.get();
    }
    set globalSessionId(newValue: string) {
        this.__globalSessionId.set(newValue);
    }
    private __globalObject: ObservedPropertyAbstractPU<DistributedObjectModel>;
    get globalObject() {
        return this.__globalObject.get();
    }
    set globalObject(newValue: DistributedObjectModel) {
        this.__globalObject.set(newValue);
    }
    private __devices: ObservedPropertyObjectPU<Array<deviceManager.DeviceBasicInfo>>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: Array<deviceManager.DeviceBasicInfo>) {
        this.__devices.set(newValue);
    }
    private __isOnline: ObservedPropertySimplePU<boolean>;
    get isOnline() {
        return this.__isOnline.get();
    }
    set isOnline(newValue: boolean) {
        this.__isOnline.set(newValue);
    }
    private __notes: ObservedPropertyObjectPU<Array<Note>>;
    get notes() {
        return this.__notes.get();
    }
    set notes(newValue: Array<Note>) {
        this.__notes.set(newValue);
    }
    private noteDataSource: NoteDataSource;
    private nmsl: number;
    test() {
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
        this.noteDataSource.dataArray = this.globalObject.distributedObject.documents;
        this.noteDataSource.notifyDataReload();
        Logger.info(TAG, `this.sessionId = ${this.sessionId}`);
        Logger.info(TAG, `globalSessionId = ${this.globalSessionId}`);
        if (this.sessionId !== this.globalSessionId) {
            this.sessionId = this.globalSessionId;
            this.share();
        }
    }
    share() {
        Logger.info(TAG, `sessionId = ${this.sessionId}`);
        this.globalObject.setChangeCallback(() => {
            this.noteDataSource.dataArray = this.globalObject.distributedObject.documents;
            this.noteDataSource.notifyDataReload();
        });
        this.globalObject.setStatusCallback((session, networkId, status) => {
            Logger.info(TAG, `StatusCallback,${status}`);
            if (status === 'online') {
                this.isOnline = true;
            }
            else {
                this.isOnline = false;
            }
        });
        this.globalObject.distributedObject.setSessionId(this.sessionId);
        AppStorage.SetOrCreate('objectModel', this.globalObject);
    }
    clearSelectState() {
        this.devices = [];
        this.dialogController?.close();
        this.dialogController = undefined;
    }
    private onSelectedDevice;
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
            bundleName: BUNDLE,
            abilityName: ABILITY,
            deviceId: deviceId,
            parameters: {
                sessionId: this.sessionId,
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/IndexNote.ets(130:5)");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/IndexNote.ets(131:7)");
            Row.width('100%');
            Row.height('5%');
            Row.constraintSize({ minHeight: 70 });
            Row.padding({ left: 10, right: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/IndexNote.ets(132:9)");
            Column.width('33%');
            Column.padding({ left: 10 });
            Column.margin({ top: 10 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的书籍');
            Text.debugLine("entry/src/main/ets/pages/IndexNote.ets(133:11)");
            Text.fontWeight(FontWeight.Bold);
            Text.height(35);
            Text.fontSize(18);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/IndexNote.ets(143:9)");
            Column.width('34%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.isOnline ? { "id": 16777300, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" } : { "id": 16777255, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/IndexNote.ets(144:11)");
            Image.size({ width: 30, height: 30 });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/IndexNote.ets(149:9)");
            Column.width('33%');
            Column.padding({ right: 10 });
            Column.margin({ top: 10 });
            Column.onClick(() => {
                RemoteDeviceModel.registerDeviceListCallback(() => {
                    Logger.info(TAG, 'registerDeviceListCallback, callback entered');
                    this.devices = [];
                    this.devices = RemoteDeviceModel.discoverDevices.length > 0 ? RemoteDeviceModel.discoverDevices : RemoteDeviceModel.devices;
                    if (this.dialogController) {
                        this.dialogController.close();
                        this.dialogController = undefined;
                    }
                    this.dialogController = new CustomDialogController({
                        builder: () => {
                            let paramsLambda = () => {
                                return {
                                    devices: this.devices,
                                    onSelectedIndexChange: this.onSelectedDevice
                                };
                            };
                            let jsDialog = new DeviceDialog(this, {
                                devices: this.devices,
                                onSelectedIndexChange: this.onSelectedDevice
                            }, undefined, -1, paramsLambda);
                            jsDialog.setController(this.dialogController);
                            ViewPU.create(jsDialog);
                        },
                        autoCancel: true
                    }, this);
                    this.dialogController.open();
                });
            });
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('发现设备');
            Text.debugLine("entry/src/main/ets/pages/IndexNote.ets(150:11)");
            Text.fontWeight(FontWeight.Bold);
            Text.height(35);
            Text.fontSize(18);
            Text.fontColor(Color.Blue);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/IndexNote.ets(184:7)");
            Divider.color(Color.Black);
            Divider.margin({ left: 20, right: 20 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /* Row() {
               Text($r('app.string.state'))
                 .fontSize(30)
               Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
                 .size({ width: 30, height: 30 })
                 .objectFit(ImageFit.Contain)
             }
             .width('100%')
             .padding(16)*/
            List.create({ space: 10 });
            List.debugLine("entry/src/main/ets/pages/IndexNote.ets(198:7)");
            /* Row() {
               Text($r('app.string.state'))
                 .fontSize(30)
               Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
                 .size({ width: 30, height: 30 })
                 .objectFit(ImageFit.Contain)
             }
             .width('100%')
             .padding(16)*/
            List.width('95%');
            /* Row() {
               Text($r('app.string.state'))
                 .fontSize(30)
               Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
                 .size({ width: 30, height: 30 })
                 .objectFit(ImageFit.Contain)
             }
             .width('100%')
             .padding(16)*/
            List.margin(10);
            /* Row() {
               Text($r('app.string.state'))
                 .fontSize(30)
               Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
                 .size({ width: 30, height: 30 })
                 .objectFit(ImageFit.Contain)
             }
             .width('100%')
             .padding(16)*/
            List.layoutWeight(1);
            /* Row() {
               Text($r('app.string.state'))
                 .fontSize(30)
               Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
                 .size({ width: 30, height: 30 })
                 .objectFit(ImageFit.Contain)
             }
             .width('100%')
             .padding(16)*/
            List.onClick(() => this.test());
        }, List);
        {
            const __lazyForEachItemGenFunction = (_item, index) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(() => { }, false);
                        ListItem.debugLine("entry/src/main/ets/pages/IndexNote.ets(200:11)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            __Common__.create();
                            __Common__.id(`${item.title}`);
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let paramsLambda = () => {
                                        return {
                                            note: item,
                                            index: index
                                        };
                                    };
                                    ViewPU.create(new NoteItem(this, { note: item, index: index }, undefined, elmtId, paramsLambda));
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, null);
                        }
                        __Common__.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: Note) => JSON.stringify(item);
            LazyForEach.create("1", this, this.noteDataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        /* Row() {
           Text($r('app.string.state'))
             .fontSize(30)
           Image(this.isOnline ? $r('app.media.green') : $r('app.media.red'))
             .size({ width: 30, height: 30 })
             .objectFit(ImageFit.Contain)
         }
         .width('100%')
         .padding(16)*/
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/IndexNote.ets(211:7)");
            Row.width('100%');
            Row.padding(10);
            Row.backgroundColor('#F0F0F0');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/IndexNote.ets(212:9)");
            Column.layoutWeight(1);
            Column.id('clearNote');
            Column.onClick(() => {
                Logger.info(TAG, 'clear notes');
                this.noteDataSource.dataArray = [];
                this.noteDataSource.notifyDataReload();
                this.globalObject.clear();
                AppStorage.SetOrCreate('sessionId', this.sessionId);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777311, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/IndexNote.ets(213:11)");
            Image.size({ width: 40, height: 40 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777263, "type": 10003, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/IndexNote.ets(215:11)");
            Text.fontColor(Color.Red);
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/IndexNote.ets(228:9)");
            Column.layoutWeight(1);
            Column.id('addNote');
            Column.onClick(() => {
                // clearInterval(this.nmsl);
                router.pushUrl({
                    url: 'pages/Edit',
                    params: {
                        note: new Note('', '', '', -1),
                        isAdd: true
                    }
                });
                // this.nmsl = setInterval(() => {
                //   console.log('do every 1s.');
                //    this.test();
                //  }, 1000);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777290, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/IndexNote.ets(229:11)");
            Image.size({ width: 40, height: 40 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777259, "type": 10003, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/IndexNote.ets(231:11)");
            Text.fontColor(Color.Black);
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new IndexNote(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
