import React, { useCallback, useEffect, useRef } from 'react'
import useIntersectionObserver from '@/common/hooks/useIntersectionObserver'
import { FetchNextPageOptions } from '@tanstack/react-query'

interface UseInfiniteScrollParams {
    fetchNextPage: (options?: FetchNextPageOptions) => unknown;
    hasNextPage: boolean;
}

function useInfiniteScroll<T extends HTMLElement>({ hasNextPage, fetchNextPage }: UseInfiniteScrollParams) {

    const callback: IntersectionObserverCallback = useCallback((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fetchNextPage();
            }
        })
    }, [])

    const observer = useIntersectionObserver(callback);
    const ref = useRef<T>(null);

    useEffect(() => {
        if (!hasNextPage) {
            return;
        }

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        }

    }, [hasNextPage, fetchNextPage]);

    return ref;
}

export default useInfiniteScroll