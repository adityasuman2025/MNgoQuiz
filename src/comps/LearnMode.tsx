import React, { useState, useEffect } from "react";
import LinkDetector from "mngo-project-tools/comps/LinkDetector";
import { OpenLinkInNewTab } from "../comps";
import { MACHINE_CODING_FILE_LOCATION } from '../constants';

function LearnMode({
    quizName,
    currentQuizData = {},
}: {
    quizName: string;
    currentQuizData: { [key: string]: any };
}) {
    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number | undefined>();
    const [questionSolution, setQuestionSolution] = useState<string>("");

    useEffect(() => {
        if (currentQuizData) {
            setQuizQuestions(Object.keys(currentQuizData || {}));
            setCurrentQuestionIdx(0);
        }
    }, [currentQuizData]);

    useEffect(() => {
        if (currentQuestionIdx === undefined) return;

        const currentQstn = quizQuestions?.[currentQuestionIdx];
        const currentQstnSolution = (currentQuizData?.[currentQstn] || []).join("");

        if (currentQstnSolution) setQuestionSolution(currentQstnSolution);
    }, [currentQuestionIdx]);

    return (
        <section className='mngo-h-full mngo-flex md:mngo-flex-row mngo-flex-col mngo-text-left'>
            <aside className='mngo-h-full mngo-overflow-hidden md:mngo-w-3/12 mngo-flex'>
                <ul className='md:mngo-mt-28 mngo-mt-24 mngo-flex-1 mngo-overflow-auto'>
                    {
                        quizQuestions.map((question, idx) => (
                            <li key={`${question}_${idx}`}
                                className={`
                                    mngo-question md:mngo-p-3 mngo-p-2 mngo-mb-1 mngo-cursor-pointer mngo-list-none
                                    md:mngo-text-base mngo-text-sm
                                    ${currentQuestionIdx === idx ? 'mngo-transp-bckgrnd-1' : 'mngo-transp-bckgrnd'}
                                `}
                                onClick={() => setCurrentQuestionIdx(idx)}
                            >
                                {`${idx + 1}. `}
                                {
                                    question?.includes(MACHINE_CODING_FILE_LOCATION) ?
                                        <LinkDetector linkRenderor={(_: string, link: string) => <a href={link} target="_blank" rel="noopener noreferrer">Demo</a>}>
                                            {question}
                                        </LinkDetector>
                                        : question
                                }
                            </li>
                        ))
                    }
                </ul>
            </aside>

            <section className='mngo-h-full mngo-overflow-hidden md:mngo-w-9/12 mngo-flex'>
                <div className='md:mngo-mt-28 mngo-mt-2 mngo-mb-4 mngo-mx-4 md:mngo-p-3 mngo-p-2 mngo-rounded-lg mngo-text-sm mngo-solution-2 mngo-overflow-auto mngo-flex-1 mngo-transp-bckgrnd-1'>
                    <OpenLinkInNewTab htmlString={questionSolution} />
                </div>
            </section>
        </section>
    )
}

export default React.memo(LearnMode);