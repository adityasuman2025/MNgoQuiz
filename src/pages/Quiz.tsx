import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router';
import { MNgoImageAnnotate } from "react-image-annotate-mngo";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import BottomModal from "mngo-project-tools/comps/BottomModal";
import WithData from "mngo-project-tools/hocs/WithData";
import LinkDetector from "mngo-project-tools/comps/LinkDetector";
import { getCacheRegular, setCacheRegular } from "mngo-project-tools/cachingUtils";
import { QuizHeader, Carousel } from "../comps";
import { API_BASE_URL, API_FILE_REF, QUIZ_JSON_FILE_LOCATION, QUIZ_JSON_FILE_NAME, MACHINE_CODING_FILE_LOCATION, TYPE_SOLUTION, TYPE_SCRATCHPAD, QUIZ_DATA_KEY, SCRATCHPAD_DATA_KEY } from '../constants';
import { shuffle, toSentenceCase } from '../utils';
import whiteBg from "../imgs/whiteBg.jpg";

function OpenLinkInNewTab({
    htmlString = "",
}: {
    htmlString: string
}) {
    const [modifiedHtmlString, setModifiedHtmlString] = useState<string>("");

    useEffect(() => {
        const dummyEle = document.createElement('div');
        dummyEle.innerHTML = htmlString;

        const allLinksInsideContent = dummyEle.querySelectorAll('a');
        allLinksInsideContent.forEach((link) => link.setAttribute('target', '_blank'));

        setModifiedHtmlString(dummyEle.innerHTML);
    }, [htmlString]);

    return <div dangerouslySetInnerHTML={{ __html: modifiedHtmlString }} />
}

let timerRef: any = null;
const SCRATHCPAD_DATA = getCacheRegular(SCRATCHPAD_DATA_KEY, "{}");

function Quiz({
    data = {},
}: {
    data: { [key: string]: any },
}) {
    const { quizName = "" } = useParams() || {};

    const isMounted = useRef<boolean>(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [modalData, setModalData] = useState<{ [key: string]: any }>({ isOpen: false, type: "", content: "" });

    const [quizScratchpadData, setQuizScratchpadData] = useState<{ [key: string]: any }>(SCRATHCPAD_DATA[quizName] || {});

    useEffect(() => {
        if (Object.keys(quizScratchpadData).length) {
            clearTimeout(timerRef);
            timerRef = setTimeout(() => {
                setCacheRegular(SCRATCHPAD_DATA_KEY, { ...SCRATHCPAD_DATA, [quizName]: quizScratchpadData });
            }, 600);
        }

    }, [quizScratchpadData]);

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
            setModalData({ isOpen: true, type: TYPE_SOLUTION, content: currentQstnSolution });
        }
    }

    function handleScratchpadClick() {
        setModalData({ isOpen: true, type: TYPE_SCRATCHPAD });
    }

    const question = quizQuestions?.[currentQuestionIdx] || "";
    const isMachineCodingQuestion = question?.includes(MACHINE_CODING_FILE_LOCATION);

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-text-center mngo-m-auto'>
            {
                (quizQuestions.length > 0) ? (
                    <>
                        <QuizHeader title={quizName} />

                        <Carousel
                            disableLeft={currentQuestionIdx === 0}
                            disableRight={currentQuestionIdx === quizQuestions.length - 1}
                            onLeftClick={() => {
                                setModalData({ isOpen: false });
                                setCurrentQuestionIdx(prev => prev - 1);
                            }}
                            onRightClick={() => {
                                setModalData({ isOpen: false });
                                setCurrentQuestionIdx(prev => prev + 1);
                            }}
                        >
                            <div className="mngo-flex-1 mngo-h-full mngo-flex mngo-flex-col mngo-justify-center mngo-relative">
                                <p className="mngo-text-light md:mngo-text-4xl mngo-text-xl mngo-question">
                                    {
                                        (isMachineCodingQuestion) ? (
                                            <LinkDetector
                                                linkRenderor={(word: string, link: string) => (<>
                                                    (<a href={link} target="_blank" rel="noopener noreferrer">Demo</a>)
                                                    <iframe src={link} width={"100%"} height={"600px"} className="mngo-border-none"></iframe>
                                                </>)}
                                            >
                                                {question}
                                            </LinkDetector>
                                        ) : (question)
                                    }
                                </p>

                                <div className="mngo-absolute mngo-left-0 mngo-bottom-2 mngo-w-full mngo-text-center">
                                    <p>{currentQuestionIdx + 1}/{quizQuestions.length}</p>
                                    <button
                                        className="mngo-cursor-pointer mngo-text-base mngo-drop-shadow-lg mngo-p-2 mngo-text-slate-300"
                                        onClick={handleSolutionClick}
                                    >
                                        view solution
                                    </button>
                                    <br />

                                    <button className="mngo-cursor-pointer mngo-text-lg mngo-drop-shadow-lg mngo-p-2 mngo-text-white mngo-transition mngo-duration-300 hover:mngo-scale-110 " onClick={handleScratchpadClick}>scratchpad</button>
                                </div>
                            </div>
                        </Carousel>
                    </>
                ) : (
                    <p className="mngo-mt-10 mngo-text-2xl">Quiz Not Found</p>
                )
            }


            {
                (modalData.isOpen) ? (
                    <BottomModal title={toSentenceCase(modalData.type)} onCloseClick={() => setModalData({ isOpen: false })}>
                        {
                            (modalData.type === TYPE_SOLUTION) ? (
                                <div className="mngo-text-sm mngo-solution">
                                    <OpenLinkInNewTab htmlString={modalData.content} />
                                </div>
                            ) : (
                                <section className="mngo-flex mngo-items-start mngo-flex-1 mngo-w-full mngo-h-full">
                                    <textarea
                                        autoFocus
                                        className="mngo-text-base mngo-flex-1 mngo-h-full mngo-border-none focus:mngo-outline-none mngo-resize-none"
                                        placeholder="write here..."
                                        value={quizScratchpadData?.text || ""}
                                        onChange={e => {
                                            setQuizScratchpadData({ ...quizScratchpadData, text: e.target.value || "" });
                                        }}
                                    />

                                    <div className="lg:mngo-block mngo-hidden mngo-h-full mngo-overflow-hidden">
                                        <MNgoImageAnnotate
                                            compMaxHeight={"100%"}
                                            image={whiteBg}
                                            imgWidth={quizScratchpadData?.annotData?.imgWidth || window.innerWidth / 2 - 50}
                                            annotations={quizScratchpadData?.annotData?.annotations || []}
                                            onChange={(annots: { [key: string]: any }) => {
                                                setQuizScratchpadData({ ...quizScratchpadData, annotData: annots || {} });
                                            }}
                                        />
                                    </div>
                                </section>
                            )
                        }
                    </BottomModal>
                ) : null
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