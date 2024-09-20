interface SplashPage_Params {
    flag?: Boolean;
}
import router from "@ohos:router";
PersistentStorage.persistProp('token', ''); // 在 PersistentStorage 中注册登录 token
AppStorage.setOrCreate('currentTabIndex', 0); // 在 AppStorage 中注册 currentTabIndex
class SplashPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__flag = new ObservedPropertyObjectPU(false, this, "flag");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: SplashPage_Params) {
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
    }
    updateStateVars(params: SplashPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__flag.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__flag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __flag: ObservedPropertyObjectPU<Boolean>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: Boolean) {
        this.__flag.set(newValue);
    }
    onPageShow() {
        Context.animateTo({ duration: 1000, onFinish: () => {
                setTimeout(() => {
                    router.replaceUrl({ url: 'pages/Index' }); // 切换页面，且不能返回
                }, 200);
            } }, () => {
            this.flag = true;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/SplashPage.ets(22:5)");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundImage({ "id": 16777252, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Column.backgroundImageSize({ width: '100%', height: '100%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.flag) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777307, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/SplashPage.ets(24:9)");
                        __Image__logoStyle();
                        Image.transition({ type: TransitionType.Insert, opacity: 0, translate: { x: -150 } });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("开源鸿蒙阅读器demo");
                        Text.debugLine("entry/src/main/ets/pages/SplashPage.ets(27:9)");
                        __Text__titleStyle();
                        Text.transition({ type: TransitionType.Insert, opacity: 0, translate: { x: 150 } });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/SplashPage.ets(31:7)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("OpenHarmony Project");
            Text.debugLine("entry/src/main/ets/pages/SplashPage.ets(32:7)");
            __Text__footerStyle();
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Image__logoStyle(): void {
    Image.width(90);
    Image.height(90);
    Image.margin({ top: 120 });
}
function __Text__titleStyle(): void {
    Text.fontSize(21);
    Text.fontColor(Color.White);
    Text.fontWeight(FontWeight.Bold);
    Text.margin({ top: 15 });
}
function __Text__footerStyle(): void {
    Text.fontSize(12);
    Text.fontColor('#546B9D');
    Text.fontWeight(FontWeight.Bold);
    Text.margin({ bottom: 30 });
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new SplashPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
