export function removeMask(input: string): string {
  return input.replace(/\D/g, '')
}
