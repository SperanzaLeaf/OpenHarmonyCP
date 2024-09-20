interface Index_Params {
    res?: string;
    uri?: string;
    strProg?: string;
    progress?: number;
    fontSize?: number;
    maxOffset?: number;
    curOffset?: number;
    isLand?: boolean;
    result?: string;
    isDistributed?: boolean;
    isShow?: boolean;
    scroller?: Scroller;
}
import router from "@ohos:router";
import util from "@ohos:util";
import fs from "@ohos:file.fs";
import picker from "@ohos:file.picker";
const TAG: string = 'Index';
const EXIT: string = 'exit';
const DATA_CHANGE: string = 'dataChange';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__res = new ObservedPropertySimplePU((router.getParams() as Record<string, string>).aa, this, "res");
        this.__uri = new ObservedPropertySimplePU('uri', this, "uri");
        this.__strProg = new ObservedPropertySimplePU('0', this, "strProg");
        this.__progress = new ObservedPropertySimplePU(0, this, "progress");
        this.__fontSize = new ObservedPropertySimplePU(15 //初始字号
        , this, "fontSize");
        this.__maxOffset = new ObservedPropertySimplePU(0, this, "maxOffset");
        this.__curOffset = new ObservedPropertySimplePU(0, this, "curOffset");
        this.__isLand = new ObservedPropertySimplePU(false, this, "isLand");
        this.__result = new ObservedPropertySimplePU(''
        // @State @Watch('dataChange') expression: string = ''
        , this, "result");
        this.__isDistributed = new ObservedPropertySimplePU(false, this, "isDistributed");
        this.__isShow = new ObservedPropertySimplePU(false, this, "isShow");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.res !== undefined) {
            this.res = params.res;
        }
        if (params.uri !== undefined) {
            this.uri = params.uri;
        }
        if (params.strProg !== undefined) {
            this.strProg = params.strProg;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.maxOffset !== undefined) {
            this.maxOffset = params.maxOffset;
        }
        if (params.curOffset !== undefined) {
            this.curOffset = params.curOffset;
        }
        if (params.isLand !== undefined) {
            this.isLand = params.isLand;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.isDistributed !== undefined) {
            this.isDistributed = params.isDistributed;
        }
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__res.purgeDependencyOnElmtId(rmElmtId);
        this.__uri.purgeDependencyOnElmtId(rmElmtId);
        this.__strProg.purgeDependencyOnElmtId(rmElmtId);
        this.__progress.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
        this.__maxOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__curOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__isLand.purgeDependencyOnElmtId(rmElmtId);
        this.__result.purgeDependencyOnElmtId(rmElmtId);
        this.__isDistributed.purgeDependencyOnElmtId(rmElmtId);
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__res.aboutToBeDeleted();
        this.__uri.aboutToBeDeleted();
        this.__strProg.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        this.__maxOffset.aboutToBeDeleted();
        this.__curOffset.aboutToBeDeleted();
        this.__isLand.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        this.__isDistributed.aboutToBeDeleted();
        this.__isShow.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __res: ObservedPropertySimplePU<string>;
    get res() {
        return this.__res.get();
    }
    set res(newValue: string) {
        this.__res.set(newValue);
    }
    private __uri: ObservedPropertySimplePU<string>;
    get uri() {
        return this.__uri.get();
    }
    set uri(newValue: string) {
        this.__uri.set(newValue);
    }
    private __strProg: ObservedPropertySimplePU<string>;
    get strProg() {
        return this.__strProg.get();
    }
    set strProg(newValue: string) {
        this.__strProg.set(newValue);
    }
    private __progress: ObservedPropertySimplePU<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __fontSize: ObservedPropertySimplePU<number>; //初始字号
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue: number) {
        this.__fontSize.set(newValue);
    }
    private __maxOffset: ObservedPropertySimplePU<number>;
    get maxOffset() {
        return this.__maxOffset.get();
    }
    set maxOffset(newValue: number) {
        this.__maxOffset.set(newValue);
    }
    private __curOffset: ObservedPropertySimplePU<number>;
    get curOffset() {
        return this.__curOffset.get();
    }
    set curOffset(newValue: number) {
        this.__curOffset.set(newValue);
    }
    private __isLand: ObservedPropertySimplePU<boolean>;
    get isLand() {
        return this.__isLand.get();
    }
    set isLand(newValue: boolean) {
        this.__isLand.set(newValue);
    }
    private __result: ObservedPropertySimplePU<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    // @State @Watch('dataChange') expression: string = ''
    private __isDistributed: ObservedPropertySimplePU<boolean>;
    get isDistributed() {
        return this.__isDistributed.get();
    }
    set isDistributed(newValue: boolean) {
        this.__isDistributed.set(newValue);
    }
    private __isShow: ObservedPropertySimplePU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private scroller: Scroller;
    // private kvStoreModel: KvStoreModel = new KvStoreModel()
    // private remoteDeviceModel: RemoteDeviceModel = new RemoteDeviceModel()
    // private listener = mediaQuery.matchMediaSync('screen and (min-aspect-ratio: 1.5) or (orientation: landscape)')
    // dataChange() {
    //   Logger.info(TAG, `dataChange, expression = ${this.expression}`)
    //   this.kvStoreModel.put(DATA_CHANGE, this.expression)
    // }
    getProgress(): void {
        if (this.maxOffset != 0) {
            this.progress = (this.scroller.currentOffset().yOffset / this.maxOffset * 100);
            if (this.progress < 0) {
                this.progress = 0;
            }
            this.strProg = this.progress.toFixed(0);
            if (this.strProg == "-0") {
                this.strProg = "0";
            }
        }
    }
    fixProgress(): void {
        this.scroller.scrollEdge(Edge.End);
        this.maxOffset = this.scroller.currentOffset().yOffset;
        // this.scroller.scrollEdge(Edge.Top)
        // this.scroller.scrollBy(0, this.progress * this.maxOffset / 100)
    }
    importURI(): void {
        let textSelector = new picker.DocumentSelectOptions();
        let documentViewPicker = new picker.DocumentViewPicker(); // 创建文件选择器实例
        documentViewPicker.select(textSelector).then((DocumentSelectResult) => {
            this.uri = DocumentSelectResult[0];
        });
    }
    importText(): string {
        let file = fs.openSync(this.uri);
        let buf = new ArrayBuffer(64 * 1024 * 1024); //缓冲区为64Mb
        let rd = new util.TextDecoder("utf-8", { ignoreBOM: true });
        let ret: string = "";
        fs.read(file.fd, buf, (err, readLen) => {
            ret = rd.decode(new Uint8Array(buf.slice(0, readLen)));
            this.res = ret;
            fs.closeSync(file);
        });
        this.fixProgress();
        return ret;
    }
    // async aboutToAppear() {
    //   this.listener.on('change', this.onLand)
    //   let context = getContext(this) as common.UIAbilityContext
    //   let atManager = abilityAccessCtrl.createAtManager()
    //   try {
    //     atManager.requestPermissionsFromUser(context, ['ohos.permission.DISTRIBUTED_DATASYNC']).then((data) => {
    //       Logger.info(TAG, `data: ${JSON.stringify(data)}`)
    //     }).catch((err: object) => {
    //       Logger.info(TAG, `err: ${JSON.stringify(err)}`)
    //     })
    //   } catch (err) {
    //     Logger.info(TAG, `catch err->${JSON.stringify(err)}`)
    //   }
    //   Logger.info(TAG, `grantPermission,requestPermissionsFromUser`)
    //   let isRemote: string | undefined = AppStorage.get('isRemote')
    //   if (isRemote === 'isRemote' ? true : false) {
    //     this.isDistributed = true
    //     this.isShow = true
    //   }
    //   this.kvStoreModel.setOnMessageReceivedListener(context, DATA_CHANGE, (value: string) => {
    //     Logger.debug(TAG, `DATA_CHANGE: ${value},this.isDistributed = ${this.isDistributed}`)
    //     if (this.isDistributed) {
    //       if (value.search(EXIT) !== -1) {
    //         Logger.info(TAG, `EXIT ${EXIT}`)
    //         context.terminateSelf((error) => {
    //           Logger.error(TAG, `terminateSelf finished, error= ${error}`)
    //         })
    //       } else {
    //         if (value === 'null') {
    //           this.expression = ''
    //         } else {
    //           this.expression = value
    //         }
    //         // if (this.isOperator(this.expression.substr(this.expression.length - 1, this.expression.length))) {
    //         this.result = "1"
    //         // } else {
    //         //   this.result = "1"
    //         // }
    //       }
    //     }
    //   })
    // }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Read.ets(138:5)");
            Column.size({ width: '100%', height: '100%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // TitleBarComponent({
            //   isLand: this.isLand,
            //   startAbilityCallBack: this.startAbilityCallBack,
            //   remoteDeviceModel: this.remoteDeviceModel,
            //   isDistributed: $isDistributed,
            //   isShow: this.isShow
            // })
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Read.ets(146:7)");
            // TitleBarComponent({
            //   isLand: this.isLand,
            //   startAbilityCallBack: this.startAbilityCallBack,
            //   remoteDeviceModel: this.remoteDeviceModel,
            //   isDistributed: $isDistributed,
            //   isShow: this.isShow
            // })
            Row.height("8%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Read.ets(147:9)");
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([{ value: '10vp' }, { value: '15vp' }, { value: '20vp' }, { value: '25vp' }, { value: '30vp' }, {
                    value: '35vp'
                }]);
            Select.debugLine("entry/src/main/ets/pages/Read.ets(148:11)");
            Select.backgroundColor("##FFFFFF");
            Select.fontColor(Color.Black);
            Select.selected(1);
            Select.value('字号');
            Select.font({ size: 15 });
            Select.selectedOptionFont({ size: 25, weight: 400 });
            Select.optionFont({ size: 15, weight: 400 });
            Select.onSelect((index: number) => {
                this.fontSize = 5 * (index + 2);
            });
        }, Select);
        Select.pop();
        Column.pop();
        // TitleBarComponent({
        //   isLand: this.isLand,
        //   startAbilityCallBack: this.startAbilityCallBack,
        //   remoteDeviceModel: this.remoteDeviceModel,
        //   isDistributed: $isDistributed,
        //   isShow: this.isShow
        // })
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Read.ets(165:7)");
            Row.height("84%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create(this.scroller);
            Scroll.debugLine("entry/src/main/ets/pages/Read.ets(166:9)");
            Scroll.onScroll((() => this.getProgress()));
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.scrollBar(BarState.Auto);
            Scroll.scrollBarColor(Color.Gray);
            Scroll.scrollBarWidth(10);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.res);
            Text.debugLine("entry/src/main/ets/pages/Read.ets(167:11)");
            Text.fontSize(this.fontSize);
            Text.width('100%');
        }, Text);
        Text.pop();
        Scroll.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Read.ets(183:7)");
            Row.height("8%");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.strProg + "%");
            Text.debugLine("entry/src/main/ets/pages/Read.ets(184:9)");
            Text.backgroundColor("#FFFFFF");
            Text.fontColor(Color.Black);
            Text.fontWeight(FontWeight.Normal);
            Text.fontSize(15);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("回到开头");
            Button.debugLine("entry/src/main/ets/pages/Read.ets(189:9)");
            Button.backgroundColor("#FFFFFF");
            Button.fontColor(Color.Black);
            Button.fontWeight(FontWeight.Normal);
            Button.fontSize(15);
            Button.onClick(() => {
                this.scroller.scrollEdge(Edge.Top);
                this.getProgress();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("去到结尾");
            Button.debugLine("entry/src/main/ets/pages/Read.ets(198:9)");
            Button.backgroundColor("#FFFFFF");
            Button.fontColor(Color.Black);
            Button.fontWeight(FontWeight.Normal);
            Button.fontSize(15);
            Button.onClick(() => {
                this.scroller.scrollEdge(Edge.End);
                this.getProgress();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("前进10%");
            Button.debugLine("entry/src/main/ets/pages/Read.ets(207:9)");
            Button.backgroundColor("#FFFFFF");
            Button.fontColor(Color.Black);
            Button.fontWeight(FontWeight.Normal);
            Button.fontSize(15);
            Button.onClick(() => {
                if (this.progress > 90) {
                    this.scroller.scrollEdge(Edge.End);
                }
                else {
                    this.scroller.scrollBy(0, 0.1 * this.maxOffset);
                }
                this.getProgress();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("后退10%");
            Button.debugLine("entry/src/main/ets/pages/Read.ets(220:9)");
            Button.backgroundColor("#FFFFFF");
            Button.fontColor(Color.Black);
            Button.fontWeight(FontWeight.Normal);
            Button.fontSize(15);
            Button.onClick(() => {
                if (this.progress < 10) {
                    this.scroller.scrollEdge(Edge.Top);
                }
                else {
                    this.scroller.scrollBy(0, -0.1 * this.maxOffset);
                }
                this.getProgress();
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
loadDocument(new Index(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
