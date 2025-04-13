import route from '@/routes/routes'

export interface HeaderMenuItem {
  to: string
  text: string
}

export const menu: HeaderMenuItem[] = [
  {
    text: '글목록',
    to: route.posts.index,
  },
  {
    text: '포트폴리오',
    to: route.portfolio,
  },
  {
    text: '소개',
    to: route.about,
  },
]
