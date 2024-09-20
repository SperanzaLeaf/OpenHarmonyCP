interface DeviceDialog_Params {
    controller?: CustomDialogController;
    onSelectedIndexChange?: (selectedIndex: number) => void;
    devices?: Array<deviceManager.DeviceBasicInfo>;
}
import type deviceManager from "@ohos:distributedDeviceManager";
export default class DeviceDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.onSelectedIndexChange = undefined;
        this.devices = [];
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: DeviceDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onSelectedIndexChange !== undefined) {
            this.onSelectedIndexChange = params.onSelectedIndexChange;
        }
        if (params.devices !== undefined) {
            this.devices = params.devices;
        }
    }
    updateStateVars(params: DeviceDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onSelectedIndexChange?: (selectedIndex: number) => void;
    private devices: Array<deviceManager.DeviceBasicInfo>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/common/DeviceDialog.ets(24:5)");
            Column.backgroundColor(Color.White);
            Column.border({ color: Color.White, radius: 20 });
            Column.padding(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777262, "type": 10003, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/common/DeviceDialog.ets(25:7)");
            Text.fontSize(20);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/common/DeviceDialog.ets(31:7)");
            List.width('80%');
            List.height(150);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number | undefined) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/common/DeviceDialog.ets(33:11)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/common/DeviceDialog.ets(34:13)");
                            Row.height(80);
                            Row.onClick(() => {
                                this.onSelectedIndexChange!(index);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.deviceName);
                            Text.debugLine("entry/src/main/ets/common/DeviceDialog.ets(35:15)");
                            Text.fontSize(20);
                            Text.width('90%');
                            Text.fontColor(Color.Black);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777283, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                            Image.debugLine("entry/src/main/ets/common/DeviceDialog.ets(40:15)");
                            Image.width('8%');
                            Image.objectFit(ImageFit.Contain);
                        }, Image);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation(itemCreation);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.devices, forEachItemGenFunction, (item: deviceManager.DeviceBasicInfo) => item.deviceName, true, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/common/DeviceDialog.ets(54:7)");
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(Color.White);
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.controller!.close();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/common/DeviceDialog.ets(55:9)");
            Text.fontColor('#0D9FFB');
            Text.width('90%');
            Text.textAlign(TextAlign.Center);
            Text.fontSize(20);
        }, Text);
        Text.pop();
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
