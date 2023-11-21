import { WithAuth } from "../hocs";
import { LOGGED_USER_TOKEN_COOKIE_NAME } from "../constants";

function AdminDashboard() {
    return (
        <div className='mngo-h-screen mngo-flex mngo-items-center mngo-justify-center'>
            Admin Dashboard
        </div>
    )
}


function redirectToAdminLogin() {
    window.location.href = "/admin";
}

export default WithAuth(AdminDashboard, LOGGED_USER_TOKEN_COOKIE_NAME, redirectToAdminLogin);