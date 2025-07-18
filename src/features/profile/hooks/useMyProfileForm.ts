import { useForm } from "react-hook-form"
import { profileSchema, ProfileSchmea } from "@/features/profile/schema/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useMemo } from "react"
import { GetMyProfileResponseDto } from "@/features/profile/api/dto/getMyProfile.dto"

interface UseMyProfileFormParams {
    profile?: GetMyProfileResponseDto
}

function useMyProfileForm({ profile }: UseMyProfileFormParams) {
    const { register, formState, reset, getValues, setValue, watch, handleSubmit } = useForm<ProfileSchmea>({
        resolver: zodResolver(profileSchema),
    })

    const onResetFields = useCallback(() => {
        if (!profile) {
            return;
        }

        const { bio, image, summary, user } = profile;
        reset({
            bio: bio ?? undefined,
            email: profile.user.email,
            image: image ?? undefined,
            summary: summary ?? undefined,
            nickname: user.nickname
        })
    }, [reset, profile])

    useEffect(() => {
        if (!profile) {
            return;
        }

        onResetFields()
    }, [profile, onResetFields])


    return { register, formState, onResetFields, getValues, setValue, watch, handleSubmit }
}

export default useMyProfileForm