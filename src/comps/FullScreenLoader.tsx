import LoadingAnimation from "mngo-project-tools/comps/LoadingAnimation";

export default function FullScreenLoader() {
    return (
        <div className='mngo-h-screen mngo-flex mngo-items-center mngo-justify-center'>
            <LoadingAnimation loading styles={{ loaderClassName: "mngo-loader" }} />
        </div>
    )
}