export function htmlToObject(htmlContent: HTMLElement) {
    const TITLE_IDENTIFIER = ["title"]; // classes that identify a title
    const QSTN_IDENTIFIER = ["h1"]; // tags that identify a question

    function hasClass(classList: any, classNames: string[]) {
        return classNames.findIndex(className => classList.contains(className)) > -1;
    }

    const json: { [key: string]: any } = {};

    let currentTitle, currentQstn;
    const children: any = htmlContent.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const classList = child.classList;

        const isTitle = hasClass(classList, TITLE_IDENTIFIER);
        const isQstn = QSTN_IDENTIFIER.includes(child.tagName.toLowerCase());

        if (isTitle) {
            currentTitle = child.innerText;
            currentQstn = null; // if current dom element is title then reset currentQstn
        }
        if (isQstn) currentQstn = child.innerText;

        if (currentTitle && currentQstn) {
            if (!json?.[currentTitle]) json[currentTitle] = {};
            if (!json?.[currentTitle]?.[currentQstn]) json[currentTitle][currentQstn] = [];

            if (!isTitle && !isQstn) {
                json[currentTitle][currentQstn].push(child.outerHTML);
            }
        }
    }

    return json;
}

export function objectToFile(obj: { [key: string]: any }) {
    const jsonString = JSON.stringify(obj);

    const blob = new Blob([jsonString], { type: 'application/json' }); // Create a Blob from the JSON string
    const file = new File([blob], 'data.json', { type: 'application/json' }); // Create a file from the Blob

    return file;
}
