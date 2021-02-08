import { part1, part2 } from './solutions'

const input = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576]

test('expects the bad number to be 127', () => {
  expect(part1(input, 5)).toBe(127)
})

test('expects the encryption weakness to be 62', () => {
  expect(part2(input, 5)).toBe(62)
})
