import React from "react";
import CommittedInfoSection from "../../components/sections/committedInfoSection/CommittedInfoSection";
import ConnectionsSection from "../../components/sections/connectionsSection/ConnectionsSection";
import SaasSolutionSection from "../../components/sections/saasSolutionSection/SaasSolutionSection";

function LandingScreen() {
  return (
    <div className="dkLandingScreen">
      <CommittedInfoSection />
      <SaasSolutionSection />
      <ConnectionsSection />
    </div>
  );
}

export default LandingScreen;
