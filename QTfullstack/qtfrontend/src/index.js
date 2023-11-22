import React from "react";
import "bootswatch/dist/vapor/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import * as reactRouterDom from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import FAQ from "./pages/FAQ.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Settings from "./pages/Settings.tsx";
import TemplateCreation from "./pages/TemplateCreation.tsx";
import TemplateDetails from "./pages/TemplateDetails.tsx";
import MyTemplates from "./pages/MyTemplates.tsx";
import { ReactFlowProvider } from "reactflow";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react/index.js";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui/index.js";
import ThirdPartyEmailPassword, {
  Github,
  Google,
  Facebook,
  Apple,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword/index.js";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session/index.js";
import EmailVerification from "supertokens-auth-react/recipe/emailverification/index.js";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "QuestTrackr",
    apiDomain: "http://localhost:5000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
    EmailVerification.init({
      mode: "REQUIRED", // or "OPTIONAL"
    }),
  ],
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <reactRouterDom.BrowserRouter>
        <SuperTokensWrapper>
          <reactRouterDom.Routes>
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
              ThirdPartyEmailPasswordPreBuiltUI,
            ])}
            <reactRouterDom.Route path="/*" element={<Home />} exact />
            <reactRouterDom.Route path="/about" element={<About />} />
            <reactRouterDom.Route path="/faq" element={<FAQ />} />
            <reactRouterDom.Route
              path="/gamedetails/:gameId"
              element={<GameDetails />}
            />
            <reactRouterDom.Route path="/privacy" element={<PrivacyPolicy />} />
            <reactRouterDom.Route path="/settings" element={<Settings />} />
            <reactRouterDom.Route
              path="/templatecreate/:gameId/:templateId"
              element={<TemplateCreation />}
            />
            <reactRouterDom.Route
              path="/:gameId/template/:templateId"
              element={<TemplateDetails />}
            />
            <reactRouterDom.Route
              path="/mytemplates"
              element={<MyTemplates />}
            />
          </reactRouterDom.Routes>
        </SuperTokensWrapper>
      </reactRouterDom.BrowserRouter>
    </ReactFlowProvider>
  </React.StrictMode>
);
