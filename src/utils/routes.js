import AdminPage from "../pages/AdminPage"
import AuthPage from "../pages/AuthPage"
import Basvuru from "../pages/Basvuru"
import Basvuru2 from "../pages/Basvuru2"
import Homepage from "../pages/Homepage"
import ReadAnswer from "../pages/ReadAnswer"
import RegisterAuth from "../pages/RegisterAuth"

export const REDIRECT_PATH = {
    AUTH: "/",
    HOME: "/home",
    ADMIN: "/admin",
    BASVURU: "/basvuru",
    BASVURU2: "/basvuru2",
    READ_ANSWER: "/read-answer",
    REGISTER: "/register"
}

export const ROUTES = [
    {
        compoment: <Homepage/>,
        path: REDIRECT_PATH.HOME,
        protected: true
    },
    {
        compoment: <AuthPage/>,
        path: REDIRECT_PATH.AUTH,
        protected: false
    },
    {
        compoment: <AdminPage/>,
        path: REDIRECT_PATH.ADMIN,
        protected: true
    },
    {
        compoment: <Basvuru/>,
        path: REDIRECT_PATH.BASVURU,
        protected: true
    },
    {
        compoment: <Basvuru2/>,
        path: REDIRECT_PATH.BASVURU2,
        protected: true
    },
    {
        compoment: <ReadAnswer/>,
        path: REDIRECT_PATH.READ_ANSWER,
        protected: true
    },
    {
        compoment: <RegisterAuth/>,
        path: REDIRECT_PATH.REGISTER,
        protected: false
    }
]

export const REDIRECT_TO_URL = (url) =>  window.location.replace(url);


