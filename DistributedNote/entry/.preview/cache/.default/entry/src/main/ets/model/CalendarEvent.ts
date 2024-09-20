// import { isCancel } from '@ohos/axios'
@Observed
export class CalendarEvent {
    name: string;
    isComplete: boolean;
    incompleteValue: string;
    completeValue: string;
    year: number;
    month: number;
    day: number;
    date: Date;
    constructor(name = '新的计划', isComplete = false, incompleteValue = '未完成', completeValue = '已完成', date = new Date()) {
        this.name = name;
        this.isComplete = isComplete;
        this.incompleteValue = incompleteValue;
        this.completeValue = completeValue;
        this.date = date;
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
    }
}
export const calendarEventData: CalendarEvent[] = [
    new CalendarEvent("TOEFL词汇精选", false, "背前三章", "成绩：120 分", new Date('2024-1-1')),
    new CalendarEvent("计算机体系结构", false, "精读流水线部分", "已结课", new Date('2024-3-1')),
    new CalendarEvent("繁花", false, "阅读第拾叁章", "已读完", new Date('2024-5-1'))
];
