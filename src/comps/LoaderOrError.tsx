import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";

export default function LoaderOrError({
    isLoading,
    hasError,
    loaderRenderer = <LoadingAnimation loading />,
    errorRenderer = <p>something went wrong</p>,
    children
}: {
    isLoading: boolean,
    hasError?: boolean,
    loaderRenderer?: any,
    errorRenderer?: any,
    children: any
}) {
    return (
        <>
            {
                (isLoading) ? (
                    loaderRenderer
                ) : (hasError) ? (
                    errorRenderer
                ) : children
            }
        </>
    )
}