/* eslint-disable no-undef */
const program = async () => {
  process.stdout.write("1\n")
  process.stdout.write("2\n")
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
  process.stdout.write("3\n")
}

program()
