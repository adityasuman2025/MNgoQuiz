import WithAuth from "mngo-project-tools/hocs/WithAuth";
import ActionBtn from "mngo-project-tools/comps/ActionBtn";
import FileInput from "mngo-project-tools/comps/FileInput";
import { LOGGED_USER_TOKEN_COOKIE_NAME } from "../constants";

function AdminDashboard() {
    return (
        <div className='mngo-h-screen mngo-flex mngo-flex-col mngo-items-center mngo-justify-center'>
            Upload Web Tech Doc HTML File
            <FileInput
                accept=".html"
                onChange={(e: any) => console.log(e.target.files)}
            >
                <ActionBtn text="Upload" />
            </FileInput>
        </div>
    )
}


function redirectToAdminLogin() {
    window.location.href = "/admin";
}

export default WithAuth(AdminDashboard, LOGGED_USER_TOKEN_COOKIE_NAME, redirectToAdminLogin);