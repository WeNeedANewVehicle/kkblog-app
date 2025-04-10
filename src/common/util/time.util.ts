import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export function diffDate(
  date: string,
  unit?: dayjs.QUnitType | dayjs.OpUnitType
) {
  return dayjs(new Date()).diff(date, unit)
}

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

export function hourSince(date: string) {
  const diffHour = diffDate(date, 'hour')

  if (diffHour === 0) {
    const mins = diffDate(date, 'minute')

    return mins === 0 ? '방금 전' : `${mins}분 전`
  }

  return `${diffHour}시간 전`
}

export function toReadableDate(date: string) {
  const isToday = isDateToday(date)

  if (isToday) {
    return hourSince(date)
  }

  return dayjs(date).format('YYYY년 MM월 DD일')
}

export function timeAgo(date: string) {
  const now = dayjs()
  const inputDate = dayjs(date)

  if (!inputDate.isValid()) {
    throw new Error('Invalid date')
  }

  if (inputDate.isAfter(now)) {
    return '곧'
  }

  const units: [dayjs.OpUnitType, string][] = [
    ['year', '년'],
    ['month', '개월'],
    ['week', '주'],
    ['day', '일'],
    ['hour', '시간'],
    ['minute', '분'],
  ]

  for (const [unit, label] of units) {
    const diff = diffDate(date, unit)
    if (diff > 0) {
      // 주 단위는 3주까지만 보여주고 이후는 월로 넘기기 위한 조건
      if (unit === 'week' && diff > 3) continue
      return `${diff}${label} 전`
    }
  }

  return '방금 전'
}
