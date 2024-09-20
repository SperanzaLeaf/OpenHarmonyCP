interface NoteItem_Params {
    note?: Note | undefined;
    index?: number;
}
import router from "@ohos:router";
import { MARKS } from "@bundle:ohos.samples.distributednote/entry/ets/model/Const";
import type Note from '../model/Note';
export default class NoteItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__note = new ObservedPropertyObjectPU(undefined, this, "note");
        this.index = 0;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: NoteItem_Params) {
        if (params.note !== undefined) {
            this.note = params.note;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
    }
    updateStateVars(params: NoteItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__note.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__note.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __note?: ObservedPropertyObjectPU<Note | undefined>;
    get note() {
        return this.__note.get();
    }
    set note(newValue: Note | undefined) {
        this.__note.set(newValue);
    }
    private index: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/common/NoteItem.ets(25:5)");
            Row.padding(16);
            Row.width('100%');
            Row.borderRadius(16);
            Row.backgroundColor(Color.White);
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/Edit',
                    params: {
                        index: this.index,
                        note: this.note,
                        isAdd: false
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.note!.mark >= 0 ? MARKS[this.note!.mark] : { "id": 16777273, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/common/NoteItem.ets(26:7)");
            Image.size({ width: 30, height: 30 });
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/common/NoteItem.ets(29:7)");
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 20 });
            Column.width("67%");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.note!.title);
            Text.debugLine("entry/src/main/ets/common/NoteItem.ets(30:9)");
            Text.fontColor(Color.Black);
            Text.fontSize(30);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.note!.intro);
            Text.debugLine("entry/src/main/ets/common/NoteItem.ets(35:9)");
            Text.fontColor(Color.Gray);
            Text.margin({ top: 10 });
            Text.fontSize(25);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/common/NoteItem.ets(45:7)");
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("开始阅读");
            Button.debugLine("entry/src/main/ets/common/NoteItem.ets(46:7)");
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/Read',
                    params: { aa: this.note!.content }
                });
            });
        }, Button);
        Button.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
