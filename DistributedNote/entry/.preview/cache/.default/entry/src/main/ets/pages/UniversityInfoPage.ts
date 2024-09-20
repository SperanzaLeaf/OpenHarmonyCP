interface UniversityInfoItem_Params {
    universityInfo?: UniversityInfo;
}
interface UniversityInfoPage_Params {
    universityInfoList?: UniversityInfo[];
    scroller?: Scroller;
}
import promptAction from "@ohos:promptAction";
import { universityInfoData } from "@bundle:ohos.samples.distributednote/entry/ets/model/UniversityInfo";
import type { UniversityInfo } from "@bundle:ohos.samples.distributednote/entry/ets/model/UniversityInfo";
export class UniversityInfoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__universityInfoList = new ObservedPropertyObjectPU(universityInfoData, this, "universityInfoList");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: UniversityInfoPage_Params) {
        if (params.universityInfoList !== undefined) {
            this.universityInfoList = params.universityInfoList;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: UniversityInfoPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__universityInfoList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__universityInfoList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __universityInfoList: ObservedPropertyObjectPU<UniversityInfo[]>;
    get universityInfoList() {
        return this.__universityInfoList.get();
    }
    set universityInfoList(newValue: UniversityInfo[]) {
        this.__universityInfoList.set(newValue);
    }
    private scroller: Scroller;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(12:5)");
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // header
            Text.create('近期热门');
            Text.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(14:7)");
            // header
            Text.fontSize(18);
            // header
            Text.margin({ top: 45 });
            // header
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        // header
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(18:7)");
            Divider.color(Color.Black);
            Divider.margin({ left: 20, right: 20, top: 10 });
        }, Divider);
        // 学校介绍
        this.listBuilder.bind(this)();
        Column.pop();
    }
    // 学校介绍列表页面布局
    listBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(31:5)");
            Stack.width('100%');
            Stack.layoutWeight(1);
            Stack.alignContent(Alignment.BottomEnd);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 打卡记录列表
            List.create({ scroller: this.scroller });
            List.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(33:7)");
            // 打卡记录列表
            List.width('100%');
            // 打卡记录列表
            List.height('100%');
            // 打卡记录列表
            List.alignListItem(ListItemAlign.Center);
            // 打卡记录列表
            List.onReachEnd(() => {
                promptAction.showToast({ message: '没有更多数据了' });
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const universityInfo = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(35:11)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let paramsLambda = () => {
                                        return {
                                            universityInfo: universityInfo
                                        };
                                    };
                                    ViewPU.create(new UniversityInfoItem(this, { universityInfo: universityInfo }, undefined, elmtId, paramsLambda));
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, null);
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation(itemCreation);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.universityInfoList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                ListItem.height(10);
                ListItem.selectable(false);
                ListItem.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(39:9)");
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                ListItem.pop();
            };
            this.observeComponentCreation(itemCreation);
            ListItem.pop();
        }
        // 打卡记录列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回顶部按钮和刷新按钮
            Column.create({ space: 20 });
            Column.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(48:7)");
            // 返回顶部按钮和刷新按钮
            Column.offset({ x: -20, y: -50 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(49:9)");
            Button.height(40);
            Button.width(40);
            Button.backgroundColor(Color.Black);
            Button.opacity(0.5);
            Button.onClick(() => {
                // 返回顶部
                this.scroller.scrollToIndex(0);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777299, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(50:11)");
            Image.height(14);
            Image.width(14);
        }, Image);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(63:9)");
            Button.height(40);
            Button.width(40);
            Button.backgroundColor(Color.Black);
            Button.opacity(0.5);
            Button.onClick(() => {
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777305, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(64:11)");
            Image.height(14);
            Image.width(14);
        }, Image);
        Button.pop();
        // 返回顶部按钮和刷新按钮
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class UniversityInfoItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.universityInfo = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: UniversityInfoItem_Params) {
        if (params.universityInfo !== undefined) {
            this.universityInfo = params.universityInfo;
        }
    }
    updateStateVars(params: UniversityInfoItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __universityInfo;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 13 });
            Row.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(91:5)");
            Row.alignItems(VerticalAlign.Top);
            Row.padding(10);
            Row.width('90%');
            Row.margin({ top: 10 });
            Row.borderRadius(10);
            Row.shadow({ radius: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 校徽
            Image.create(this.universityInfo.photoURL);
            Image.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(93:7)");
            // 校徽
            Image.width("15%");
            // 校徽
            Image.borderRadius(5);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 学校信息
            Column.create({ space: 0 });
            Column.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(98:7)");
            // 学校信息
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.universityInfo.nameCN);
            Text.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(99:9)");
            Text.height(30);
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("豆瓣排名：" + String(this.universityInfo.douban_rank));
            Text.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(103:9)");
            Text.height(20);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.universityInfo.country + " " + this.universityInfo.author);
            Text.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(108:9)");
            Text.height(20);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("简介：" + this.universityInfo.introduction);
            Text.debugLine("entry/src/main/ets/pages/UniversityInfoPage.ets(112:9)");
            Text.height(40);
            Text.width("80%");
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        // 学校信息
        Column.pop();
        Row.pop();
    } // build
    rerender() {
        this.updateDirtyElements();
    }
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(1, "UniversityInfoPage", new UniversityInfoPage(undefined, {}));
    previewComponent();
}
else {
}
