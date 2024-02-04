import { useState, useEffect } from "react";

export default function OpenLinkInNewTab({
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