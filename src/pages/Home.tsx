import React, { useState, useEffect } from "react";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import WithData from "mngo-project-tools/hocs/WithData";
import { API_BASE_URL, API_FILE_REF } from '../constants';

function Home({
    data = {},
}: {
    data: any;
}) {
    const quizData = data?.[0];
    console.log("data", JSON.stringify(Object.keys(quizData)))

    return (
        <section className='mngo-text-center'>
            <h2>
                nice one
                {JSON.stringify(Object.keys(quizData))}
            </h2>
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