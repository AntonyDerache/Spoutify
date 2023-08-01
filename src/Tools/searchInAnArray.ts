export const searchInAnArray = (value: string, array: Array<string>) => {
  const valueLowercase = value.toLowerCase()
  return array.filter((elem: string) => elem.toLowerCase().includes(valueLowercase))
}
