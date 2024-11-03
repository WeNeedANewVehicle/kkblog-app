import route from "@/routes/routes"

export interface MenuItem {
    to: string
    text: string
}

export type Menu = MenuItem[]

export const menu: Menu = [
    {
        text: '글목록',
        to: route.posts.index
    },
    {
        text: '포트폴리오',
        to: route.portfolio,
    },
    {
        text: '소개',
        to: route.about
    },
];