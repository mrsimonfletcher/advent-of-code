import { part1, part2 } from './solutions'

const input = ['nop +0', 'acc +1', 'jmp +4', 'acc +3', 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6']

test('the value in the accumulator before the first time an instruction is run twice is 5', () => {
  expect(part1(input)).toBe(5)
})

test('the value in the accumulator at the time the program terminates is 8', () => {
  expect(part2(input)).toBe(8)
})
