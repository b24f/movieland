import { useEffect, useRef, useCallback, useState } from 'react';

export const useInfiniteScroll = (options = {}) => {
    const { threshold = 0 } = options;

    const [isIntersecting, setIsIntersecting] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const observer = useRef(null);

    const customRef = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect();
            observer.current = null;
        }

        if (node?.nodeType === Node.ELEMENT_NODE) {
            const currentObserver = new IntersectionObserver(
                ([entry]) => {
                    setIsIntersecting(entry.isIntersecting);
                },
                { threshold }
            )
            currentObserver.observe(node);
            observer.current = currentObserver;
        }
    }, [threshold]);

    useEffect(() => {
        if (isIntersecting) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    }, [isIntersecting]);

    return [customRef, isIntersecting, pageNumber];
};
