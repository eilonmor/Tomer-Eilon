
export interface ICacheAlgo<K, V> {
    setElement(key: K, value: V): K | undefined;
    getElement(key: K): V | undefined;
    removeElement(key: K): boolean;
  }
  
  export class LRUCache<K, V> implements ICacheAlgo<K, V> {
    private cache: Map<K, V>;
    private readonly capacity: number;
    private readonly accessQueue: K[];
  
    constructor(capacity: number) {
      this.capacity = capacity;
      this.cache = new Map<K, V>();
      this.accessQueue = [];
    }
  
    public setElement(key: K, value: V): K | undefined {
      const removedKey = this.removeElement(key);
      this.put(key, value);
      if (removedKey){return key}
      else{
        return undefined;
      }
       
    }
  
    public getElement(key: K): V | undefined {
      const value = this.get(key);
      if (value !== undefined) {
        this.updateAccessQueue(key);
      }
      return value;
    }
  
    public removeElement(key: K): boolean {
      if (this.cache.delete(key)) {
        const index = this.accessQueue.indexOf(key);
        if (index > -1) {
          this.accessQueue.splice(index, 1);
        }
        return true;
      }
      return false;
    }
  
    private get(key: K): V | undefined {
      if (this.cache.has(key)) {
        this.updateAccessQueue(key);
        return this.cache.get(key);
      }
      return undefined;
    }
  
    private put(key: K, value: V): void {
      if (this.cache.has(key)) {
        this.updateAccessQueue(key);
      } else {
        if (this.accessQueue.length === this.capacity) {
          const leastRecentlyUsedKey = this.accessQueue.shift();
          if (leastRecentlyUsedKey !== undefined) {
            this.cache.delete(leastRecentlyUsedKey);
          }
        }
        this.accessQueue.push(key);
      }
      this.cache.set(key, value);
    }
  
    private updateAccessQueue(key: K): void {
      const index = this.accessQueue.indexOf(key);
      if (index > -1) {
        this.accessQueue.splice(index, 1);
      }
      this.accessQueue.push(key);
    }
  }