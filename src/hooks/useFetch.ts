import { useState, useEffect } from 'react';
import { sendRequestToAPI } from "mngo-project-tools/utils";

export default function useFetch({
    urls = [],
    respTransformer,
}: {
    urls: { url: string }[],
    respTransformer?: (params: { respData: any, rqstData: any }, idx: number) => any,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if (!urls || !urls.length) return setIsLoading(false);

        setIsLoading(true);
        const apiCallPromises = (urls || []).map(item => sendRequestToAPI(item.url));
        Promise.all(apiCallPromises)
            .then(resp => {
                const transformedResp: any[] = [];
                resp.forEach((value: any, idx: number) => {
                    if (value) {
                        if (respTransformer) transformedResp.push(respTransformer({ respData: value, rqstData: urls?.[idx] }, idx))
                        else transformedResp.push(value);
                    }
                });

                setData(transformedResp);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }, []);

    return [isLoading, error, data];
}