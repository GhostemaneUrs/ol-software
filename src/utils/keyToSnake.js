const toSnakeCase = str => {
  return str.replace(/([A-Z])/g, c => `_${c.toLowerCase()}`)
}

export const keysToSnake = data => {
  if (Array.isArray(data)) {
    return data.map(keysToSnake)
  } else if (typeof data === 'function' || data !== Object(data)) {
    return data
  }

  const transformData = {}
  const entries = Object.entries(data)

  for (const [key, value] of entries) {
    const snakeCase = toSnakeCase(key)
    let transformValue = value

    if (typeof value === 'object') {
      transformValue = keysToSnake(value)
    }

    transformData[snakeCase] = transformValue
  }
  return transformData
}
