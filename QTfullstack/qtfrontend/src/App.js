// import { useEffect } from 'react'
// import axios from 'axios'
import "bootswatch/dist/vapor/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
// import QTNavBar from "./components/QTNavBar.tsx";
// import GameCard from "./components/GameCard.tsx";
// import FlowChart from "./components/Flowchart.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import FAQ from "./pages/FAQ.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Register from "./pages/Register.tsx";
import Settings from "./pages/Settings.tsx";
import TemplateCreation from "./pages/TemplateCreation.tsx";
import TemplateDetails from "./pages/TemplateDetails.tsx";
import Tracking from "./pages/Tracking.tsx";

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
console.log(clerkPubKey)

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/game/:gameId" element={<GameDetails />} />{" "}
        {/* URLs will need to change */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/templatecreate" element={<TemplateCreation />} />
        <Route path="/template/:templateId" element={<TemplateDetails />} />
        <Route path="/track" element={<Tracking />} />
      </Routes>
    </ClerkProvider>
  );
};

export default App;
