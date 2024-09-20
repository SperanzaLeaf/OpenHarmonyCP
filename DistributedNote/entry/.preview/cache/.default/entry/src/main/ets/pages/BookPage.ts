interface BookPage_Params {
    titleList?: Array<string>;
    urlList?: Array<string>;
    globalCanvasObject?: DistributedCanvasModel;
    globalObject?: DistributedObjectModel;
}
import router from "@ohos:router";
import DistributedObjectModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedObjectModel";
import DistributedCanvasModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedCanvasModel";
export class BookPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__titleList = new ObservedPropertyObjectPU(['热门书籍', '分布式阅读'], this, "titleList");
        this.__urlList = new ObservedPropertyObjectPU(['pages/IndexCanvas', 'pages/IndexNote'], this, "urlList");
        this.__globalCanvasObject = this.createStorageLink('canvasModel', new DistributedCanvasModel(), "globalCanvasObject");
        this.__globalObject = this.createStorageLink('objectModel', new DistributedObjectModel(), "globalObject");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: BookPage_Params) {
        if (params.titleList !== undefined) {
            this.titleList = params.titleList;
        }
        if (params.urlList !== undefined) {
            this.urlList = params.urlList;
        }
    }
    updateStateVars(params: BookPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__titleList.purgeDependencyOnElmtId(rmElmtId);
        this.__urlList.purgeDependencyOnElmtId(rmElmtId);
        this.__globalCanvasObject.purgeDependencyOnElmtId(rmElmtId);
        this.__globalObject.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__titleList.aboutToBeDeleted();
        this.__urlList.aboutToBeDeleted();
        this.__globalCanvasObject.aboutToBeDeleted();
        this.__globalObject.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __titleList: ObservedPropertyObjectPU<Array<string>>;
    get titleList() {
        return this.__titleList.get();
    }
    set titleList(newValue: Array<string>) {
        this.__titleList.set(newValue);
    }
    private __urlList: ObservedPropertyObjectPU<Array<string>>;
    get urlList() {
        return this.__urlList.get();
    }
    set urlList(newValue: Array<string>) {
        this.__urlList.set(newValue);
    }
    private __globalCanvasObject?: ObservedPropertyAbstractPU<DistributedCanvasModel>;
    get globalCanvasObject() {
        return this.__globalCanvasObject.get();
    }
    set globalCanvasObject(newValue: DistributedCanvasModel) {
        this.__globalCanvasObject.set(newValue);
    }
    private __globalObject?: ObservedPropertyAbstractPU<DistributedObjectModel>;
    get globalObject() {
        return this.__globalObject.get();
    }
    set globalObject(newValue: DistributedObjectModel) {
        this.__globalObject.set(newValue);
    }
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/BookPage.ets(41:5)");
            Column.width('100%');
            Column.height('100%');
            Column.padding({ left: '5%', right: '5%' });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BookPage.ets(42:7)");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777313, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/BookPage.ets(43:9)");
            Image.width('100%');
            Image.height(300);
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/BookPage.ets(47:7)");
            Row.width('100%');
            Row.height(233);
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("分布式阅读");
            Button.debugLine("entry/src/main/ets/pages/BookPage.ets(48:9)");
            Button.onClick(() => {
                router.pushUrl({
                    url: this.urlList[1],
                });
            });
            Button.width('50%');
            Button.height(100);
            Button.fontSize(25);
            Button.shadow({ radius: 40, color: Color.Yellow, offsetX: 0, offsetY: 0 });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "BookPage", new BookPage(undefined, {}));
    previewComponent();
}
else {
}
