import { part1, part2 } from './solutions'
import { input } from '../../../utils/helpers'

// Create input.txt file and add contents for this to run!
const init = () => {
  console.log(part1(input(__dirname + `/input.txt`)))
  console.log(part2(input(__dirname + `/input.txt`)))
}
init()
