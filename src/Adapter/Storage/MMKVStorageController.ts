// storage/MMKVStorage.ts
import { MMKV } from 'react-native-mmkv';

export enum PersistanceStorageKey {
  TOKEN = 'booklist@token_authorization2025',
  USER_INFO = 'booklist@user_authorization2025',

}

class PersistanceStorage {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV({
      id: 'app-storage',
      encryptionKey: undefined, // optional: use a secure key if needed
    });
  }

  private setData = (key: PersistanceStorageKey, value: any): void => {
    try {
      if (value === null || value === undefined) {
        this.storage.delete(key);
        return;
      }

      if (typeof value === 'string') {
        this.storage.set(key, value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        this.storage.set(key, value);
      } else {
        // object or array
        this.storage.set(key, JSON.stringify(value));
      }
    } catch (err) {
      throw err;
    }
  };

  private getData = (key: PersistanceStorageKey): any => {
    try {
      if (!this.storage.contains(key)) return null;

      const stringVal = this.storage.getString(key);
      const numVal = this.storage.getNumber(key);
      const boolVal = this.storage.getBoolean(key);

      if (stringVal !== undefined) {
        try {
          return JSON.parse(stringVal);
        } catch {
          return stringVal;
        }
      }
      if (numVal !== undefined) return numVal;
      if (boolVal !== undefined) return boolVal;

      return null;
    } catch (err) {
      throw err;
    }
  };

  private removeData = (key: PersistanceStorageKey): void => {
    try {
      this.storage.delete(key);
    } catch (err) {
      throw err;
    }
  };

  private getAllData = (): Record<string, any> => {
    try {
      const keys = this.storage.getAllKeys();
      const allData: Record<string, any> = {};

      keys.forEach((key) => {
        const val = this.storage.getString(key);
        if (val !== undefined) {
          try {
            allData[key] = JSON.parse(val);
          } catch {
            allData[key] = val;
          }
        } else {
          allData[key] =
            this.storage.getNumber(key) ??
            this.storage.getBoolean(key) ??
            null;
        }
      });

      return allData;
    } catch (e) {
      throw e;
    }
  };

  // ---------- Public API ----------

  SET_DATA = (key: PersistanceStorageKey, value: any): void => {
    try {
      this.setData(key, value);
      console.log('Data saved>>',{key,value});
    } catch (err) {
      console.log(err);
    }
  };

  GET_DATA = (key: PersistanceStorageKey): any | false => {
    try {
      const data = this.getData(key);
      return data ?? false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  REMOVE_DATA = (key: PersistanceStorageKey): void => {
    try {
      this.removeData(key);
    } catch (err) {
      console.log(err);
    }
  };

  CLEAR_ALL = (): void => {
    try {
      this.storage.clearAll();
      console.log('All data cleared from MMKV storage');
    } catch (err) {
      console.log(err);
    }
  };

  GET_ALL_DATA = (): Record<string, any> | false => {
    try {
      const allData = this.getAllData();
      return allData ?? false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}

export const MMKVStorageController = new PersistanceStorage();
