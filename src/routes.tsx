import QrScan from "./pages/QRScan/QrScan";
import EarnPointsPage from "./pages/EarnPoints/EarnPointsPage";
import LocationSearchPage from "./pages/locationSearch/LocationSearchPage";
import LoginPage from "./pages/login/LoginPage";
import MemberSearchPage from "./pages/memberSearch/MemberSearchPage";

const routes = [
  {
    path: "/",
    component: <LoginPage />,
  },
  {
    path: "login",
    component: <LoginPage />,
  },
  {
    path: "location-search",
    component: <LocationSearchPage />,
  },
  {
    path: "member-search",
    component: <MemberSearchPage />,
  },
  {
    path: "qr-scan",
    component: <QrScan />,
  },
  {
    path: "earn-points",
    component: <EarnPointsPage />,
  },
];

export default routes;
