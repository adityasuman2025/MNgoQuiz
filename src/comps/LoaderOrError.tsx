import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";

export default function LoaderOrError({
    loading,
    error,
    loaderRenderer = <LoadingAnimation loading />,
    errorRenderer = <p className={""}>{error}</p>,
    children
}: {
    loading: boolean,
    error: string,
    loaderRenderer?: any,
    errorRenderer?: any,
    children: any
}) {
    return (
        <>
            {
                (loading) ? (
                    loaderRenderer
                ) : (error) ? (
                    errorRenderer
                ) : children
            }
        </>
    )
}