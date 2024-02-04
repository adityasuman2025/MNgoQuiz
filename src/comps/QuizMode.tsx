import React, { useState, useEffect } from "react";
import { MNgoImageAnnotate } from "react-image-annotate-mngo";
import BottomModal from "mngo-project-tools/comps/BottomModal";
import LinkDetector from "mngo-project-tools/comps/LinkDetector";
import { getCacheRegular, setCacheRegular } from "mngo-project-tools/cachingUtils";
import { Carousel, OpenLinkInNewTab } from "../comps";
import { MACHINE_CODING_FILE_LOCATION, TYPE_SOLUTION, TYPE_SCRATCHPAD, SCRATCHPAD_DATA_KEY } from '../constants';
import { shuffle, toSentenceCase } from '../utils';
import whiteBg from "../imgs/whiteBg.jpg";

let timerRef: any = null;
const SCRATHCPAD_DATA = getCacheRegular(SCRATCHPAD_DATA_KEY, "{}");

function QuizMode({
    quizName,
    currentQuizData = {},
}: {
    quizName: string;
    currentQuizData: { [key: string]: any };
}) {
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [modalData, setModalData] = useState<{ [key: string]: any }>({ isOpen: false, type: "", content: "" });

    const [quizScratchpadData, setQuizScratchpadData] = useState<{ [key: string]: any }>(SCRATHCPAD_DATA[quizName] || {});

    useEffect(() => {
        if (currentQuizData) setQuizQuestions(shuffle(Object.keys(currentQuizData || {})));
    }, [currentQuizData]);

    useEffect(() => {
        if (Object.keys(quizScratchpadData).length) {
            clearTimeout(timerRef);
            timerRef = setTimeout(() => {
                setCacheRegular(SCRATCHPAD_DATA_KEY, { ...SCRATHCPAD_DATA, [quizName]: quizScratchpadData });
            }, 600);
        }

    }, [quizScratchpadData]);

    function handleSolutionClick() {
        const currentQstn = quizQuestions?.[currentQuestionIdx];

        const currentQstnSolution = (currentQuizData?.[currentQstn] || []).join("");

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
        <>
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
                            className="mngo-cursor-pointer mngo-text-base mngo-drop-shadow-lg mngo-p-2 mngo-text-slate-300 mngo-text-secndry-2"
                            onClick={handleSolutionClick}
                        >
                            view solution
                        </button>
                        <br />

                        <button className="mngo-cursor-pointer mngo-text-lg mngo-drop-shadow-lg mngo-p-2 mngo-text-white mngo-transition mngo-duration-300 hover:mngo-scale-110 " onClick={handleScratchpadClick}>scratchpad</button>
                    </div>
                </div>
            </Carousel>

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
        </>
    )
}

export default React.memo(QuizMode);