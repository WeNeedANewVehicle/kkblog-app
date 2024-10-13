import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../../api/auth";
import tokenStorage from "@/common/storages/token-storage";

export const SIGN_IN = "SIGN_IN";

function useSignIn() {
    return useMutation({
        mutationFn: signInApi,
        onSuccess: ({ data }) => {
            tokenStorage.setAccessToken(data.accessToken)
        },

    })
}

export default useSignIn;
