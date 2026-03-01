export function generateStartupReport(profile: any) {
    if (!profile) return null;
  
    const scores = {
      marketing: calculateMarketing(profile),
      product: calculateProduct(profile),
      finance: calculateFinance(profile),
      operations: calculateOperations(profile),
      team: calculateTeam(profile),
    };
  
    const strengths = [];
    const weaknesses = [];
  
    Object.entries(scores).forEach(([key, value]) => {
      if (value >= 7) strengths.push(key);
      if (value <= 4) weaknesses.push(key);
    });
  
    const tools = recommendTools(weaknesses);
  
    return {
      scores,
      strengths,
      weaknesses,
      tools,
    };
  }
  
  /* ===== SCORING LOGIC ===== */
  
  function calculateMarketing(profile: any) {
    let score = 0;
  
    if (profile.hasMarketingStrategy) score += 3;
    if (profile.customerAcquisitionChannels?.length > 2) score += 3;
    if (profile.monthlyGrowthRate > 10) score += 2;
    if (profile.brandDefined) score += 2;
  
    return Math.min(score, 10);
  }
  
  function calculateProduct(profile: any) {
    let score = 0;
  
    if (profile.hasMVP) score += 3;
    if (profile.productMarketFit) score += 4;
    if (profile.userFeedbackSystem) score += 3;
  
    return Math.min(score, 10);
  }
  
  function calculateFinance(profile: any) {
    let score = 0;
  
    if (profile.hasRevenue) score += 4;
    if (profile.runwayMonths > 6) score += 3;
    if (profile.hasFinancialTracking) score += 3;
  
    return Math.min(score, 10);
  }
  
  function calculateOperations(profile: any) {
    let score = 0;
  
    if (profile.hasProcessDocumentation) score += 4;
    if (profile.teamSize > 3) score += 3;
    if (profile.hasKPIs) score += 3;
  
    return Math.min(score, 10);
  }
  
  function calculateTeam(profile: any) {
    let score = 0;
  
    if (profile.founderExperienceYears > 3) score += 4;
    if (profile.hasTechnicalCoFounder) score += 3;
    if (profile.teamDiversity) score += 3;
  
    return Math.min(score, 10);
  }
  
  /* ===== TOOL RECOMMENDER ===== */
  
  function recommendTools(weaknesses: string[]) {
    const toolDatabase: any = {
      marketing: [
        "HubSpot (Free CRM)",
        "Google Analytics",
        "Canva Pro"
      ],
      product: [
        "Figma",
        "Notion",
        "Hotjar"
      ],
      finance: [
        "QuickBooks",
        "Wave (Free Accounting)",
        "Stripe Dashboard"
      ],
      operations: [
        "ClickUp",
        "Asana",
        "Zapier"
      ],
      team: [
        "Slack",
        "Linear",
        "Miro"
      ]
    };
  
    let recommendations: string[] = [];
  
    weaknesses.forEach(area => {
      recommendations.push(...(toolDatabase[area] || []));
    });
  
    return recommendations.slice(0, 5);
  }
  