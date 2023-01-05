import { LRUCache } from './main';


describe('LRUCache', () => {
  let cache: LRUCache<string, number>;

  beforeEach(() => {
    cache = new LRUCache<string, number>(3);
  });

  test('setElement adds a new key-value mapping to the cache', () => {
    expect(cache.setElement('a', 1)).toBeUndefined();
    expect(cache.setElement('b', 2)).toBeUndefined();
  });

  test('setElement updates an existing key-value mapping in the cache', () => {
    cache.setElement('a', 1);
    expect(cache.setElement('a', 2)).toBe('a');
  });

  test('getElement retrieves a value from the cache', () => {
    cache.setElement('a', 1);
    expect(cache.getElement('a')).toBe(1);
  });

  test('getElement returns undefined for a non-existent key', () => {
    expect(cache.getElement('a')).toBeUndefined();
  });

  test('removeElement removes a key-value mapping from the cache', () => {
    cache.setElement('a', 1);
    expect(cache.removeElement('a')).toBeTruthy();
    expect(cache.getElement('a')).toBeUndefined();
  });

  test('removeElement returns false for a non-existent key', () => {
    expect(cache.removeElement('a')).toBeFalsy();
  });
});
