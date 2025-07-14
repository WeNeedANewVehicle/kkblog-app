import React, { useRef } from 'react'

function useAttachFile() {
    const ref = useRef<HTMLInputElement>(null);

    return {
        ref,
        file: ref.current?.files || null
    }
}

export default useAttachFile