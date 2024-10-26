import { useQuery } from '@tanstack/react-query'
import { authMeApi } from '../../api/auth'
import tokenStorage from '@/common/storages/token-storage';

export const ME = 'ME';

function useMe() {
    return useQuery({
        queryKey: [ME],
        queryFn: () => {
            const accessToken = tokenStorage.getAccessToken();
            return authMeApi(accessToken)
        }
    })
}

export default useMe