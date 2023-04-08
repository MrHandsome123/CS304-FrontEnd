let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        title: 'All-day event',
        start: todayStr
    },
    {
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    }
]