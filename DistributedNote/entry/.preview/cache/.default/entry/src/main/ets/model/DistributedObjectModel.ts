import distributedObject from "@ohos:data.distributedDataObject";
import Logger from "@bundle:ohos.samples.distributednote/entry/ets/model/Logger";
const TAG: string = 'DistributedObjectModel';
export default class DistributedObjectModel {
    public distributedObject?: any;
    public changeCallback?: () => void;
    public statusCallback?: (sessionId: string, networkId: string, status: 'online' | 'offline') => void;
    constructor() {
        this.distributedObject = distributedObject.createDistributedObject({
            documents: [],
            documentSize: 0
        });
    }
    genSessionId() {
        return distributedObject.genSessionId();
    }
    setChangeCallback(changeCallback: () => void) {
        if (this.changeCallback === changeCallback) {
            Logger.info(TAG, 'same callback');
            return;
        }
        Logger.info(TAG, 'start off');
        if (this.changeCallback !== undefined) {
            this.distributedObject.off('change', this.changeCallback);
        }
        this.changeCallback = changeCallback;
        Logger.info(TAG, 'start watch change');
        this.distributedObject.on('change', this.changeCallback);
    }
    setStatusCallback(callback: (sessionId: string, networkId: string, status: 'online' | 'offline') => void) {
        if (this.statusCallback === callback) {
            Logger.info(TAG, 'same callback');
            return;
        }
        Logger.info(TAG, 'start off');
        if (this.statusCallback !== undefined) {
            this.distributedObject.off('status', this.statusCallback);
        }
        this.statusCallback = callback;
        Logger.info(TAG, 'start watch change');
        this.distributedObject.on('status', this.statusCallback);
    }
    update(index: number, title: string, content: string, mark: number, intro: string) {
        Logger.info(TAG, `doUpdate,${title},${index}`);
        let documents = this.distributedObject.documents;
        documents[index] = {
            title: title, content: content, mark: mark, intro: intro
        };
        this.distributedObject.documents = documents;
        Logger.info(TAG, `update my documents,${JSON.stringify(this.distributedObject.documents)}`);
    }
    add(title: string, content: string, mark: number, intro: string) {
        Logger.info(TAG, `doAdd,${title},${content}`);
        Logger.info(TAG, `doAdd,${JSON.stringify(this.distributedObject.documents)}`);
        this.distributedObject.documents = [...this.distributedObject.documents,
            {
                title: title, content: content, mark: mark, intro: intro
            }];
        this.distributedObject.documentSize++;
        Logger.info(TAG, `add my documents,${JSON.stringify(this.distributedObject.documents)}`);
    }
    clear() {
        Logger.info(TAG, 'doClear');
        this.distributedObject.documents = [];
        this.distributedObject.documentSize = 0;
        Logger.info(TAG, 'doClear finish');
    }
    off() {
        this.distributedObject.off('change');
        this.changeCallback = undefined;
        this.distributedObject.off('status');
        this.statusCallback = undefined;
    }
}
