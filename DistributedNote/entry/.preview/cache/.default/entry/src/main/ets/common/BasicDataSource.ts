import type Note from '../model/Note';
import type Canvas from '../model/Canvas';
class BasicDataSource implements IDataSource {
    private listeners: DataChangeListener[] = [];
    public totalCount(): number {
        return 0;
    }
    public getData(index: number): Note | Canvas | undefined {
        return undefined;
    }
    registerDataChangeListener(listener: DataChangeListener): void {
        if (this.listeners.indexOf(listener) < 0) {
            console.info('add listener');
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener: DataChangeListener): void {
        const pos = this.listeners.indexOf(listener);
        if (pos >= 0) {
            console.info('remove listener');
            this.listeners.splice(pos, 1);
        }
    }
    notifyDataReload(): void {
        this.listeners.forEach(listener => {
            listener.onDataReloaded();
        });
    }
    notifyDataAdd(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number): void {
        this.listeners.forEach(listener => {
            listener.onDataDelete(index);
        });
    }
    notifyDataMove(from: number, to: number): void {
        this.listeners.forEach(listener => {
            listener.onDataMove(from, to);
        });
    }
}
export class NoteDataSource extends BasicDataSource {
    public dataArray: Note[] = [];
    public totalCount(): number {
        return this.dataArray.length;
    }
    public getData(index: number): Note {
        return this.dataArray[index];
    }
    public addData(index: number, data: Note): void {
        this.dataArray.splice(index, 0, data);
        this.notifyDataAdd(index);
    }
    public pushData(data: Note): void {
        this.dataArray.push(data);
        this.notifyDataAdd(this.dataArray.length - 1);
    }
}
export class CanvasDataSource extends BasicDataSource {
    public pathArray: Canvas[] = [];
    public totalCount(): number {
        return this.pathArray.length;
    }
    public getData(index: number): Canvas {
        return this.pathArray[index];
    }
    public addData(index: number, data: Canvas): void {
        this.pathArray.splice(index, 0, data);
        this.notifyDataAdd(index);
    }
    public pushData(data: Canvas): void {
        this.pathArray.push(data);
        this.notifyDataAdd(this.pathArray.length - 1);
    }
}
