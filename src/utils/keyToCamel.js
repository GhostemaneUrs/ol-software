const toCamelCase = str => {
  return str.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, ''))
}

export const keysToCamel = data => {
  if (Array.isArray(data)) {
    return data.map(keysToCamel)
  } else if (typeof data === 'function' || data !== Object(data)) {
    return data
  }

  const transformData = {}
  const entries = Object.entries(data)

  for (const [key, value] of entries) {
    const camelCase = toCamelCase(key)
    let transformValue = value

    if (typeof value === 'object') {
      transformValue = keysToCamel(value)
    }

    transformData[camelCase] = transformValue
  }
  return transformData
}
