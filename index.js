
const file = document.getElementById('file');
file.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const fileList = event?.target?.files;
    const file = fileList[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = handleFileLoad;
        reader.readAsText(file);
    }
}

function handleFileLoad(event) {
    const stringContent = event?.target?.result;
    const htmlContent = document.createElement('div')
    htmlContent.innerHTML = stringContent;

    const obj = parseHtmlToObject(htmlContent);
    const file = objectToFile(obj);

    uploadFile(file);
}

function parseHtmlToObject(htmlContent) {
    const TITLE_IDENTIFIER = ["title"]; // classes that identify a title
    const QSTN_IDENTIFIER = ["h1"]; // tags that identify a question

    function hasClass(classList, classNames) {
        return classNames.findIndex(className => classList.contains(className)) > -1;
    }

    const json = {};

    let currentTitle, currentQstn;
    const children = htmlContent.children;
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

function objectToFile(obj) {
    const jsonString = JSON.stringify(obj);

    const blob = new Blob([jsonString], { type: 'application/json' }); // Create a Blob from the JSON string
    const file = new File([blob], 'data.json', { type: 'application/json' }); // Create a file from the Blob

    return file;
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = "https://apis.mngo.in" // "http://localhost:3001";
    const endPoint = `/api/upload?fileName=yoyo.json&location=${encodeURI('nice/pik')}`;

    fetch(baseUrl + endPoint, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
        })
        .catch(error => {
            console.error('Upload failed:', error);
        });
}