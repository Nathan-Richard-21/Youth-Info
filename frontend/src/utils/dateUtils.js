// Date utility functions for opportunities

export const formatDate = (dateString) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export const isExpiringSoon = (dateString) => {
  if (!dateString) return false
  const closingDate = new Date(dateString)
  const today = new Date()
  const daysUntilClose = Math.ceil((closingDate - today) / (1000 * 60 * 60 * 24))
  return daysUntilClose <= 7 && daysUntilClose > 0
}

export const getDaysRemaining = (dateString) => {
  if (!dateString) return null
  const closingDate = new Date(dateString)
  const today = new Date()
  const daysUntilClose = Math.ceil((closingDate - today) / (1000 * 60 * 60 * 24))
  return daysUntilClose
}

export const isExpired = (dateString) => {
  if (!dateString) return false
  const closingDate = new Date(dateString)
  const today = new Date()
  return closingDate < today
}
