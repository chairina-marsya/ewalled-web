import moment from 'moment'

export const getTimeGreeting = () => {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Morning'
  } else if (hour >= 12 && hour < 17) {
    return 'Afternoon'
  } else {
    return 'Night'
  }
}

export const toRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

export const formatRupiahInput = (value) => {
  if (!value) return ''

  // Remove non-digit characters
  const numeric = value.replace(/\D/g, '')

  // Format with dots every 3 digits from the end
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const handleChangeOnlyDigit = (value) => {
  // Only keep digits
  const raw = value.replace(/\D/g, '')
  return raw
}

export const getDateRange = (type) => {
  let startDate, endDate

  switch (type) {
    case 'ALL_TIME':
      startDate = moment('2024-12-01T00:00:00')
      endDate = moment('2025-12-01T00:00:00')
      break

    case 'TODAY':
      startDate = moment().startOf('day')
      endDate = moment().endOf('day')
      break

    case 'YESTERDAY':
      startDate = moment().subtract(1, 'day').startOf('day')
      endDate = moment().subtract(1, 'day').endOf('day')
      break

    case 'THIS_WEEK':
      startDate = moment().startOf('week') // default start is Sunday
      endDate = moment().endOf('week')
      break

    case 'THIS_MONTH':
      startDate = moment().startOf('month')
      endDate = moment().endOf('month')
      break

    default:
      throw new Error(`Unknown date range type: ${type}`)
  }

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }
}

export const backToLogin = (status) => {
  if (status === 401) {
    localStorage.clear()
    window.location.href = '/login'
  } else {
    null
  }
}
