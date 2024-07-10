import { useRef, useCallback, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
    const { threshold = 0 } = options;

    const [entry, setEntry] = useState(null);

    const observer = useRef(null);

    const customRef = useCallback(node => {
        if (observer.current) {
            observer.current.disconnect();
            observer.current = null;
        }

        if (node?.nodeType === Node.ELEMENT_NODE) {
            const currentObserver = new IntersectionObserver(
                ([entry]) => {
                    setEntry(entry);
                },
                { threshold }
            )
            currentObserver.observe(node);
            observer.current = currentObserver;
        }
    }, [threshold]);

    return [customRef, entry];
}