export function maskInputPhone(value: string) {
  const cleanedValue = value.replace(/\D/g, '')

  if (cleanedValue.length <= 10) {
    return cleanedValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  } else if (cleanedValue.length <= 11) {
    return cleanedValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  } else {
    return value.slice(0, 15)
  }
}
