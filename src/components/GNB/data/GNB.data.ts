import route from "@/routes/routes"

export interface MenuItem {
    to: string
    text: string
}

export type Menu = MenuItem[]

export const menu: Menu = [
    {
        text: '글목록',
        to: route.posts
    },
    {
        text: '포트폴리오',
        to: route.portfolio,
    },
    {
        text: '소개',
        to: route.about
    },
    {
        text: '주인장 로그인',
        to: route.auth.signIn
    }
];