"use strict";
exports.__esModule = true;
var main_1 = require("./main");
describe('LRUCache', function () {
    var cache;
    beforeEach(function () {
        cache = new main_1.LRUCache(3);
    });
    test('setElement adds a new key-value mapping to the cache', function () {
        expect(cache.setElement('a', 1)).toBeUndefined();
        expect(cache.setElement('b', 2)).toBeUndefined();
    });
    test('setElement updates an existing key-value mapping in the cache', function () {
        cache.setElement('a', 1);
        expect(cache.setElement('a', 2)).toBe('a');
    });
    test('getElement retrieves a value from the cache', function () {
        cache.setElement('a', 1);
        expect(cache.getElement('a')).toBe(1);
    });
    test('getElement returns undefined for a non-existent key', function () {
        expect(cache.getElement('a')).toBeUndefined();
    });
    test('removeElement removes a key-value mapping from the cache', function () {
        cache.setElement('a', 1);
        expect(cache.removeElement('a')).toBeTruthy();
        expect(cache.getElement('a')).toBeUndefined();
    });
    test('removeElement returns false for a non-existent key', function () {
        expect(cache.removeElement('a')).toBeFalsy();
    });
});
