import React from "react";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import WithData from "mngo-project-tools/hocs/WithData";
import getLogoImg from "mngo-project-tools/getLogoImg";
import { API_BASE_URL, API_FILE_REF, PROJECT_NAME } from '../constants';
import { QuizListItem } from '../comps';

function Home({
    data = {},
}: {
    data: { [key: string]: any },
}) {
    const quizData = data?.[0] || {};

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-flex mngo-flex-col mngo-items-center'>
            <figure className="mngo-mt-10 mngo-mb-1">
                <img src={getLogoImg()} alt="mngo logo" width={200} height={200} />
                <figcaption className="mngo-text-center"><h1>{PROJECT_NAME}</h1></figcaption>
            </figure>

            <h4>practice interview questions</h4>

            <ul className="mngo-my-8">
                {
                    Object.keys(quizData).map((key: string, idx) => (
                        <QuizListItem
                            key={key + "_" + idx}
                            quizTitle={key}
                        />
                    ))
                }
            </ul>
        </section>
    )
}

export default WithData(React.memo(Home), [{ url: `${API_BASE_URL}${API_FILE_REF}?location=quiz&fileName=quiz.json` }], {
    storageDataKey: "quizData",
    loaderOrErrorRenderer: function (hasError: boolean, error: string) {
        return (
            <FullScreenLoader styles={{ loaderClassName: "mngo-loader" }}>
                <h2 className="mngo-mt-4">{hasError ? error : "MNgo Quiz"}</h2>
            </FullScreenLoader>
        )
    }
});