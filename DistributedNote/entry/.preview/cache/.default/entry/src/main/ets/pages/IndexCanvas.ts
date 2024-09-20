interface IndexCanvas_Params {
    path2Df?: Path2D;
    path2De?: Path2D;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    settings1?: RenderingContextSettings;
    context1?: CanvasRenderingContext2D;
    dialogController?: CustomDialogController;
    selectedIndex?: number;
    sessionId?: string;
    globalSessionId?: string;
    globalObject?: DistributedCanvasModel;
    globalIsOnline?: boolean;
    devices?: Array<deviceManager.DeviceBasicInfo>;
    canvasDataSource?: CanvasDataSource;
    showDialog?;
    onSelectedDevice?;
}
import router from "@ohos:router";
import type deviceManager from "@ohos:distributedDeviceManager";
import type common from "@ohos:app.ability.common";
import { BUNDLE, ABILITY } from "@bundle:ohos.samples.distributednote/entry/ets/model/Const";
import DistributedCanvasModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedCanvasModel";
import Logger from "@bundle:ohos.samples.distributednote/entry/ets/model/Logger";
import type CanvasPath from '../model/Canvas';
import RemoteDeviceModel from "@bundle:ohos.samples.distributednote/entry/ets/model/RemoteDeviceModel";
import { CanvasDataSource } from "@bundle:ohos.samples.distributednote/entry/ets/common/BasicDataSource";
import DeviceDialog from "@bundle:ohos.samples.distributednote/entry/ets/common/DeviceDialog";
import TitleBar from "@bundle:ohos.samples.distributednote/entry/ets/common/TitleBar";
const TAG: string = 'Sample_IndexCanvas';
class IndexCanvas extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.path2Df = new Path2D();
        this.path2De = new Path2D();
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.settings1 = new RenderingContextSettings(true);
        this.context1 = new CanvasRenderingContext2D(this.settings1);
        this.dialogController = undefined;
        this.selectedIndex = 0;
        this.sessionId = '';
        this.__globalSessionId = this.createStorageLink('sessionId', '', "globalSessionId");
        this.__globalObject = this.createStorageLink('canvasModel', new DistributedCanvasModel(), "globalObject");
        this.__globalIsOnline = this.createStorageLink('isOnline', false, "globalIsOnline");
        this.__devices = new ObservedPropertyObjectPU([], this, "devices");
        this.canvasDataSource = new CanvasDataSource();
        this.showDialog = () => {
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
        };
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
    setInitiallyProvidedValue(params: IndexCanvas_Params) {
        if (params.path2Df !== undefined) {
            this.path2Df = params.path2Df;
        }
        if (params.path2De !== undefined) {
            this.path2De = params.path2De;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.settings1 !== undefined) {
            this.settings1 = params.settings1;
        }
        if (params.context1 !== undefined) {
            this.context1 = params.context1;
        }
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
        if (params.canvasDataSource !== undefined) {
            this.canvasDataSource = params.canvasDataSource;
        }
        if (params.showDialog !== undefined) {
            this.showDialog = params.showDialog;
        }
        if (params.onSelectedDevice !== undefined) {
            this.onSelectedDevice = params.onSelectedDevice;
        }
    }
    updateStateVars(params: IndexCanvas_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__globalSessionId.purgeDependencyOnElmtId(rmElmtId);
        this.__globalObject.purgeDependencyOnElmtId(rmElmtId);
        this.__globalIsOnline.purgeDependencyOnElmtId(rmElmtId);
        this.__devices.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__globalSessionId.aboutToBeDeleted();
        this.__globalObject.aboutToBeDeleted();
        this.__globalIsOnline.aboutToBeDeleted();
        this.__devices.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private path2Df: Path2D;
    private path2De: Path2D;
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private settings1: RenderingContextSettings;
    private context1: CanvasRenderingContext2D;
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
    private __globalObject: ObservedPropertyAbstractPU<DistributedCanvasModel>;
    get globalObject() {
        return this.__globalObject.get();
    }
    set globalObject(newValue: DistributedCanvasModel) {
        this.__globalObject.set(newValue);
    }
    private __globalIsOnline: ObservedPropertyAbstractPU<boolean>;
    get globalIsOnline() {
        return this.__globalIsOnline.get();
    }
    set globalIsOnline(newValue: boolean) {
        this.__globalIsOnline.set(newValue);
    }
    private __devices: ObservedPropertyObjectPU<Array<deviceManager.DeviceBasicInfo>>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: Array<deviceManager.DeviceBasicInfo>) {
        this.__devices.set(newValue);
    }
    private canvasDataSource: CanvasDataSource;
    onPageShow() {
        this.canvasDataSource.pathArray = this.globalObject.distributedCanvas.pathArray;
        this.canvasDataSource.notifyDataReload();
        Logger.info(TAG, `this.sessionId = ${this.sessionId}`);
        Logger.info(TAG, `globalSessionId = ${this.globalSessionId}`);
        if (this.sessionId !== this.globalSessionId) {
            this.sessionId = this.globalSessionId;
            this.share();
        }
    }
    private showDialog;
    share() {
        Logger.info(TAG, `sessionId = ${this.sessionId}`);
        this.globalObject.setChangeCallback(() => {
            this.canvasDataSource.pathArray = this.globalObject.distributedCanvas.pathArray;
            this.canvasDataSource.notifyDataReload();
        });
        this.globalObject.setStatusCallback((session, networkId, status) => {
            Logger.info(TAG, `StatusCallback,${status}`);
            if (status === 'online') {
                this.globalIsOnline = true;
            }
            else {
                this.globalIsOnline = false;
            }
        });
        this.globalObject.distributedCanvas.setSessionId(this.sessionId);
        AppStorage.SetOrCreate('canvasModel', this.globalObject);
        AppStorage.SetOrCreate('isOnline', this.globalIsOnline);
    }
    clearSelectState() {
        this.devices = [];
        this.dialogController?.close();
        this.dialogController = undefined;
    }
    private onSelectedDevice;
    startAbility(deviceId: string) {
        this.globalObject = new DistributedCanvasModel();
        this.sessionId = this.globalObject.genSessionId();
        AppStorage.SetOrCreate('sessionId', this.sessionId);
        this.canvasDataSource.pathArray = [];
        this.canvasDataSource.notifyDataReload();
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
            Column.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(143:5)");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let paramsLambda = () => {
                        return {
                            rightBtn: "发现设备",
                            onRightBtnClicked: this.showDialog
                        };
                    };
                    ViewPU.create(new TitleBar(this, { rightBtn: "发现设备", onRightBtnClicked: this.showDialog }, undefined, elmtId, paramsLambda));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, null);
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(145:7)");
            Row.width('100%');
            Row.padding(16);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777266, "type": 10003, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(146:9)");
            Text.fontSize(30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.globalIsOnline ? { "id": 16777300, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" } : { "id": 16777255, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(148:9)");
            Image.size({ width: 30, height: 30 });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(155:7)");
        }, List);
        {
            const __lazyForEachItemGenFunction = (_item, index) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(() => { }, false);
                        ListItem.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(157:11)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index === 0) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    if (!If.canRetake(item.path + 'ready')) {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Canvas.create(this.context);
                                            Canvas.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(159:15)");
                                            Canvas.width('100%');
                                            Canvas.height(200);
                                            Canvas.backgroundColor('#00ffff');
                                            Canvas.onReady(() => {
                                                if (item.path === 'rect') {
                                                    this.context.save();
                                                    this.path2Df.rect(80, 80, 100, 100);
                                                    this.context.stroke(this.path2Df);
                                                    this.context.restore();
                                                }
                                                if (item.path === 'ellipse') {
                                                    this.context.restore();
                                                    this.path2De.ellipse(100, 100, 50, 100, Math.PI * 0.25, Math.PI * 0.5, Math.PI);
                                                    this.path2De.closePath();
                                                    this.context.stroke(this.path2De);
                                                    this.context.save();
                                                }
                                            });
                                            Canvas.id(item.path + 'ready');
                                        }, Canvas);
                                        Canvas.pop();
                                    }
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(() => { }, false);
                        ListItem.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(181:11)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (index === 1) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    if (!If.canRetake(item.path + 'ready')) {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Canvas.create(this.context1);
                                            Canvas.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(183:15)");
                                            Canvas.width('100%');
                                            Canvas.height(200);
                                            Canvas.backgroundColor('#00ffff');
                                            Canvas.onReady(() => {
                                                if (item.path === 'rect') {
                                                    this.context1.save();
                                                    this.path2Df.rect(80, 80, 100, 100);
                                                    this.context1.stroke(this.path2Df);
                                                    this.context1.restore();
                                                }
                                                if (item.path === 'ellipse') {
                                                    this.context1.restore();
                                                    this.path2De.ellipse(100, 100, 50, 100, Math.PI * 0.25, Math.PI * 0.5, Math.PI);
                                                    this.path2De.closePath();
                                                    this.context1.stroke(this.path2De);
                                                    this.context1.save();
                                                }
                                            });
                                            Canvas.id(item.path + 'ready');
                                        }, Canvas);
                                        Canvas.pop();
                                    }
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: CanvasPath) => JSON.stringify(item);
            LazyForEach.create("1", this, this.canvasDataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(208:7)");
            Row.margin({ top: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('ellipse');
            Button.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(209:9)");
            Button.width(130);
            Button.height(45);
            Button.key('ellipse');
            Button.onClick(() => {
                if (this.globalObject.isContainString('ellipse') === -1) {
                    this.globalObject.add('ellipse');
                }
                this.onPageShow();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('rect');
            Button.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(219:9)");
            Button.width(130);
            Button.height(45);
            Button.key('rect');
            Button.onClick(() => {
                if (this.globalObject.isContainString('rect') === -1) {
                    this.globalObject.add('rect');
                }
                this.onPageShow();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(233:7)");
            Row.margin({ top: 10 });
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('back');
            Button.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(234:9)");
            Button.width(130);
            Button.height(45);
            Button.key('back');
            Button.backgroundColor(Color.Orange);
            Button.onClick(() => {
                this.globalObject.clear();
                this.canvasDataSource.pathArray = [];
                this.canvasDataSource.notifyDataReload();
                this.context.clearRect(0, 0, 950, 950);
                router.back();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('delete');
            Button.debugLine("entry/src/main/ets/pages/IndexCanvas.ets(246:9)");
            Button.width(130);
            Button.height(45);
            Button.key('delete');
            Button.onClick(() => {
                this.globalObject.clear();
                this.canvasDataSource.pathArray = [];
                this.canvasDataSource.notifyDataReload();
                this.context.clearRect(0, 0, 950, 950);
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new IndexCanvas(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
