import { memo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from './pages/admin'

function Routes() {
    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <Admin />,
        },

        {
            path: "*",
            element: <Admin />,
        }
    ]);

    return <RouterProvider router={router} />;
}

export default memo(Routes);