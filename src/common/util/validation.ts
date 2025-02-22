export function hasSpecialChar(text: string) {
  return text.match(/[^\w가-힣._\s]/g)?.length ? true : false
}
