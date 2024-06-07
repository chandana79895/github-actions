import EarnPointsPage from "./pages/EarnPoints/EarnPointsPage";
import QrScan from "./pages/QRScan/QrScan";
import ReceiptUpload from "./pages/ReceiptScan/ReceiptUpload";
import LocationSearchPage from "./pages/locationSearch/LocationSearchPage";
import LoginPage from "./pages/login/LoginPage";
import MemberDetails from "./pages/memberDetails/MemberDetails";
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
    path:"member-details",
    component: <MemberDetails/>
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
    path: "receipt",
    component: <ReceiptUpload />,
  },
  {
    path: "earn-points",
    component: <EarnPointsPage />,
  },
];

export default routes;
