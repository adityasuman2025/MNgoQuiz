import getLogoImgXxs from "mngo-project-tools/getLogoImgXxs";
import Timer from "./Timer";
import { PROJECT_NAME } from "../constants";

export default function QuizHeader({
    title = "MNgo",
}: {
    title?: string;
}) {
    return (
        <header
            className="mngo-quiz-background mngo-fixed mngo-top-0 mngo-w-full mngo-text-center mngo-drop-shadow-lg mngo-py-2.5 mngo-z-10 mngo-flex mngo-items-center mngo-justify-between"
        >
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
        </header>
    )
}