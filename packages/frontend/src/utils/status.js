export const componentStatuses = ['Operational', 'Under Maintenance', 'Degraded Performance', 'Partial Outage',
  'Major Outage']

export const getComponentColor = (status) => {
  switch (status) {
    case 'Operational':
      return '#388e3c'
    case 'Under Maintenance':
      return '#0277bd'
    case 'Degraded Performance':
      return '#fbc02d'
    case 'Partial Outage':
      return '#ef6c00'
    case 'Major Outage':
      return '#c62828'
    default:
      return '#9e9e9e'
  }
}

export const incidentStatuses = ['Investigating', 'Identified', 'Monitoring', 'Resolved']

export const getIncidentColor = (impact) => {
  switch (impact) {
    case 'Investigating':
      return '#c62828'
    case 'Identified':
      return '#ef6c00'
    case 'Monitoring':
      return '#0277bd'
    case 'Resolved':
      return '#388e3c'
    default:
      return '#9e9e9e'
  }
}

export const timeframes = ['Day', 'Week', 'Month']

export const getFormat = (timeframe) => {
  switch (timeframe) {
    case 'Day':
      return (x) => {
        const inc = x.getMinutes() > 30 ? 1 : 0
        return `${x.getHours() + inc}:00`
      }
    default:
      return (x) => { return `${x.getMonth() + 1}/${x.getDate()}` }
  }
}

export const getCullingFunc = (timeframe) => {
  switch (timeframe) {
    case 'Day':
      return () => { return true }
    case 'Week':
      return (i) => { return i % 12 === 0 }
    default:
      return (i) => { return i % 24 === 0 }
  }
}
