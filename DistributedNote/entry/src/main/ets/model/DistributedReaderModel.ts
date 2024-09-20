/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import distributedObject from '@ohos.data.distributedDataObject'
import Logger from './Logger'
import Note from '../model/Note'

const TAG: string = 'DistributedReaderModel'

export default class DistributedReaderModel {
  public distributedReader?
  public changeCallback?: () => void
  public statusCallback?: (sessionId: string, networkId: string, status: 'online' | 'offline') => void

  constructor() {
    this.distributedReader = distributedObject.createDistributedObject({
      scrollOffset: 0,
      fontsize: 15
    })
  }

  genSessionId() {
    return distributedObject.genSessionId()
  }

  setChangeCallback(changeCallback: () => void) {
    if (this.changeCallback === changeCallback) {
      Logger.info(TAG, 'same callback')
      return
    }
    Logger.info(TAG, 'start off')
    if (this.changeCallback !== undefined) {
      this.distributedReader.off('change', this.changeCallback)
    }
    this.changeCallback = changeCallback
    Logger.info(TAG, 'start watch change')
    this.distributedReader.on('change', this.changeCallback)
  }

  setStatusCallback(callback: (sessionId: string, networkId: string, status: 'online' | 'offline') => void) {
    if (this.statusCallback === callback) {
      Logger.info(TAG, 'same callback')
      return
    }
    Logger.info(TAG, 'start off')
    if (this.statusCallback !== undefined) {
      this.distributedReader.off('status', this.statusCallback)
    }
    this.statusCallback = callback
    Logger.info(TAG, 'start watch change')
    this.distributedReader.on('status', this.statusCallback)
  }

  updateOffset(scrollOffset: number) {
    Logger.info(TAG, 'update offset')
    this.distributedReader.scrollOffset = scrollOffset
  }

  updateFont(fontsize: number){
    Logger.info(TAG, 'update font')
    this.distributedReader.fontsize = fontsize
  }

  clear() {
    Logger.info(TAG, 'doClear')
    this.distributedReader.lastOffset = 0
    this.distributedReader.scrollOffset = 0
  }

  off() {
    this.distributedReader.off('change')
    this.changeCallback = undefined
    this.distributedReader.off('status')
    this.statusCallback = undefined
  }
}
