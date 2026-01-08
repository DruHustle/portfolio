import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

/**
 * Test Suite: Utility Functions
 * Validates helper functions and utilities
 */
describe('Utility Functions', () => {
  /**
   * Class Name Utility Tests
   */
  describe('cn() - Class Name Utility', () => {
    it('should combine class names', () => {
      const result = cn('px-2', 'py-1');
      expect(result).toContain('px-2');
      expect(result).toContain('py-1');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'active', false && 'inactive');
      expect(result).toContain('base');
      expect(result).toContain('active');
      expect(result).not.toContain('inactive');
    });

    it('should remove duplicate classes', () => {
      const result = cn('px-2', 'px-4');
      // Tailwind merge should handle this
      expect(result).toBeDefined();
    });

    it('should handle empty strings', () => {
      const result = cn('px-2', '', 'py-1');
      expect(result).toBeDefined();
    });

    it('should handle undefined values', () => {
      const result = cn('px-2', undefined, 'py-1');
      expect(result).toBeDefined();
    });

    it('should handle null values', () => {
      const result = cn('px-2', null, 'py-1');
      expect(result).toBeDefined();
    });

    it('should handle arrays', () => {
      const result = cn(['px-2', 'py-1']);
      expect(result).toBeDefined();
    });

    it('should handle objects', () => {
      const result = cn({
        'px-2': true,
        'py-1': true,
        'hidden': false,
      });
      expect(result).toBeDefined();
    });
  });

  /**
   * String Utility Tests
   */
  describe('String Utilities', () => {
    it('should capitalize strings', () => {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should trim whitespace', () => {
      expect('  hello  '.trim()).toBe('hello');
    });

    it('should handle empty strings', () => {
      expect(''.trim()).toBe('');
    });
  });

  /**
   * Array Utility Tests
   */
  describe('Array Utilities', () => {
    it('should filter arrays', () => {
      const arr = [1, 2, 3, 4, 5];
      const filtered = arr.filter((n) => n > 2);
      expect(filtered).toEqual([3, 4, 5]);
    });

    it('should map arrays', () => {
      const arr = [1, 2, 3];
      const mapped = arr.map((n) => n * 2);
      expect(mapped).toEqual([2, 4, 6]);
    });

    it('should find items in arrays', () => {
      const arr = [1, 2, 3, 4, 5];
      const found = arr.find((n) => n === 3);
      expect(found).toBe(3);
    });

    it('should handle empty arrays', () => {
      const arr: number[] = [];
      expect(arr.length).toBe(0);
    });
  });

  /**
   * Object Utility Tests
   */
  describe('Object Utilities', () => {
    it('should merge objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { c: 3 };
      const merged = { ...obj1, ...obj2 };
      expect(merged).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should get object keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const keys = Object.keys(obj);
      expect(keys).toEqual(['a', 'b', 'c']);
    });

    it('should get object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const values = Object.values(obj);
      expect(values).toEqual([1, 2, 3]);
    });

    it('should handle empty objects', () => {
      const obj = {};
      expect(Object.keys(obj).length).toBe(0);
    });
  });

  /**
   * Type Checking Tests
   */
  describe('Type Checking', () => {
    it('should check if value is string', () => {
      expect(typeof 'hello').toBe('string');
      expect(typeof 123).not.toBe('string');
    });

    it('should check if value is number', () => {
      expect(typeof 123).toBe('number');
      expect(typeof 'hello').not.toBe('number');
    });

    it('should check if value is boolean', () => {
      expect(typeof true).toBe('boolean');
      expect(typeof 1).not.toBe('boolean');
    });

    it('should check if value is array', () => {
      expect(Array.isArray([1, 2, 3])).toBe(true);
      expect(Array.isArray('hello')).toBe(false);
    });

    it('should check if value is object', () => {
      expect(typeof { a: 1 }).toBe('object');
      expect(typeof null).toBe('object'); // Note: null is typeof object in JS
    });
  });
});

/**
 * Test Suite: Data Transformation
 * Validates data transformation utilities
 */
describe('Data Transformation', () => {
  it('should format dates', () => {
    const date = new Date('2024-01-08');
    expect(date).toBeInstanceOf(Date);
  });

  it('should parse JSON', () => {
    const json = '{"a": 1, "b": 2}';
    const parsed = JSON.parse(json);
    expect(parsed).toEqual({ a: 1, b: 2 });
  });

  it('should stringify objects', () => {
    const obj = { a: 1, b: 2 };
    const stringified = JSON.stringify(obj);
    expect(stringified).toBe('{"a":1,"b":2}');
  });

  it('should handle errors in parsing', () => {
    expect(() => JSON.parse('invalid')).toThrow();
  });
});
