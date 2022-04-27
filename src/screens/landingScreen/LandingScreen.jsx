import React from "react";
import SubscriptionBanner from "../../components/banners/subscriptionBanner/SubscriptionBanner";
import CommittedInfoSection from "../../components/sections/committedInfoSection/CommittedInfoSection";
import ConnectionsSection from "../../components/sections/connectionsSection/ConnectionsSection";
import HowWeDoWorkSection from "../../components/sections/howWeDoWorkSection/HowWeDoWorkSection";
import SaasSolutionSection from "../../components/sections/saasSolutionSection/SaasSolutionSection";

function LandingScreen() {
  return (
    <div className="dkLandingScreen">
      <CommittedInfoSection />
      <SaasSolutionSection />
      <ConnectionsSection />
      <HowWeDoWorkSection />
      <SubscriptionBanner />
    </div>
  );
}

export default LandingScreen;
