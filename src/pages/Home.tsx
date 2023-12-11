import React from "react";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import WithData from "mngo-project-tools/hocs/WithData";
import getLogoImg from "mngo-project-tools/getLogoImg";
import { API_BASE_URL, API_FILE_REF, PROJECT_NAME, QUIZ_JSON_FILE_LOCATION, QUIZ_JSON_FILE_NAME, QUIZ_DATA_KEY } from '../constants';
import { QuizListItem } from '../comps';

function Home({
    data = {},
}: {
    data: { [key: string]: any },
}) {
    const quizData = data?.[0] || {};

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-text-center mngo-m-auto'>
            <figure className="mngo-mt-10 mngo-mb-1">
                <img src={getLogoImg()} alt="mngo logo" width={250} height={250} />
                <figcaption className="mngo-text-center"><h1>{PROJECT_NAME}</h1></figcaption>
            </figure>

            <p>practice interview questions</p>

            <ul className="mngo-my-8 mngo-mx-auto mngo-w-10/12 sm:mngo-w-1/2 mngo-list-none">
                {
                    Object.keys(quizData).map((key: string, idx) => (
                        <QuizListItem
                            key={key + "_" + idx}
                            quizTitle={key}
                            onClick={() => {
                                window.location.href = `/quiz/${key}`;
                            }}
                        />
                    ))
                }
            </ul>

            <footer className="mngo-text-xs mngo-py-4">
                <small>© 2023 MNgo Quiz</small>
                <p>Developed by <a className="mngo-footer-developer" href="https://adityasuman.mngo.in" target="_blank">Aditya Suman</a></p>
            </footer>
        </section>
    )
}

export default WithData(React.memo(Home), [{ url: `${API_BASE_URL}${API_FILE_REF}?location=${QUIZ_JSON_FILE_LOCATION}&fileName=${QUIZ_JSON_FILE_NAME}` }], {
    storageDataKey: QUIZ_DATA_KEY,
    loaderOrErrorRenderer: function (hasError: boolean, error: string) {
        return (
            <FullScreenLoader styles={{ loaderClassName: "mngo-loader" }}>
                <h2 className="mngo-mt-4">{hasError ? error : "MNgo Quiz"}</h2>
            </FullScreenLoader>
        )
    }
});