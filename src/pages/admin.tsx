import LoginForm from "mngo-project-tools/comps/LoginForm";
import { PROJECT_NAME } from "../constants";

export default function Admin() {
    return (
        <div className='mngo-h-screen mngo-flex mngo-items-center mngo-justify-center'>
            <LoginForm
                styles={{
                    inputClassName: "mngo-light-input mngo-border-none",
                }}
                projectTitle={PROJECT_NAME}
                hideSignUpBtn={true}
            />
        </div>
    )
}