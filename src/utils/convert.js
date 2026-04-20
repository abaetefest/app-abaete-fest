const getFormData = object => Object.keys(object).reduce((formData, key) => {
  const value = object[key]
  if (value === null || value === undefined) {
    return formData
  }
  formData.append(key, value)
  return formData
}, new FormData())

export {
  getFormData
}
