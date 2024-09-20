interface Index_Params {
    currentTabIndex?: number;
    titleList?: Array<string>;
    urlList?: Array<string>;
    globalCanvasObject?: DistributedCanvasModel;
    globalObject?: DistributedObjectModel;
}
import { MinePage } from "@bundle:ohos.samples.distributednote/entry/ets/pages/MinePage";
import { UniversityInfoPage } from "@bundle:ohos.samples.distributednote/entry/ets/pages/UniversityInfoPage";
import { CalendarPage } from "@bundle:ohos.samples.distributednote/entry/ets/pages/CalendarPage";
import { IndexNote } from "@bundle:ohos.samples.distributednote/entry/ets/pages/IndexNote";
import DistributedObjectModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedObjectModel";
import DistributedCanvasModel from "@bundle:ohos.samples.distributednote/entry/ets/model/DistributedCanvasModel";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTabIndex = this.createStorageLink('currentTabIndex', 0, "currentTabIndex");
        this.__titleList = new ObservedPropertyObjectPU(['热门书籍', '我的书籍'], this, "titleList");
        this.__urlList = new ObservedPropertyObjectPU(['pages/IndexCanvas', 'pages/IndexNote'], this, "urlList");
        this.__globalCanvasObject = this.createStorageLink('canvasModel', new DistributedCanvasModel(), "globalCanvasObject");
        this.__globalObject = this.createStorageLink('objectModel', new DistributedObjectModel(), "globalObject");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.titleList !== undefined) {
            this.titleList = params.titleList;
        }
        if (params.urlList !== undefined) {
            this.urlList = params.urlList;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__titleList.purgeDependencyOnElmtId(rmElmtId);
        this.__urlList.purgeDependencyOnElmtId(rmElmtId);
        this.__globalCanvasObject.purgeDependencyOnElmtId(rmElmtId);
        this.__globalObject.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTabIndex.aboutToBeDeleted();
        this.__titleList.aboutToBeDeleted();
        this.__urlList.aboutToBeDeleted();
        this.__globalCanvasObject.aboutToBeDeleted();
        this.__globalObject.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTabIndex: ObservedPropertyAbstractPU<number>; // 被选中的页签索引
    get currentTabIndex() {
        return this.__currentTabIndex.get();
    }
    set currentTabIndex(newValue: number) {
        this.__currentTabIndex.set(newValue);
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
    // onPageShow(): void {
    //   this.globalCanvasObject = AppStorage.Get('canvasModel');
    //   this.globalCanvasObject?.distributedCanvas.setSessionId(() => {
    //     console.info('leave canvas lession.');
    //   });
    //   this.globalObject = AppStorage.Get('objectModel');
    //   this.globalObject?.distributedObject.setSessionId(() => {
    //     console.info('leave note lession.');
    //   });
    // } /fafafafafafafafaf
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ index: this.currentTabIndex });
            Tabs.debugLine("entry/src/main/ets/pages/Index.ets(33:5)");
            Tabs.barPosition(BarPosition.End);
            Tabs.onChange((index) => {
                this.currentTabIndex = index;
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {};
                            };
                            ViewPU.create(new IndexNote(this, {}, undefined, elmtId, paramsLambda));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, null);
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.barBuilder.call(this, 0, '阅读', { "id": 16777254, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, { "id": 16777270, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(34:7)");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {};
                            };
                            ViewPU.create(new UniversityInfoPage(this, {}, undefined, elmtId, paramsLambda));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, null);
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.barBuilder.call(this, 1, '推荐', { "id": 16777233, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, { "id": 16777219, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(40:7)");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {};
                            };
                            ViewPU.create(new CalendarPage(this, {}, undefined, elmtId, paramsLambda));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, null);
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.barBuilder.call(this, 2, '计划', { "id": 16777254, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, { "id": 16777270, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(44:7)");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let paramsLambda = () => {
                                return {};
                            };
                            ViewPU.create(new MinePage(this, {}, undefined, elmtId, paramsLambda));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, null);
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.barBuilder.call(this, 3, '我的', { "id": 16777235, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, { "id": 16777230, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(48:7)");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
    }
    // 自定义页签结构，根据被选中的页签索引决定每一个页签的样式
    barBuilder(index: number, title: string, icon: Resource, iconSelected: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(61:5)");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentTabIndex === index ? iconSelected : icon);
            Image.debugLine("entry/src/main/ets/pages/Index.ets(62:7)");
            Image.width(25);
            Image.height(25);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(65:7)");
            __Text__tabTitleStyle(this.currentTabIndex === index ? Color.Black : '#959595');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Text__tabTitleStyle(color: ResourceColor): void {
    Text.fontSize(10);
    Text.fontWeight(FontWeight.Medium);
    Text.fontColor(color);
    Text.margin({ bottom: 2 });
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Index(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
