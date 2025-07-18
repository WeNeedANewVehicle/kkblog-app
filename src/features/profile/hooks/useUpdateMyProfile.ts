import { useMutation } from '@tanstack/react-query'
import { updateMyProfileApi } from '@/features/profile/api/profile.api';
import { UpdateMyProfileDto } from '@/features/profile/api/dto/updateMyProfile.dto';

export const UPDATE_MY_PROFILE = 'UPDATE_MY_PROFILE'
function useUpdateMyProfile() {
    return useMutation({
        mutationFn: (params: UpdateMyProfileDto) => updateMyProfileApi(params),
        mutationKey: [UPDATE_MY_PROFILE],
    })
}

export default useUpdateMyProfile