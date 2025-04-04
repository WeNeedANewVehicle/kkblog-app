import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export function toStartOf(date: string, unit?: dayjs.OpUnitType) {
  return dayjs(date).startOf(unit ?? 'day')
}

export function toEndOf(date: string, unit?: dayjs.OpUnitType) {
  return dayjs(date).endOf(unit ?? 'day')
}

export function isDateToday(date: string) {
  const now = new Date()
  const endOfDay = toEndOf(now.toISOString())
  const startOfDay = toStartOf(now.toISOString())

  return (
    dayjs(startOfDay).isSameOrBefore(date) && dayjs(endOfDay).isSameOrAfter(now)
  )
}

export function timeSince(date: string) {
  const diffHour = dayjs(new Date()).diff(date, 'hour')

  if (diffHour === 0) {
    const mins = dayjs(new Date()).diff(date, 'minute')

    return mins === 0 ? '방금 전' : `${mins}분 전`
  }
  return `${diffHour}시간 전`
}

export function toReadableDate(date: string) {
  const isToday = isDateToday(date)

  if (isToday) {
    return timeSince(date)
  }

  return dayjs(date).format('YYYY년 MM월 DD일')
}
