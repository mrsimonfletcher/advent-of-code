export const part1 = (input: string[]): number =>
  calculateCount(
    input.map(row => row.split('')),
    part1Moves,
  )

const calculateCount = (
  input: string[][],
  moveFunc: (gridLine: string[], input: string[][], rowIndex: number) => string[],
  noChange: boolean = false,
  iterations: number = 0,
): number => {
  if (noChange) {
    return input.reduce((count: number, val: string[]) => (count += val.filter(v => v == '#').length), 0)
  }

  const newGrid = input.reduce((acc: string[][], val: string[], rowIndex: number) => {
    acc.push(moveFunc(val, input, rowIndex))
    return acc
  }, [])

  return calculateCount(newGrid, moveFunc, JSON.stringify(input) === JSON.stringify(newGrid), (iterations += 1))
}

const part1Moves = (gridLine: string[], input: string[][], rowIndex: number): string[] => {
  return gridLine.map((v: string, columnIndex: number) => {
    if (v === '.') {
      return v
    }

    const combinations = [
      [rowIndex - 1, columnIndex - 1],
      [rowIndex - 1, columnIndex],
      [rowIndex - 1, columnIndex + 1],
      [rowIndex, columnIndex - 1],
      [rowIndex, columnIndex + 1],
      [rowIndex + 1, columnIndex - 1],
      [rowIndex + 1, columnIndex],
      [rowIndex + 1, columnIndex + 1],
    ]

    if (v === 'L') {
      if (combinations.map(v => (input[v[0]] || [])[v[1]]).every(f => f !== '#')) {
        return '#'
      }
    }

    if (v === '#') {
      if (combinations.map(v => (input[v[0]] || [])[v[1]]).filter(v => v === '#').length >= 4) {
        return 'L'
      }
    }

    return v
  })
}
