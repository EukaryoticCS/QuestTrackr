import React from "react";
import "bootswatch/dist/vapor/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import ProtectedPage from "./pages/ProtectedPage.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import FAQ from "./pages/FAQ.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Settings from "./pages/Settings.tsx";
import TemplateCreation from "./pages/TemplateCreation.tsx";
import TemplateDetails from "./pages/TemplateDetails.tsx";
import Tracking from "./pages/Tracking.tsx";
import { ReactFlowProvider } from "reactflow";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route
          path="/sign-in/*"
          element={
            <SignIn redirectUrl={"/protected"} routing="path" path="/sign-in" />
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <SignUp redirectUrl={"/protected"} routing="path" path="/sign-up" />
          }
        />
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route path="/*" element={<Home />} exact />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route
          path="/gamedetails"
          element={
            <GameDetails/>
          }
        />
        {/* URLs will probably need to change */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/templatecreate" element={<TemplateCreation />} />
        <Route path="/template/:templateId" element={<TemplateDetails />} />
        <Route path="/track" element={<Tracking />} />
      </Routes>
    </ClerkProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <BrowserRouter>
        <ClerkWithRoutes />
      </BrowserRouter>
    </ReactFlowProvider>
  </React.StrictMode>
);
