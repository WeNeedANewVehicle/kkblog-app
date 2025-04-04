import { messages } from "@/common/messages/messages";
import { AppContext } from "@/components/Providers/AppContextProvider";
import { useContext } from "react";

export function useAppContext() {
    const state = useContext(AppContext)

    if (!state) {
        throw new Error(messages.context.cannot_find_app_context);
    }
    return state
}

