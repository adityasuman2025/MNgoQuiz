import getLogoImgXxs from "mngo-project-tools/getLogoImgXxs";
import Timer from "./Timer";
import { PROJECT_NAME, APP_MODES, APP_MODE_LEARN, APP_MODE_QUIZ } from "../constants";

export default function QuizHeader({
    title = "MNgo",
    appMode = APP_MODES[APP_MODE_LEARN],
    onSwitchMode,
}: {
    title?: string;
    appMode?: APP_MODES;
    onSwitchMode?: () => void;
}) {
    return (
        <header
            className="mngo-fixed mngo-top-0 mngo-w-full mngo-text-center mngo-z-10"
        >
            <div className="mngo-quiz-background mngo-flex mngo-items-center mngo-justify-between mngo-py-2.5 mngo-drop-shadow-lg">
                <p className="mngo-w-1/3 mngo-ml-3">
                    <a href="/" className="mngo-flex mngo-items-center mngo-no-underline mngo-w-fit mngo-text-white">
                        <img src={getLogoImgXxs()} alt="mngo logo" width={30} height={30} />
                        <span className="md:mngo-ml-2 mngo-ml-1 mngo-font-bold">{PROJECT_NAME}</span>
                    </a>
                </p>

                <h1 className="md:mngo-text-xl mngo-text-lg md:mngo-w-1/3 mngo-w-2/3 mngo-text-right md:mngo-text-center mngo-mr-3">{title}</h1>

                <div className="md:mngo-block mngo-hidden mngo-w-1/3 mngo-mr-3">
                    <Timer />
                </div>
            </div>
            <button className="mngo-bckgrnd-1 mngo-w-full mngo-py-2 mngo-text-white mngo-cursor-pointer" onClick={onSwitchMode}>
                switch to {appMode === APP_MODE_QUIZ ? APP_MODE_LEARN : APP_MODE_QUIZ} mode
            </button>
        </header>
    )
}