function objectToQueryString<T extends {}>(dto: T) {
  return new URLSearchParams(dto).toString()
}

export default objectToQueryString
