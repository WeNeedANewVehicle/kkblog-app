import { METHODS } from "@/common/constant/constant";
import api from "@/common/util/api.util";
import { MainPageSummaryResponseDto } from "@/features/statistics/dto/getMainPageSuammry.dto";

export async function getMainPageSummary() {
    return await api<undefined, MainPageSummaryResponseDto>({
        url: '/statistics/summary',
    })
}
export async function increaseVisitorApi() {
    return await api<undefined, undefined>({
        url: '/statistics/visitors',
        method: METHODS.POST,
    })
}