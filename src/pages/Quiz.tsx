import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router';
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import BottomModal from "mngo-project-tools/comps/BottomModal";
import WithData from "mngo-project-tools/hocs/WithData";
import { Carousel } from "../comps";
import { API_BASE_URL, API_FILE_REF } from '../constants';
import { shuffle } from '../utils';

function Quiz({
    data = {},
}: {
    data: { [key: string]: any },
}) {
    const { quizName = "" } = useParams() || {};

    const isMounted = useRef<boolean>(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);

    const [isSolutionVisible, setIsSolutionVisible] = useState<boolean>(false);
    const [solution, setSolution] = useState<string>("");

    useEffect(() => {
        const quizData = data?.[0] || {};

        if (!isMounted.current && quizData?.hasOwnProperty(quizName)) {
            setQuizQuestions(shuffle(Object.keys(quizData?.[quizName] || {})))
        }

        isMounted.current = true;
    }, [data]); // data comes 2 times one from localstorage and other from api, so we need to use only the first coming and ignore the second one

    function handleSolutionClick() {
        const quizData = data?.[0] || {};

        const currentQuiz = quizData?.[quizName];
        const currentQstn = quizQuestions?.[currentQuestionIdx];

        const currentQstnSolution = (currentQuiz?.[currentQstn] || []).join("");

        if (currentQstnSolution) {
            setIsSolutionVisible(true);
            setSolution(currentQstnSolution);
        }
    }

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-text-center mngo-m-auto'>
            {
                (quizQuestions.length > 0) ? (
                    <>
                        <header
                            className="mngo-fixed mngo-top-0 mngo-left-0 mngo-w-full mngo-text-center mngo-drop-shadow-lg md:mngo-py-5 mngo-py-3.5 mngo-z-10"
                            style={{ background: "linear-gradient(120deg, var(--neon_passion_light), var(--neon_passion_dark))" }}
                        >
                            <h1 className=" md:mngo-text-2xl mngo-text-lg">{quizName}</h1>
                        </header>

                        <Carousel
                            disableLeft={currentQuestionIdx === 0}
                            disableRight={currentQuestionIdx === quizQuestions.length - 1}
                            onLeftClick={() => {
                                setIsSolutionVisible(false);
                                setCurrentQuestionIdx(prev => prev - 1);
                            }}
                            onRightClick={() => {
                                setIsSolutionVisible(false);
                                setCurrentQuestionIdx(prev => prev + 1);
                            }}
                        >
                            <div className="mngo-h-full mngo-flex mngo-flex-col mngo-justify-center mngo-relative">
                                <p className="mngo-text-light md:mngo-text-5xl mngo-text-xl mngo-mb-4">{quizQuestions[currentQuestionIdx]}</p>

                                <div className="mngo-absolute mngo-left-0 mngo-bottom-10 mngo-w-full mngo-text-center">
                                    <p>{currentQuestionIdx + 1}/{quizQuestions.length}</p>
                                    <button
                                        className="mngo-cursor-pointer mngo-text-lg mngo-drop-shadow-lg mngo-p-2 mngo-rounded-full mngo-mt-4 mngo-transition mngo-duration-300 hover:mngo-scale-110"
                                        style={{ color: "var(--burning_sky_light)" }}
                                        onClick={handleSolutionClick}
                                    >
                                        view solution
                                    </button>
                                </div>
                            </div>
                        </Carousel>
                    </>
                ) : (
                    <p className="mngo-mt-10 mngo-text-2xl">Quiz Not Found</p>
                )
            }


            {
                isSolutionVisible ?
                    <BottomModal
                        title="Solution"
                        onCloseClick={() => setIsSolutionVisible(false)}
                    >
                        <div className="" dangerouslySetInnerHTML={{ __html: solution }} />
                    </BottomModal>
                    : null
            }
        </section>
    )
}

export default WithData(React.memo(Quiz), [{ url: `${API_BASE_URL}${API_FILE_REF}?location=quiz&fileName=quiz.json` }], {
    storageDataKey: "quizData",
    loaderOrErrorRenderer: function (hasError: boolean, error: string) {
        return (
            <FullScreenLoader styles={{ loaderClassName: "mngo-loader" }}>
                <h2 className="mngo-mt-4">{hasError ? error : "MNgo Quiz"}</h2>
            </FullScreenLoader>
        )
    }
});