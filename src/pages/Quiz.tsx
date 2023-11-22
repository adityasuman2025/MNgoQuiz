import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import WithData from "mngo-project-tools/hocs/WithData";
import { API_BASE_URL, API_FILE_REF } from '../constants';

function Quiz({
    data = {},
}: {
    data: { [key: string]: any },
}) {
    const params = useParams();

    const quizData = data?.[0] || {};
    console.log("quizData", quizData, params)

    return (
        <section className='mngo-h-screen mngo-overflow-auto mngo-flex mngo-flex-col mngo-items-center'>
            quiz
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