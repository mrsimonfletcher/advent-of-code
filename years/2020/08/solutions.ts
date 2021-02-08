class Runner {
  private currentPosition: number
  private accumulator: number
  private instructions: string[][]

  constructor(input: string[]) {
    this.currentPosition = 0
    this.accumulator = 0
    this.instructions = this.parseInput(input)
  }

  run(instructions: string[][] = this.instructions, completeOnly: Boolean = false): number | void {
    this.currentPosition = 0
    this.accumulator = 0

    const visited: number[] = []
    while (!visited.includes(this.currentPosition) && this.currentPosition !== instructions.length - 1) {
      visited.push(this.currentPosition)
      this.move(instructions[this.currentPosition])
    }

    if (this.currentPosition === instructions.length - 1) {
      this.move(instructions[this.currentPosition])
      return this.accumulator
    }

    if (!completeOnly) {
      return this.accumulator
    }
  }

  part2(): number | void {
    const y = this.instructions
      .map((val, index) => {
        const arr = [...this.instructions]
        const [operation, operator, count] = val
        if (operation == 'nop' || operation == 'jmp') {
          arr[index] = [operation == 'nop' ? 'jmp' : 'nop', operator, count]
          return this.run(arr, true)
        }
      })
      .filter(val => typeof val !== 'undefined')
    return y[0]
  }

  move(move: string[]): void {
    const [operation, operator, count] = move

    if (operation === 'nop') {
      this.currentPosition += 1
    } else if (operation === 'acc') {
      operator === '+' ? (this.accumulator += Number(count)) : (this.accumulator -= Number(count))
      this.currentPosition += 1
    } else if (operation === 'jmp') {
      operator === '+' ? (this.currentPosition += Number(count)) : (this.currentPosition -= Number(count))
    }
  }

  parseInput(input: string[]): string[][] {
    return input.map(instruction => {
      const regex = instruction.match(/(?<operation>nop|acc|jmp)\s(?<operator>\+|-)(?<count>\d*)/)
      if (!regex || !regex.groups) throw new Error(`Sorry, couldn't find a match`)

      const { operation, operator, count } = regex.groups

      return [operation, operator, count]
    })
  }
}

export const part1 = (input: string[]) => {
  const runner = new Runner(input)
  return runner.run()
}

export const part2 = (input: string[]) => {
  const runner = new Runner(input)
  return runner.part2()
}
