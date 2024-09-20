interface MinePage_Params {
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
export class MinePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: MinePage_Params) {
    }
    updateStateVars(params: MinePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // @StorageLink('token') @Watch('onTokenChange') token: string = ''
    // @State userInfo: {
    //   nickname?: string,
    //   avatarUrl?: string
    // } = {};
    //
    // async onTokenChange() {
    //   if (this.token) {
    //     let response = await info()
    //     this.userInfo = response.data.data;
    //   } else {
    //     this.userInfo = {}
    //   }
    // }
    //
    // async aboutToAppear() {
    //   if (this.token) {
    //     let response = await info()
    //     this.userInfo = response.data.data;
    //   }
    // }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/pages/MinePage.ets(30:5)");
            Stack.width('100%');
            Stack.height('100%');
            Stack.alignContent(Alignment.Top);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(31:7)");
            Column.width('100%');
            Column.height('50%');
            Column.backgroundImage({ "id": 16777220, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Column.backgroundImageSize({ height: '100%', width: '100%' });
            Column.backgroundBlurStyle(BlurStyle.Regular);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Image(this.token ? this.userInfo.avatarUrl : $r('app.media.img_avatar'))
            Image.create({ "id": 16777220, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/MinePage.ets(33:9)");
            // Image(this.token ? this.userInfo.avatarUrl : $r('app.media.img_avatar'))
            Image.width(100);
            // Image(this.token ? this.userInfo.avatarUrl : $r('app.media.img_avatar'))
            Image.height(100);
            // Image(this.token ? this.userInfo.avatarUrl : $r('app.media.img_avatar'))
            Image.borderRadius(50);
            // Image(this.token ? this.userInfo.avatarUrl : $r('app.media.img_avatar'))
            Image.margin({ top: 120 });
            // Image(this.token ? this.userInfo.avatarUrl : $r('app.media.img_avatar'))
            Image.onClick(() => {
                router.pushUrl({ url: 'pages/LoginPage' });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Text(this.token ? this.userInfo.nickname : '暂未登录')
            Text.create('暂未登录');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(43:9)");
            // Text(this.token ? this.userInfo.nickname : '暂未登录')
            Text.fontSize(18);
            // Text(this.token ? this.userInfo.nickname : '暂未登录')
            Text.fontWeight(FontWeight.Bold);
            // Text(this.token ? this.userInfo.nickname : '暂未登录')
            Text.fontColor(Color.Black);
            // Text(this.token ? this.userInfo.nickname : '暂未登录')
            Text.margin({ top: 20 });
        }, Text);
        // Text(this.token ? this.userInfo.nickname : '暂未登录')
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // if (!this.token) {
            Text.create('请点击头像登录');
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(50:11)");
            // if (!this.token) {
            Text.fontSize(12);
            // if (!this.token) {
            Text.fontWeight(FontWeight.Medium);
            // if (!this.token) {
            Text.fontColor(Color.Black);
            // if (!this.token) {
            Text.margin({ top: 4 });
        }, Text);
        // if (!this.token) {
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.debugLine("entry/src/main/ets/pages/MinePage.ets(64:7)");
            Column.width('100%');
            Column.height('60%');
            Column.offset({ y: '40%' });
            Column.borderRadius({ topLeft: 50, topRight: 50 });
            Column.backgroundColor(Color.White);
            Column.padding(30);
        }, Column);
        this.mineItemBuilder.bind(this)({ "id": 16777293, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, '阅读记录', () => {
            // if (this.token) {
            //   router.pushUrl({ url: 'pages/PostHistoryPage' })
            // } else {
            //   promptAction.showToast({ message: '请先点击头像登录' })
            // }
            promptAction.showToast({ message: '请先点击头像登录' });
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/MinePage.ets(73:9)");
        }, Divider);
        this.mineItemBuilder.bind(this)({ "id": 16777226, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, '检查更新', () => {
            promptAction.showToast({ message: '已是最新' });
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/MinePage.ets(77:9)");
        }, Divider);
        this.mineItemBuilder.bind(this)({ "id": 16777243, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" }, '关于', () => {
            promptAction.showToast({ message: '没有关于' });
        });
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/MinePage.ets(82:9)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // if (this.token) {
            Button.createWithLabel('退出登录');
            Button.debugLine("entry/src/main/ets/pages/MinePage.ets(85:11)");
            // if (this.token) {
            Button.width('100%');
            // if (this.token) {
            Button.fontSize(18);
            // if (this.token) {
            Button.backgroundColor(Color.Gray);
            // if (this.token) {
            Button.fontColor(Color.White);
        }, Button);
        // if (this.token) {
        Button.pop();
        Column.pop();
        Stack.pop();
    }
    mineItemBuilder(icon: Resource, title: string, callback?: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 10 });
            Row.debugLine("entry/src/main/ets/pages/MinePage.ets(110:5)");
            Row.width('100%');
            Row.height(40);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("entry/src/main/ets/pages/MinePage.ets(111:7)");
            Image.width(24);
            Image.height(24);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.debugLine("entry/src/main/ets/pages/MinePage.ets(114:7)");
            Text.fontSize(16);
            Text.height(24);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/MinePage.ets(118:7)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777301, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/MinePage.ets(119:7)");
            Image.width(24);
            Image.height(24);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
