export interface MainPageSummaryResponseDto {
    posts: {
        today: number,
        total: string, // big int
    },
    visitors: {
        today: number,
        total: string, // big int
    },
}
