interface TitleBar_Params {
    title?: string | Resource;
    rightBtn?: string;
    onRightBtnClicked?: () => void;
    hasBackPress?: boolean;
}
export default class TitleBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = { "id": 16777258, "type": 10003, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" };
        this.rightBtn = undefined;
        this.onRightBtnClicked = undefined;
        this.hasBackPress = false;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: TitleBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.rightBtn !== undefined) {
            this.rightBtn = params.rightBtn;
        }
        if (params.onRightBtnClicked !== undefined) {
            this.onRightBtnClicked = params.onRightBtnClicked;
        }
        if (params.hasBackPress !== undefined) {
            this.hasBackPress = params.hasBackPress;
        }
    }
    updateStateVars(params: TitleBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string | Resource;
    private rightBtn?: string;
    private onRightBtnClicked?: () => void;
    private hasBackPress: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/common/TitleBar.ets(25:5)");
        }, Column);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
