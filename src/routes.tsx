import QrScan from "./pages/QRScan/QrScan";
import LocationSearchPage from "./pages/locationSearch/LocationSearchPage";
import LoginPage from "./pages/login/LoginPage";
import MemberSearchPage from "./pages/memberSearch/MemberSerachPage";

const  routes = [
    {
      path: "/",
      component: <LoginPage />,
    },
    {
      path: "login",
      component: <LoginPage />,
    },
    {
      path: "member-search",
      component: <MemberSearchPage />,
    },
    {
      path: "location-search",
      component: <LocationSearchPage />,
    }, {
      path: "qr-scan",
      component: <QrScan />,
    },
  ];


export default routes;
