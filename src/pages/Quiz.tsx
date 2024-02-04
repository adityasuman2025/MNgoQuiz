import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router';
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import WithData from "mngo-project-tools/hocs/WithData";
import { getCacheRegular, setCacheRegular } from "mngo-project-tools/cachingUtils";
import { QuizHeader, LearnMode, QuizMode } from "../comps";
import { API_BASE_URL, API_FILE_REF, QUIZ_JSON_FILE_LOCATION, QUIZ_JSON_FILE_NAME, QUIZ_DATA_KEY, APP_MODE_KEY, APP_MODES, APP_MODE_LEARN, APP_MODE_QUIZ } from '../constants';

const APP_MODE_CACHE: any = getCacheRegular(APP_MODE_KEY);
const APP_MODE: APP_MODES = typeof APP_MODE_CACHE === "string" ? APP_MODE_CACHE as APP_MODES : APP_MODES[APP_MODE_LEARN];

function Quiz({
    data = {},
}: {
    data: { [key: string]: any },
}) {
    const { quizName = "" } = useParams() || {};

    const isMounted = useRef<boolean>(false);
    const [currentQuizData, setCurrentQuizData] = useState<string[]>([]);
    const [appMode, setAppMode] = useState<APP_MODES>(APP_MODE);

    useEffect(() => {
        const quizData = data?.[0] || {};

        if (!isMounted.current && quizData?.hasOwnProperty(quizName)) {
            setCurrentQuizData(quizData?.[quizName]);
        }

        isMounted.current = true;
    }, [data]); // data comes 2 times one from localstorage and other from api, so we need to use only the first coming and ignore the second one

    function handleSwitchMode() {
        const newAppMode = appMode === APP_MODES[APP_MODE_QUIZ] ? APP_MODES[APP_MODE_LEARN] : APP_MODES[APP_MODE_QUIZ];

        setCacheRegular(APP_MODE_KEY, newAppMode);
        setAppMode(newAppMode);
    }

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-text-center mngo-m-auto'>
            {
                (Object.keys(currentQuizData || {}).length > 0) ? (
                    <>
                        <QuizHeader title={quizName} appMode={appMode} onSwitchMode={handleSwitchMode} />

                        {
                            appMode === APP_MODES[APP_MODE_QUIZ] ? (
                                <QuizMode quizName={quizName} currentQuizData={currentQuizData} />
                            ) : (
                                <LearnMode quizName={quizName} currentQuizData={currentQuizData} />
                            )
                        }
                    </>
                ) : (
                    <p className="mngo-mt-10 mngo-text-2xl">Quiz Not Found</p>
                )
            }
        </section>
    )
}

export default WithData(React.memo(Quiz), [{ url: `${API_BASE_URL}${API_FILE_REF}?location=${QUIZ_JSON_FILE_LOCATION}&fileName=${QUIZ_JSON_FILE_NAME}` }], {
    storageDataKey: QUIZ_DATA_KEY,
    loaderOrErrorRenderer: function (hasError: boolean, error: string) {
        return (
            <FullScreenLoader styles={{ loaderClassName: "mngo-loader" }}>
                <h2 className="mngo-mt-4">{hasError ? error : "MNgo Quiz"}</h2>
            </FullScreenLoader>
        )
    }
});