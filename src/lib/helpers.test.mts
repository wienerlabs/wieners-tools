import assert from "node:assert/strict";
import { test } from "node:test";
import { parsePages } from "./pdf-tools.ts";
import { mergeBoxes } from "./vision.ts";

test("parsePages reads lists, ranges and open ends", () => {
  assert.deepEqual(parsePages("", 3), [0, 1, 2]);
  assert.deepEqual(parsePages("1, 3", 3), [0, 2]);
  assert.deepEqual(parsePages("2-", 4), [1, 2, 3]);
  assert.deepEqual(parsePages("2-9", 3), [1, 2]);
});

test("parsePages ignores pages past the end", () => {
  assert.deepEqual(parsePages("5", 3), []);
  assert.deepEqual(parsePages("3, 7-9", 3), [2]);
});

test("mergeBoxes joins detections of one face into their union", () => {
  const merged = mergeBoxes([
    { x: 0, y: 0, w: 10, h: 10, score: 0.9 },
    { x: 2, y: 2, w: 12, h: 12, score: 0.5 },
    { x: 50, y: 50, w: 5, h: 5, score: 0.7 }
  ]);
  assert.deepEqual(merged, [
    { x: 0, y: 0, w: 14, h: 14, score: 0.9 },
    { x: 50, y: 50, w: 5, h: 5, score: 0.7 }
  ]);
});

test("mergeBoxes keeps the whole face when a partial tile hit scores higher", () => {
  const merged = mergeBoxes([
    { x: 100, y: 100, w: 20, h: 40, score: 0.95 },
    { x: 100, y: 100, w: 40, h: 40, score: 0.6 }
  ]);
  assert.deepEqual(merged, [{ x: 100, y: 100, w: 40, h: 40, score: 0.95 }]);
});

test("mergeBoxes keeps neighbouring faces apart", () => {
  const merged = mergeBoxes([
    { x: 0, y: 0, w: 40, h: 40, score: 0.9 },
    { x: 36, y: 0, w: 40, h: 40, score: 0.8 }
  ]);
  assert.equal(merged.length, 2);
});
