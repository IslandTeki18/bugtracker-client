import React from 'react'
import CommittedInfoSection from '../../components/sections/committedInfoSection/CommittedInfoSection'
import SaasSolutionSection from '../../components/sections/saasSolutionSection/SaasSolutionSection'

function LandingScreen() {
  return (
    <div className="dkLandingScreen">
        <CommittedInfoSection />
        <SaasSolutionSection />
    </div>
  )
}

export default LandingScreen