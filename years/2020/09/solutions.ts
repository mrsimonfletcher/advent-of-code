import { combinations } from '../../../utils/helpers'

const findBadNumber = (numbers: number[], preamble: number) => {
  let position = preamble
  let currentNum: number = 0
  while (position <= numbers.length) {
    currentNum = numbers[position]
    const numCombos = combinations([...numbers.slice(position - preamble, position)], 2).map(
      combo => combo[0] + combo[1],
    )

    if (!numCombos.find(v => v === numbers[position])) {
      break
    }

    position++
  }

  return currentNum
}

export const part1 = (input: (string | number)[], preamble: number = 25) => findBadNumber(input.map(Number), preamble)
export const part2 = (input: (string | number)[], preamble: number = 25) => {
  const numbers = input.map(Number)
  const badNumber = findBadNumber(numbers, preamble)

  for (let start = 0; start < numbers.length; start++) {
    let sum = numbers[start]

    for (let end = start + 1; end < numbers.length && sum < badNumber; end++) {
      sum += numbers[end]
      if (sum === badNumber) {
        const arr = numbers.slice(start, end)
        return Math.min(...arr) + Math.max(...arr)
      }
    }
  }
}
