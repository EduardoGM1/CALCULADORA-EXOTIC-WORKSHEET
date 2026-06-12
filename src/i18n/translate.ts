type InterpolationValues = Record<string, string | number>

export function interpolate(template: string, values?: InterpolationValues) {
  if (!values) return template

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key]
    return value === undefined ? `{{${key}}}` : String(value)
  })
}
