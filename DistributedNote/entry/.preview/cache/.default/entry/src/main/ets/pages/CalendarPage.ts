interface ModifyEventDialog_Params {
    calendarEvent?: CalendarEvent;
    isComplete?: boolean;
    controller?: CustomDialogController;
}
interface CalendarEventItem_Params {
    calendarEvent?: CalendarEvent;
    dialogController?: CustomDialogController;
}
interface CalendarPage_Params {
    scroller?: Scroller;
    calendarEvents?: CalendarEvent[];
}
import { CalendarEvent, calendarEventData } from "@bundle:ohos.samples.distributednote/entry/ets/model/CalendarEvent";
export class CalendarPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.scroller = new Scroller();
        this.__calendarEvents = new ObservedPropertyObjectPU(calendarEventData, this, "calendarEvents");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: CalendarPage_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.calendarEvents !== undefined) {
            this.calendarEvents = params.calendarEvents;
        }
    }
    updateStateVars(params: CalendarPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__calendarEvents.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__calendarEvents.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private scroller: Scroller;
    private __calendarEvents: ObservedPropertyObjectPU<CalendarEvent[]>;
    get calendarEvents() {
        return this.__calendarEvents.get();
    }
    set calendarEvents(newValue: CalendarEvent[]) {
        this.__calendarEvents.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarPage.ets(10:5)");
            Column.height('100%');
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // header
            Text.create('阅读计划');
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(12:7)");
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
            Divider.debugLine("entry/src/main/ets/pages/CalendarPage.ets(17:7)");
            Divider.color(Color.Black);
            Divider.margin({ left: 20, right: 20, top: 10 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarPage.ets(21:7)");
            Column.width('90%');
            Column.padding(10);
            Column.margin({ top: 10 });
            Column.borderRadius(10);
            Column.shadow({ radius: 20 });
            Column.onClick(() => {
                let newCalendarEvent = new CalendarEvent();
                this.calendarEvents.push(newCalendarEvent);
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加计划');
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(22:9)");
            Text.fontWeight(FontWeight.Bold);
            Text.height(35);
            Text.fontSize(18);
            Text.fontColor(Color.Blue);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/pages/CalendarPage.ets(38:7)");
            Divider.color(Color.Black);
            Divider.margin({ left: 20, right: 20, top: 10 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/pages/CalendarPage.ets(43:7)");
            List.width('100%');
            List.height('100%');
            List.alignListItem(ListItemAlign.Center);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const calendarEvent = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/pages/CalendarPage.ets(45:11)");
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
                                            calendarEvent: calendarEvent
                                        };
                                    };
                                    ViewPU.create(new CalendarEventItem(this, { calendarEvent: calendarEvent }, undefined, elmtId, paramsLambda));
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
            this.forEachUpdateFunction(elmtId, this.calendarEvents, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, true);
                ListItem.height(150);
                ListItem.selectable(false);
                ListItem.debugLine("entry/src/main/ets/pages/CalendarPage.ets(49:9)");
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
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CalendarEventItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__calendarEvent = new ObservedPropertyObjectPU(calendarEventData[0], this, "calendarEvent");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let paramsLambda = () => {
                    return {
                        calendarEvent: this.calendarEvent,
                        isComplete: this.calendarEvent.isComplete
                    };
                };
                let jsDialog = new ModifyEventDialog(this, {
                    calendarEvent: this.calendarEvent,
                    isComplete: this.calendarEvent.isComplete
                }, undefined, -1, paramsLambda);
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            autoCancel: true // 允许点击遮障层退出
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: CalendarEventItem_Params) {
        if (params.calendarEvent !== undefined) {
            this.calendarEvent = params.calendarEvent;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: CalendarEventItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__calendarEvent.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__calendarEvent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __calendarEvent: ObservedPropertyObjectPU<CalendarEvent>;
    get calendarEvent() {
        return this.__calendarEvent.get();
    }
    set calendarEvent(newValue: CalendarEvent) {
        this.__calendarEvent.set(newValue);
    }
    private dialogController: CustomDialogController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 录取详情
            Row.create({ space: 15 });
            Row.debugLine("entry/src/main/ets/pages/CalendarPage.ets(75:5)");
            // 录取详情
            Row.width('90%');
            // 录取详情
            Row.padding(10);
            // 录取详情
            Row.margin({ top: 10 });
            // 录取详情
            Row.borderRadius(10);
            // 录取详情
            Row.shadow({ radius: 20 });
            // 录取详情
            Row.onClick(() => {
                this.dialogController.open();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.calendarEvent.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777274, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/CalendarPage.ets(77:9)");
                        Image.height(60);
                        Image.width(60);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777288, "type": 20000, params: [], "bundleName": "ohos.samples.distributednote", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/CalendarPage.ets(82:9)");
                        Image.height(60);
                        Image.width(60);
                    }, Image);
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarPage.ets(87:7)");
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.calendarEvent.name);
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(88:9)");
            Text.height(30);
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.calendarEvent.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.calendarEvent.completeValue);
                        Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(94:11)");
                        Text.height(20);
                        Text.fontSize(14);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.calendarEvent.incompleteValue);
                        Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(100:11)");
                        Text.height(20);
                        Text.fontSize(14);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.calendarEvent.year.toString() + '/' + this.calendarEvent.month.toString() + '/' + this.calendarEvent.day.toString());
                        Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(105:11)");
                        Text.height(20);
                        Text.fontSize(14);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        // 录取详情
        Row.pop();
    } // build
    rerender() {
        this.updateDirtyElements();
    }
}
class ModifyEventDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined) {
        super(parent, __localStorage, elmtId);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.calendarEvent = calendarEventData[0];
        this.__isComplete = new SynchedPropertySimpleOneWayPU(params.isComplete, this, "isComplete");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params: ModifyEventDialog_Params) {
        if (params.calendarEvent !== undefined) {
            this.calendarEvent = params.calendarEvent;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: ModifyEventDialog_Params) {
        this.__isComplete.reset(params.isComplete);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isComplete.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isComplete.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private calendarEvent: CalendarEvent;
    private __isComplete: SynchedPropertySimpleOneWayPU<boolean>;
    get isComplete() {
        return this.__isComplete.get();
    }
    set isComplete(newValue: boolean) {
        this.__isComplete.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarPage.ets(133:5)");
            Column.backgroundColor(Color.White);
            Column.width('80%');
            Column.padding(20);
            Column.borderRadius(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("修改计划");
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(134:7)");
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CalendarPage.ets(138:7)");
            Column.alignItems(HorizontalAlign.Start);
            Column.width('100%');
            Column.padding({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 事件名称
            Row.create({ space: 10 });
            Row.debugLine("entry/src/main/ets/pages/CalendarPage.ets(140:9)");
            // 事件名称
            Row.padding({ top: 0 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("计划阅读书目");
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(141:11)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入计划名称', text: this.calendarEvent.name });
            TextInput.debugLine("entry/src/main/ets/pages/CalendarPage.ets(142:11)");
            __TextInput__inputStyle();
            TextInput.onChange((value) => {
                this.calendarEvent.name = value;
            });
        }, TextInput);
        // 事件名称
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 事件详情
            if (this.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 10 });
                        Row.debugLine("entry/src/main/ets/pages/CalendarPage.ets(152:11)");
                        Row.padding({ top: 15 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("计划详情");
                        Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(153:13)");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: '请输入计划详情', text: this.calendarEvent.completeValue });
                        TextInput.debugLine("entry/src/main/ets/pages/CalendarPage.ets(154:13)");
                        __TextInput__inputStyle();
                        TextInput.onChange((value) => {
                            this.calendarEvent.completeValue = value;
                        });
                    }, TextInput);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 10 });
                        Row.debugLine("entry/src/main/ets/pages/CalendarPage.ets(163:11)");
                        Row.padding({ top: 15 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("计划详情");
                        Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(164:13)");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: '请输入计划详情', text: this.calendarEvent.incompleteValue });
                        TextInput.debugLine("entry/src/main/ets/pages/CalendarPage.ets(165:13)");
                        __TextInput__inputStyle();
                        TextInput.onChange((value) => {
                            this.calendarEvent.incompleteValue = value;
                        });
                    }, TextInput);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // deadline
            if (!this.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 10 });
                        Row.debugLine("entry/src/main/ets/pages/CalendarPage.ets(176:11)");
                        Row.padding({ top: 15 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("计划日期");
                        Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(177:13)");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        DatePicker.create({
                            start: new Date('1970-1-1'),
                            end: new Date('2100-1-1'),
                            selected: this.calendarEvent.date
                        });
                        DatePicker.debugLine("entry/src/main/ets/pages/CalendarPage.ets(178:13)");
                        DatePicker.width(170);
                        DatePicker.onChange((value: DatePickerResult) => {
                            if (value !== undefined) {
                                const year = value.year ?? this.calendarEvent.year;
                                const month = value.month ?? (this.calendarEvent.month - 1);
                                const day = value.day ?? this.calendarEvent.day;
                                this.calendarEvent.date.setFullYear(year, month, day);
                                this.calendarEvent.year = year;
                                this.calendarEvent.month = month + 1; // Month is zero-based
                                this.calendarEvent.day = day;
                            }
                        });
                    }, DatePicker);
                    DatePicker.pop();
                    Row.pop();
                });
            }
            // 完成情况
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 完成情况
            Row.create({ space: 10 });
            Row.debugLine("entry/src/main/ets/pages/CalendarPage.ets(201:9)");
            // 完成情况
            Row.width('100%');
            // 完成情况
            Row.padding({ top: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("未完成");
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(202:11)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: 'complete', group: 'radioGroup' });
            Radio.debugLine("entry/src/main/ets/pages/CalendarPage.ets(203:11)");
            Radio.checked(!this.calendarEvent.isComplete);
            Radio.onChange((isChecked: boolean) => {
                if (isChecked) {
                    this.isComplete = false;
                    this.calendarEvent.isComplete = false;
                }
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CalendarPage.ets(212:11)");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create("已完成");
            Text.debugLine("entry/src/main/ets/pages/CalendarPage.ets(213:11)");
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: 'incomplete', group: 'radioGroup' });
            Radio.debugLine("entry/src/main/ets/pages/CalendarPage.ets(214:11)");
            Radio.checked(this.calendarEvent.isComplete);
            Radio.onChange((isChecked: boolean) => {
                if (isChecked) {
                    this.isComplete = true;
                    this.calendarEvent.isComplete = true;
                }
            });
        }, Radio);
        // 完成情况
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __TextInput__inputStyle(): void {
    TextInput.height(40);
    TextInput.layoutWeight(1);
    TextInput.fontSize(14);
}
if (getPreviewComponentFlag()) {
    storePreviewComponents(2, "CalendarPage", new CalendarPage(undefined, {}), "ModifyEventDialog", new ModifyEventDialog(undefined, {}));
    previewComponent();
}
else {
}
