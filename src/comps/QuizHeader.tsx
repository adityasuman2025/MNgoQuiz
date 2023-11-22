import getLogoImg from "mngo-project-tools/getLogoImg";
import Timer from "./Timer";
import { PROJECT_NAME } from "../constants";

export default function QuizHeader({
    title = "MNgo",
}: {
    title?: string;
}) {
    return (
        <header
            className="mngo-fixed mngo-top-0 mngo-w-full mngo-text-center mngo-drop-shadow-lg mngo-py-2.5 mngo-z-10 mngo-flex mngo-items-center mngo-justify-between"
            style={{ background: "linear-gradient(120deg, var(--neon_passion_light), var(--neon_passion_dark))" }}
        >
            <p className="mngo-flex mngo-items-center mngo-w-1/3 mngo-ml-3">
                <img src={getLogoImg()} alt="mngo logo" width={30} height={30} />
                <p className="md:mngo-ml-2 mngo-ml-1 mngo-font-bold">{PROJECT_NAME}</p>
            </p>

            <h1 className="md:mngo-text-xl mngo-text-lg md:mngo-w-1/3 mngo-w-2/3 mngo-text-right md:mngo-text-center mngo-mr-3">{title}</h1>

            <div className="md:mngo-block mngo-hidden mngo-w-1/3 mngo-mr-3">
                <Timer />
            </div>
        </header>
    )
}