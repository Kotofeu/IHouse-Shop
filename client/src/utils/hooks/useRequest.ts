import { useEffect, useState } from 'react';

export default function useRequest<T>(request: Promise<T>): [T | undefined, boolean, any] {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    useEffect(() => {
        setIsLoading(true);
        request
            .then(response => setData(response))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    }, [])
    return [data, isLoading, error];
}