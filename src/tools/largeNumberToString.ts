export const largeNumberToString = (number: number) => {
  const splittedNumber = number.toString().split('').reverse().join('')
  let stringNumber = ''

  for (let characterIndex = 0; characterIndex < splittedNumber.length; characterIndex++) {
    stringNumber = stringNumber.concat(splittedNumber[characterIndex])
    if (characterIndex % 3 === 2) {
      stringNumber = stringNumber.concat(' ')
    }
  }
  stringNumber = stringNumber.split('').reverse().join('')
  return stringNumber
}
