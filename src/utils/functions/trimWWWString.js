export default trimWWWString = string => {
  if (!string) return null
  if (!string.includes('www.iplayulisten')) return string
  try {
    let filtered = string.toString().replace(/www\./i, '').toLowerCase()
    if (string.includes('iplayulisten')) {
      filtered = string.toString().replace(/www\./i, '').toLowerCase()
    }
    return filtered
  } catch (e) {
    console.log(e)
  }
}