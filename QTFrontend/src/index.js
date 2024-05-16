import React from "react";
import "bootswatch/dist/vapor/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import * as reactRouterDom from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import FAQ from "./pages/FAQ.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import Settings from "./pages/Settings.tsx";
import TemplateCreation from "./pages/TemplateCreation.tsx";
import TemplateDetails from "./pages/TemplateDetails.tsx";
import Profile from "./pages/Profile.tsx";
import Tracking from "./pages/Tracking.tsx";
import { ReactFlowProvider } from "reactflow";
import SuperTokens, {
  SuperTokensWrapper,
} from "supertokens-auth-react/index.js";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui/index.js";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword/index.js";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session/index.js";
import axios from "axios";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "QuestTrackr",
    apiDomain: "http://localhost:5000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  languageTranslations: {
    translations: {
      en: {
        EMAIL_PASSWORD_EMAIL_LABEL: "Username",
      },
    },
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        signInForm: {
          formFields: [
            {
              id: "email",
              label: "Username",
              placeholder: "Username",
            },
          ],
        },
        signUpForm: {
          formFields: [
            {
              id: "email",
              label: "Username",
              placeholder: "Username",
              validate: async (input) => {
                // the backend validates this anyway. So nothing required here
                return undefined;
              },
            },
          ],
        },
        providers: [
        ],
      },
      onHandleEvent: async (context) => {
        if (context.action === "SUCCESS") {
          if (
            context.isNewRecipeUser &&
            context.user.loginMethods.length === 1
          ) {
            //New sign up -- add to DB
            await axios.post(`http://localhost:5000/api/v1/users`, {
              supertokensId: context.user.id,
              username: context.user.emails[0],
            });
          } else {
            //Sign in
          }
        }
      },
    }),
    Session.init(),
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
              path="/profile/:username"
              element={<Profile />}
            />
            <reactRouterDom.Route
              path="/track/:username/:templateId"
              element={<Tracking />}
            />
          </reactRouterDom.Routes>
        </SuperTokensWrapper>
      </reactRouterDom.BrowserRouter>
    </ReactFlowProvider>
  </React.StrictMode>
);
