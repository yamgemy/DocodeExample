import {makeAutoObservable, observable, action, computed, toJS} from 'mobx';
import {createContext} from 'react';

class SomeStateStore {

  count = 0;
  constructor(count) {

    makeAutoObservable(this, {
      count: observable,
      countText: computed,
      incrementCount: action,
    });
    this.count = count;
  }

  incrementCount() {
    this.count += 1;
  }

  get countText() {
    return 'changed to ' + this.count;
  }
}

export const SomeStateStoreContext = createContext(new SomeStateStore(0));
