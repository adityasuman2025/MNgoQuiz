import React, { useState } from "react";
import WithAuth from "mngo-project-tools/hocs/WithAuth";
import ActionBtn from "mngo-project-tools/comps/ActionBtn";
import FileInput from "mngo-project-tools/comps/FileInput";
import SnackBar from "mngo-project-tools/comps/SnackBar";
import { LOGGED_USER_TOKEN_COOKIE_NAME } from "../constants";
import { htmlToObject, objectToFile } from "../utils";
import { uploadQuizJSON } from "../apis";

function AdminDashboard() {
    const [showLoader, setShowLoader] = useState(false);
    const [snackBarData, setSnackBarData] = useState<{ [key: string]: any }>({ visisible: false, msg: "", type: "" });

    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        setShowLoader(true);

        const fileList: any = event?.target?.files;
        const file: File = fileList[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = async function (event: ProgressEvent<FileReader>) { // converting file to html string
                try {
                    const stringContent = event?.target?.result;
                    const htmlContent: any = document.createElement('div')
                    htmlContent.innerHTML = stringContent;

                    const obj = htmlToObject(htmlContent) || {};
                    if (obj && !Object.keys(obj).length) throw new Error("Invalid file");

                    const file = objectToFile(obj);

                    await uploadQuizJSON(file);
                    setShowLoader(false);
                    makeSnackBar("quiz json uploaded successfully", "success");
                } catch (e: any) {
                    setShowLoader(false);
                    makeSnackBar(e.message);
                }
            }
            reader.readAsText(file);
        }
    }

    function makeSnackBar(msg: string, type: string = "error") {
        setSnackBarData({ visisible: true, msg, type });
    }

    return (
        <section className='mngo-h-screen mngo-flex mngo-flex-col mngo-items-center mngo-justify-center'>
            Upload Web Tech Doc HTML File
            <FileInput
                accept=".html"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (!showLoader) handleFileUpload(event);
                }}
            >
                <ActionBtn text="Upload" showLoader={showLoader} />
            </FileInput>

            <SnackBar
                open={snackBarData.visisible}
                msg={snackBarData.msg}
                type={snackBarData.type}
                onClose={() => setSnackBarData({ visisible: false })}
            />
        </section>
    )
}


function redirectToAdminLogin() {
    window.location.href = "/admin";
}

export default WithAuth(AdminDashboard, LOGGED_USER_TOKEN_COOKIE_NAME, redirectToAdminLogin);