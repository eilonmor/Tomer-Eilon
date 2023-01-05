"use strict";
exports.__esModule = true;
exports.LRUCache = void 0;
var LRUCache = /** @class */ (function () {
    function LRUCache(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.accessQueue = [];
    }
    LRUCache.prototype.setElement = function (key, value) {
        var removedKey = this.removeElement(key);
        this.put(key, value);
        if (removedKey) {
            return key;
        }
        else {
            return undefined;
        }
    };
    LRUCache.prototype.getElement = function (key) {
        var value = this.get(key);
        if (value !== undefined) {
            this.updateAccessQueue(key);
        }
        return value;
    };
    LRUCache.prototype.removeElement = function (key) {
        if (this.cache["delete"](key)) {
            var index = this.accessQueue.indexOf(key);
            if (index > -1) {
                this.accessQueue.splice(index, 1);
            }
            return true;
        }
        return false;
    };
    LRUCache.prototype.get = function (key) {
        if (this.cache.has(key)) {
            this.updateAccessQueue(key);
            return this.cache.get(key);
        }
        return undefined;
    };
    LRUCache.prototype.put = function (key, value) {
        if (this.cache.has(key)) {
            this.updateAccessQueue(key);
        }
        else {
            if (this.accessQueue.length === this.capacity) {
                var leastRecentlyUsedKey = this.accessQueue.shift();
                if (leastRecentlyUsedKey !== undefined) {
                    this.cache["delete"](leastRecentlyUsedKey);
                }
            }
            this.accessQueue.push(key);
        }
        this.cache.set(key, value);
    };
    LRUCache.prototype.updateAccessQueue = function (key) {
        var index = this.accessQueue.indexOf(key);
        if (index > -1) {
            this.accessQueue.splice(index, 1);
        }
        this.accessQueue.push(key);
    };
    return LRUCache;
}());
exports.LRUCache = LRUCache;
