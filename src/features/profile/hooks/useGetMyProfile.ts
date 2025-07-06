import { queryOptions, useQuery } from '@tanstack/react-query';
import { getMyProfileApi } from '@/features/profile/api/profile.api';

export const GET_MY_PROFILE = 'GET_MY_PROFILE';

function useGetMyProfileOption() {
    return queryOptions({
        queryKey: [GET_MY_PROFILE],
        queryFn: () => getMyProfileApi()
    })
}

function useGetMyProfile() {
    return useQuery(useGetMyProfileOption())
}

export default useGetMyProfile