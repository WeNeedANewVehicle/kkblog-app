import { queryOptions, useQuery } from '@tanstack/react-query';
import { getMyProfileApi } from '@/features/profile/api/profile.api';
import tokenStorage from '@/common/storages/token-storage';

export const GET_MY_PROFILE = 'GET_MY_PROFILE';

function useGetMyProfileOption() {
    const accessToken = tokenStorage.getAccessToken();

    return queryOptions({
        queryKey: [GET_MY_PROFILE],
        queryFn: () => getMyProfileApi(),
        enabled: Boolean(accessToken)
    })
}

function useGetMyProfile() {
    return useQuery(useGetMyProfileOption())
}

export default useGetMyProfile