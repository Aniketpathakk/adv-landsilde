// GeoRisk Sentinel - NE India Geotechnical Telemetry & GIS Dataset

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'mz', label: 'Mizo', native: 'Mizo' }
];

export const TRANSLATIONS = {
  en: {
    systemTitle: "GeoRisk Sentinel",
    subTitle: "NE India Landslide Early Warning & Infrastructure Resilience",
    districtSelect: "Monitoring Zone",
    offlineSync: "Offline Local Storage Sync Active",
    liveMesh: "Live Cloud Telemetry Mesh",
    broadcastSms: "Broadcast Disaster SMS",
    lastSynced: "Last telemetry sync",
    kpi: {
      criticalZones: "Critical Risk Sectors",
      roadStatus: "Monitored Arterial Roads",
      weatherAlert: "IMD Rainfall Trigger Index",
      responseRate: "Response Dispatch Rate"
    },
    gis: {
      title: "Geospatial Hazard & Telemetry Viewer",
      basemap: "Basemap",
      satellite: "Satellite Imagery",
      topo: "Topographic Contours",
      street: "OpenStreetMap Light",
      legend: "Landslide Risk Index (0.0 - 1.0)",
      layers: "Layer Overlays",
      heatmap: "2D Raster Probability Heatmap",
      corridors: "National Highway Corridors",
      telemetry: "Piezometer & Inclinometer Pins",
      reports: "Citizen Field Geotags"
    },
    sector: {
      title: "Excavations & Slope Sector Analytics",
      refName: "Ref Code",
      meanRisk: "Mean Risk",
      minRisk: "Min Risk",
      maxRisk: "Max Risk",
      stdDev: "Std Dev",
      status: "Safety Status",
      focus: "Locate",
      stabilitySummary: "Dynamic Slope Stability Summary",
      weeklyLevel: "Weekly Risk Level",
      peakProb: "Peak Weekly Probability",
      historicalMax: "Historical Max (Teesta Flood '23)",
      porePressure: "Piezometric Pore Water Pressure"
    },
    chart: {
      title: "Predictive Multi-Parametric Hydro-Geological Engine",
      subtitle: "15-Day Antecedent Rainfall vs. Landslide Failure Envelope",
      probEnvelope: "Failure Probability Envelope",
      rain10Acc: "10-Day Accum. Rain (mm)",
      rain15Max: "15-Day Peak Intensity (mm/h)",
      warningLine: "Warning Threshold (0.40)",
      criticalLine: "Critical Safety Limit (0.70)",
      evacLine: "Evacuation Required (0.90)"
    },
    vulnerability: {
      title: "Top Arterial Highway Vulnerabilities",
      displaceRate: "Displacement Rate",
      passability: "Corridor Passability",
      detour: "Alt Detour Available"
    },
    dispatch: {
      title: "Geo-Tagged Field Reports & Crowdsourced Ingestion",
      submitNew: "Submit Citizen Report",
      insarVerify: "Verify with InSAR",
      alertCollector: "Alert District Collector",
      dispatchSdrf: "Dispatch SDRF"
    }
  },
  hi: {
    systemTitle: "जियोरिस्क सेंटिनल",
    subTitle: "उत्तर-पूर्व भारत भूस्खलन पूर्व चेतावनी एवं अवसंरचना प्रणाली",
    districtSelect: "निगरानी क्षेत्र",
    offlineSync: "ऑफलाइन स्थानीय संग्रहण सक्रिय",
    liveMesh: "लाइव क्लाउड टेलीमेट्री मेश",
    broadcastSms: "आपदा एसएमएस प्रसारित करें",
    lastSynced: "अंतिम सिंक समय",
    kpi: {
      criticalZones: "गंभीर जोखिम क्षेत्र",
      roadStatus: "निगरानी राजमार्ग",
      weatherAlert: "आईएमडी वर्षा चेतावनी सूचकांक",
      responseRate: "आपदा प्रतिक्रिया दर"
    },
    gis: {
      title: "भू-स्थानिक जोखिम एवं टेलीमेट्री मानचित्र",
      basemap: "बेस-मैप",
      satellite: "सैटेलाइट इमेजरी",
      topo: "टोपोग्राफिक समोच्च रेखाएं",
      street: "ओपनस्ट्रीटमैप",
      legend: "भूस्खलन जोखिम सूचकांक (0.0 - 1.0)",
      layers: "परत नियंत्रण",
      heatmap: "2D संभावना हीटमैप",
      corridors: "राष्ट्रीय राजमार्ग गलियारे",
      telemetry: "पाइज़ोमीटर एवं सेंसर पिन",
      reports: "नागरिक रिपोर्ट जिओटैग"
    },
    sector: {
      title: "ढलान क्षेत्र एवं उत्खनन सांख्यिकी",
      refName: "संदर्भ कोड",
      meanRisk: "औसत जोखिम",
      minRisk: "न्यूनतम",
      maxRisk: "अधिकतम",
      stdDev: "मानक विचलन",
      status: "सुरक्षा स्थिति",
      focus: "मैप पर देखें",
      stabilitySummary: "डायनेमिक ढलान स्थिरता सारांश",
      weeklyLevel: "साप्ताहिक जोखिम स्तर",
      peakProb: "साप्ताहिक उच्चतम संभावना",
      historicalMax: "ऐतिहासिक अधिकतम मान",
      porePressure: "पाइज़ोमीट्रिक छिद्र जल दबाव (kPa)"
    },
    chart: {
      title: "पूर्वअनुमानित हाइड्रो-जियोलॉजिकल टाइम-सीरीज मॉडल",
      subtitle: "15-दिवसीय वर्षा संचयन बनाम भूस्खलन संभावना सीमा",
      probEnvelope: "विफलता की संभावना (Envelope)",
      rain10Acc: "10-दिवसीय वर्षा (मिमी)",
      rain15Max: "15-दिवसीय अधिकतम तीव्रता (मिमी/घंटा)",
      warningLine: "चेतावनी सीमा (0.40)",
      criticalLine: "गंभीर सुरक्षा सीमा (0.70)",
      evacLine: "निकासी सीमा (0.90)"
    },
    vulnerability: {
      title: "प्रमुख राष्ट्रीय राजमार्ग संवेदनशीलता",
      displaceRate: "विस्थापन दर",
      passability: "मार्ग सुगमता",
      detour: "वैकल्पिक मार्ग उपलब्ध"
    },
    dispatch: {
      title: "जिओ-टैगेड फील्ड रिपोर्ट एवं जन-भागीदारी",
      submitNew: "नई रिपोर्ट दर्ज करें",
      insarVerify: "InSAR सैटेलाइट जांच",
      alertCollector: "जिला कलेक्टर को सतर्क करें",
      dispatchSdrf: "एसडीआरएफ टीम भेजें"
    }
  },
  as: {
    systemTitle: "জিঅ’ৰিস্ক ছেণ্টিনেল",
    subTitle: "উত্তৰ-পূব ভাৰত ভূমিস্খলন আগতীয়া সতৰ্কবাণী ব্যৱস্থা",
    districtSelect: "পর্যবেক্ষণ ক্ষেত্র",
    offlineSync: "অফলাইন লোকেল ষ্ট’ৰেজ সক্ৰিয়",
    liveMesh: "লাইভ ক্লাউড টেলেমেট্ৰি মেছ",
    broadcastSms: "জৰুৰীকালীন SMS প্ৰেৰণ কৰক",
    lastSynced: "শেষ চিন্ক সময়",
    kpi: {
      criticalZones: "সংকটজনক ভূমিস্খলন অঞ্চল",
      roadStatus: "পৰ্যবেক্ষিত ৰাষ্ট্ৰীয় ঘাইপথ",
      weatherAlert: "IMD বৰষুণ সূচক",
      responseRate: "জৰুৰীকালীন সঁহাৰি হাৰ"
    },
    gis: {
      title: "ভূ-স্থানিক সংকট আৰু টেলেমেট্ৰি মানচিত্ৰ",
      basemap: "বেছমেপ",
      satellite: "কৃত্ৰিম উপগ্ৰহৰ ছবি",
      topo: "টপ’গ্ৰাফিক মেপ",
      street: "ষ্ট্ৰীট মেপ",
      legend: "জোখ সূচক (0.0 - 1.0)",
      layers: "লেয়াৰ সংৰচনা",
      heatmap: "2D সম্ভাৱনা হিটমেপ",
      corridors: "ৰাষ্ট্ৰীয় ঘাইপথ",
      telemetry: "পাইজোমিটাৰ আৰু সেন্সৰ",
      reports: "নাগৰিক ৰিপোৰ্ট"
    },
    sector: {
      title: "গড়া আৰু পাহাৰীয়া ঢাল পৰিসংখ্যা",
      refName: "ৰেফাৰেন্স ক’ড",
      meanRisk: "গড় বিপদাশংকা",
      minRisk: "সৰ্বনিম্ন",
      maxRisk: "সৰ্বোচ্চ",
      stdDev: "মানক বিচ্যুতি",
      status: "সুৰক্ষা অৱস্থা",
      focus: "মানচিত্ৰত চাওক",
      stabilitySummary: "পাহাৰীয়া গড়া স্থিৰতা সাৰাংশ",
      weeklyLevel: "সাপ্তাহিক বিপদৰ মাত্ৰা",
      peakProb: "সাপ্তাহিক শীৰ্ষ সম্ভাৱনা",
      historicalMax: "ঐতিহাসিক সৰ্বোচ্চ বিপদ",
      porePressure: "মাটিৰ পানীৰ চাপ (kPa)"
    },
    chart: {
      title: "হাইড্ৰ’-জিঅ’লজিকেল আগতীয়া পূৰ্বানুমান ৰেখা",
      subtitle: "বৰষুণৰ পৰিমাণ আৰু ভূমিস্খলনৰ সম্ভাৱনা সূচক",
      probEnvelope: "স্খলনৰ সম্ভাৱনা ৰেখা",
      rain10Acc: "১০ দিনৰ বৰষুণৰ পৰিমাণ (mm)",
      rain15Max: "১৫ দিনৰ সৰ্বোচ্চ তীব্ৰতা",
      warningLine: "সতৰ্কতা সীমা (0.40)",
      criticalLine: "সংকটজনক সীমা (0.70)",
      evacLine: "স্থানান্তৰ স্থান (0.90)"
    },
    vulnerability: {
      title: "ৰাষ্ট্ৰীয় ঘাইপথৰ ভংগুৰ অংশসমূহ",
      displaceRate: "স্থানান্তৰৰ গতি",
      passability: "পথ চলাচলাৰ অৱস্থা",
      detour: "বিকল্প পথ"
    },
    dispatch: {
      title: "নাগৰিক আৰু ফিল্ড ৰিপোৰ্টিং",
      submitNew: "নতুন ৰিপোৰ্ট দিয়ক",
      insarVerify: "InSAR উপগ্ৰহ পৰীক্ষা",
      alertCollector: "জিলা উপায়ুক্তক জনাওক",
      dispatchSdrf: "SDRF দল প্ৰেৰণ কৰক"
    }
  },
  bn: {
    systemTitle: "জিওরিস্ক সেন্টিনেল",
    subTitle: "উত্তর-পূর্ব ভারত ধস আগাম সতর্কবার্তা এবং পরিকাঠামো প্ল্যাটফর্ম",
    districtSelect: "পর্যবেক্ষণ এলাকা",
    offlineSync: "অফলাইন লোকাল স্টোরেজ সক্রিয়",
    liveMesh: "লাইভ ক্লাউড টেলিমেট্রি নেটওয়ার্ক",
    broadcastSms: "জরুরী এসএমএস পাঠান",
    lastSynced: "সর্বশেষ সিঙ্ক",
    kpi: {
      criticalZones: "ঝুঁকিপূর্ণ ভূমিধস এলাকা",
      roadStatus: "পর্যবেক্ষিত জাতীয় সড়ক",
      weatherAlert: "IMD ভারী বৃষ্টিপাত অ্যালার্ট",
      responseRate: "জরুরী সাড়া দেওয়ার হার"
    },
    gis: {
      title: "ভূ-স্থানিক ঝুঁকি ও টেলিমেট্রি ম্যাপ",
      basemap: "বেসম্যাপ",
      satellite: "স্যাটেলাইট দৃশ্য",
      topo: "টপোগ্রাফিক ম্যাপ",
      street: "স্ট্রিট ম্যাপ",
      legend: "ভূমিধস ঝুঁকি সূচক (0.0 - 1.0)",
      layers: "লেয়ার নিয়ন্ত্রণ",
      heatmap: "2D হিটম্যাপ গ্রিড",
      corridors: "জাতীয় সড়ক করিডোর",
      telemetry: "পাইজোমিটার ও সেন্সর",
      reports: "নাগরিক রিপোর্ট"
    },
    sector: {
      title: "পাহাড়ি ঢাল ও খনন এলাকা পরিসংখ্যান",
      refName: "রেফারেন্স কোড",
      meanRisk: "গড় ঝুঁকি",
      minRisk: "সর্বনিম্ন",
      maxRisk: "সর্বোচ্চ",
      stdDev: "স্ট্যান্ডার্ড ডেভিয়েশন",
      status: "সুরক্ষা অবস্থা",
      focus: "ম্যাপে দেখুন",
      stabilitySummary: "পাহাড়ের ঢাল স্থিতিশীলতা সারাংশ",
      weeklyLevel: "সাপ্তাহিক ঝুঁকির মাত্রা",
      peakProb: "সাপ্তাহিক সর্বোচ্চ সম্ভাবনা",
      historicalMax: "ঐতিহাসিক সর্বোচ্চ মান",
      porePressure: "মাটির ছিদ্র জলের চাপ (kPa)"
    },
    chart: {
      title: "হাইড্রোলজি ও ভূতাত্ত্বিক প্রেডিক্টিভ মডেল",
      subtitle: "১৫ দিনের বৃষ্টিপাত বনাম ভূমিধস সম্ভাবনা বক্ররেখা",
      probEnvelope: "ভূমিধস সম্ভাবনা বক্ররেখা",
      rain10Acc: "১০ দিনের সঞ্চিত বৃষ্টিপাত (mm)",
      rain15Max: "১৫ দিনের সর্বোচ্চ বৃষ্টিপাত",
      warningLine: "সতর্কতা সীমা (0.40)",
      criticalLine: "জরুরী সীমা (0.70)",
      evacLine: "উচ্ছেদ নির্দেশ (0.90)"
    },
    vulnerability: {
      title: "প্রধান হাইওয়ে করিডোর ঝুঁকি",
      displaceRate: "মাটি সরার গতি",
      passability: "সড়ক চলাচলের অবস্থা",
      detour: "বিকল্প পথ"
    },
    dispatch: {
      title: "ফিল্ড রিপোর্ট ও সিটিজেন রিপোর্ট",
      submitNew: "নতুন রিপোর্ট জমা দিন",
      insarVerify: "InSAR উপগ্রহ বিশ্লেষণ",
      alertCollector: "জেলা শাসককে জানান",
      dispatchSdrf: "SDRF টিম পাঠান"
    }
  },
  mz: {
    systemTitle: "GeoRisk Sentinel",
    subTitle: "Hmar-Chhak India Min Hmudo Awn Thang Lawk Relief System",
    districtSelect: "Veng / District Thlan",
    offlineSync: "Offline Storage A Nung Mek",
    liveMesh: "Live Telemetry Network Active",
    broadcastSms: "Khuavang Disaster SMS Thawn",
    lastSynced: "Telemetry sync hnuhnung ber",
    kpi: {
      criticalZones: "Min Hlauthawng Zual Mun",
      roadStatus: "Kawtchhuah Lulam Pui Monitor",
      weatherAlert: "IMD Ruah Tlak Chic",
      responseRate: "Taimaka Chemma Rate"
    },
    gis: {
      title: "GIS Hazard & Telemetry Map",
      basemap: "Map Thlanna",
      satellite: "Satellite Card",
      topo: "Topographic Contour",
      street: "Map Pangngai",
      legend: "Min Hlauhawm Zat (0.0 - 1.0)",
      layers: "Layer Overlays",
      heatmap: "2D Heatmap Grid",
      corridors: "National Highway Lam",
      telemetry: "Sensor & Piezometer Pins",
      reports: "Khawtlang Report Geotag"
    },
    sector: {
      title: "Kham Min & Slope Stats",
      refName: "Code Name",
      meanRisk: "Risk Purun",
      minRisk: "Chhete Ber",
      maxRisk: "Lian Ber",
      stdDev: "Std Dev",
      status: "Himna Dinhmun",
      focus: "Map-ah En",
      stabilitySummary: "Kham Stability Thukhawchang",
      weeklyLevel: "Kar Chhung Risk Level",
      peakProb: "Kar Chhung Peak Risk",
      historicalMax: "Historical Max Risk",
      porePressure: "Tui Hnehna Pressure (kPa)"
    },
    chart: {
      title: "Hydro-Geological Time Series Graph",
      subtitle: "Ruah Sur Zat le Kham Min Hlauhawmne Chang",
      probEnvelope: "Min Failure Risk Envelope",
      rain10Acc: "Ni 10 Ruah Sur Zat (mm)",
      rain15Max: "Ni 15 Ruah Sur Maximum",
      warningLine: "Fimkhur hun (0.40)",
      criticalLine: "Hlauhawm limit (0.70)",
      evacLine: "Chhuahsan a ngai (0.90)"
    },
    vulnerability: {
      title: "Highway Corridor Hlauhawm Zual",
      displaceRate: "Lole Chethla Speed",
      passability: "Lui / Kawtchhuah Passability",
      detour: "Peng Lam Him"
    },
    dispatch: {
      title: "Field & Khawtlang Report",
      submitNew: "Report Thar Thawn",
      insarVerify: "InSAR Satellite Enna",
      alertCollector: "District Collector Hriattir",
      dispatchSdrf: "SDRF Pawh Tirh"
    }
  }
};

// High Risk Danger Priority Zones (High Possibility of Disaster)
export const HIGH_RISK_PRIORITY_ZONES = [
  {
    id: "HRZ-NEP-05",
    name: "Nepal Bhotekoshi Hydro-Dam Core Failure & GLOF Outburst",
    zoneId: "nepal_dam",
    disasterPossibilityScore: 0.99,
    status: "CATASTROPHIC_DAM_BREACH",
    state: "Nepal Transboundary / India Border",
    district: "Bhotekoshi / Koshi Basin",
    center: [27.95, 85.92],
    polygonCoords: [
      [27.98, 85.88],
      [27.99, 85.96],
      [27.92, 85.97],
      [27.90, 85.89]
    ],
    populationAtRisk: 85000,
    primaryHazard: "Dam Core Wall Collapse & 5.8m Outburst Wave",
    displacementRate: "184 mm/6h",
    porePressureKpa: 340.5,
    antecedentRain10d: 312.0,
    recommendedAction: "CATASTROPHIC OUTBURST DETECTED - Mass Evacuation & Transboundary NDRF Alert"
  },
  {
    id: "HRZ-KAL-01",
    name: "29th Mile Teesta Shear Zone (NH-10 Kalimpong)",
    zoneId: "kalimpong",
    disasterPossibilityScore: 0.98,
    status: "CRITICAL_EVACUATION",
    state: "West Bengal / Sikkim Border",
    district: "Kalimpong",
    center: [27.054, 88.461],
    polygonCoords: [
      [27.062, 88.452],
      [27.065, 88.472],
      [27.048, 88.478],
      [27.042, 88.456]
    ],
    populationAtRisk: 14200,
    primaryHazard: "Debris Flow & Teesta Riverbed Scour",
    displacementRate: "9.4 mm/hr",
    porePressureKpa: 268.0,
    antecedentRain10d: 218.4,
    recommendedAction: "Immediate Mass Evacuation & Route Closure"
  },
  {
    id: "HRZ-SHL-02",
    name: "Mawlai Bypass Precipitous Cliff (Shillong)",
    zoneId: "shillong",
    disasterPossibilityScore: 0.92,
    status: "CRITICAL_WARNING",
    state: "Meghalaya",
    district: "East Khasi Hills",
    center: [25.592, 91.884],
    polygonCoords: [
      [25.598, 91.878],
      [25.602, 91.892],
      [25.586, 91.896],
      [25.582, 91.880]
    ],
    populationAtRisk: 8600,
    primaryHazard: "Deep-Seated Sandstone Rockslide",
    displacementRate: "6.8 mm/hr",
    porePressureKpa: 224.6,
    antecedentRain10d: 242.0,
    recommendedAction: "Traffic Diversion & SDRF Pre-positioning"
  },
  {
    id: "HRZ-GKT-03",
    name: "Mile 9 Gangtok Road Tension Slip (East Sikkim)",
    zoneId: "gangtok",
    disasterPossibilityScore: 0.88,
    status: "HIGH_ALERT",
    state: "Sikkim",
    district: "East Sikkim",
    center: [27.342, 88.612],
    polygonCoords: [
      [27.348, 88.605],
      [27.352, 88.618],
      [27.336, 88.622],
      [27.332, 88.608]
    ],
    populationAtRisk: 11400,
    primaryHazard: "Soil Liquefaction & Slope Subsidence",
    displacementRate: "4.2 mm/hr",
    porePressureKpa: 198.4,
    antecedentRain10d: 188.5,
    recommendedAction: "Geotechnical Anchoring & Watch Patrol"
  },
  {
    id: "HRZ-KHM-04",
    name: "Phesama Sinking Ridge (NH-29 Kohima)",
    zoneId: "kohima",
    disasterPossibilityScore: 0.84,
    status: "HIGH_ALERT",
    state: "Nagaland",
    district: "Kohima",
    center: [25.6747, 94.11],
    polygonCoords: [
      [25.680, 94.102],
      [25.684, 94.118],
      [25.668, 94.122],
      [25.664, 94.106]
    ],
    populationAtRisk: 6200,
    primaryHazard: "Progressive Crest Sinking",
    displacementRate: "4.5 mm/hr",
    porePressureKpa: 165.0,
    antecedentRain10d: 145.0,
    recommendedAction: "One-Lane Restriction & PWD Patrol"
  }
];

export const MONITORING_ZONES = [
  {
    id: "nepal_dam",
    name: "Nepal Transboundary Dam & GLOF Outburst Zone",
    state: "Nepal / Transboundary Basin",
    district: "Upper Koshi Basin",
    center: [27.95, 85.92],
    zoom: 11,
    kpis: {
      criticalZonesCount: "38 / 40",
      criticalZonesPct: 95.0,
      criticalZonesTrend: "+42.0% (Breach Event)",
      roadMonitoredKm: 210,
      roadBlockedPct: 78.5,
      roadBlockedKm: 164.8,
      rain24h: 312.0,
      rainStatus: "Dam Break & Extreme Transboundary Surge",
      rainAlertLevel: "red",
      dispatchCount: "32 / 35",
      dispatchPct: 91.4,
      sdrfTeamsDeployed: 14
    },
    summaryStats: {
      weeklyRiskLevel: "CATASTROPHIC / DAM BREACH",
      peakWeeklyProb: 0.99,
      peakWeeklyDate: "2026-08-26 (Nepal Dam Break)",
      historicalMaxProb: 0.99,
      historicalMaxDate: "2026-08-26 (Nepal Bhotekoshi Outburst)",
      porePressureKpa: 340.5,
      volumetricMoisturePct: 98.5
    }
  },
  {
    id: "gangtok",
    name: "Gangtok & East Sikkim Corridor",
    state: "Sikkim",
    district: "East Sikkim",
    center: [27.3389, 88.6065],
    zoom: 12,
    kpis: {
      criticalZonesCount: "18 / 48",
      criticalZonesPct: 37.5,
      criticalZonesTrend: "+4.2% (24h)",
      roadMonitoredKm: 142,
      roadBlockedPct: 18.5,
      roadBlockedKm: 26.2,
      rain24h: 142.8,
      rainStatus: "Monsoonal Shear Zone Trigger",
      rainAlertLevel: "amber",
      dispatchCount: "18 / 32",
      dispatchPct: 56.2,
      sdrfTeamsDeployed: 4
    },
    summaryStats: {
      weeklyRiskLevel: "High / Watch",
      peakWeeklyProb: 0.78,
      peakWeeklyDate: "2026-08-26",
      historicalMaxProb: 0.94,
      historicalMaxDate: "2023-10-04 (Teesta Flood Event)",
      porePressureKpa: 184.5,
      volumetricMoisturePct: 76.2
    }
  },
  {
    id: "shillong",
    name: "Shillong Plateau & Mawlynnong Slope Belt",
    state: "Meghalaya",
    district: "East Khasi Hills",
    center: [25.5788, 91.8933],
    zoom: 12,
    kpis: {
      criticalZonesCount: "14 / 42",
      criticalZonesPct: 33.3,
      criticalZonesTrend: "-1.5% (24h)",
      roadMonitoredKm: 185,
      roadBlockedPct: 12.0,
      roadBlockedKm: 22.2,
      rain24h: 218.4,
      rainStatus: "Cherrapunji Orographic Plume Active",
      rainAlertLevel: "red",
      dispatchCount: "24 / 28",
      dispatchPct: 85.7,
      sdrfTeamsDeployed: 6
    },
    summaryStats: {
      weeklyRiskLevel: "Critical / Evacuate Watch",
      peakWeeklyProb: 0.88,
      peakWeeklyDate: "2026-08-24",
      historicalMaxProb: 0.96,
      historicalMaxDate: "2022-06-17 (Sohra Cloudburst)",
      porePressureKpa: 210.2,
      volumetricMoisturePct: 88.4
    }
  },
  {
    id: "champhai",
    name: "Champhai - Zokhawthar Border Slope",
    state: "Mizoram",
    district: "Champhai",
    center: [23.456, 93.328],
    zoom: 12,
    kpis: {
      criticalZonesCount: "11 / 30",
      criticalZonesPct: 36.6,
      criticalZonesTrend: "+2.1% (24h)",
      roadMonitoredKm: 98,
      roadBlockedPct: 24.5,
      roadBlockedKm: 24.0,
      rain24h: 96.5,
      rainStatus: "Trough Line Convection",
      rainAlertLevel: "yellow",
      dispatchCount: "9 / 15",
      dispatchPct: 60.0,
      sdrfTeamsDeployed: 2
    },
    summaryStats: {
      weeklyRiskLevel: "Moderate / Watch",
      peakWeeklyProb: 0.69,
      peakWeeklyDate: "2026-08-23",
      historicalMaxProb: 0.89,
      historicalMaxDate: "2020-07-12 (Tiau River Slip)",
      porePressureKpa: 145.0,
      volumetricMoisturePct: 68.1
    }
  },
  {
    id: "kalimpong",
    name: "Kalimpong - NH-10 Teesta Valley Corridor",
    state: "West Bengal / Sikkim Border",
    district: "Kalimpong",
    center: [27.06, 88.47],
    zoom: 12,
    kpis: {
      criticalZonesCount: "22 / 38",
      criticalZonesPct: 57.8,
      criticalZonesTrend: "+8.5% (24h)",
      roadMonitoredKm: 110,
      roadBlockedPct: 41.2,
      roadBlockedKm: 45.3,
      rain24h: 175.2,
      rainStatus: "Teesta Dam Overflow & Active Seepage",
      rainAlertLevel: "red",
      dispatchCount: "15 / 35",
      dispatchPct: 42.8,
      sdrfTeamsDeployed: 8
    },
    summaryStats: {
      weeklyRiskLevel: "Critical / Evacuate",
      peakWeeklyProb: 0.93,
      peakWeeklyDate: "2026-08-24",
      historicalMaxProb: 0.98,
      historicalMaxDate: "2023-10-04 (Glacial Lake Outburst)",
      porePressureKpa: 245.8,
      volumetricMoisturePct: 91.0
    }
  },
  {
    id: "kohima",
    name: "Kohima Ridge & NH-29 Bypass Corridor",
    state: "Nagaland",
    district: "Kohima",
    center: [25.6747, 94.11,],
    zoom: 12,
    kpis: {
      criticalZonesCount: "12 / 35",
      criticalZonesPct: 34.2,
      criticalZonesTrend: "0.0% (24h)",
      roadMonitoredKm: 124,
      roadBlockedPct: 15.0,
      roadBlockedKm: 18.6,
      rain24h: 112.0,
      rainStatus: "Moderate Monsoonal Downpour",
      rainAlertLevel: "yellow",
      dispatchCount: "11 / 18",
      dispatchPct: 61.1,
      sdrfTeamsDeployed: 3
    },
    summaryStats: {
      weeklyRiskLevel: "Moderate / Watch",
      peakWeeklyProb: 0.64,
      peakWeeklyDate: "2026-08-22",
      historicalMaxProb: 0.86,
      historicalMaxDate: "2018-08-04 (Phesama Sinking Zone)",
      porePressureKpa: 132.4,
      volumetricMoisturePct: 64.5
    }
  }
];

// Telemetry Sensors (Piezometers, Inclinometers, Rain Gauges, Soil Moisture)
export const TELEMETRY_PINS = [
  {
    id: "PZ-NEP-01",
    zoneId: "nepal_dam",
    name: "Dam Core Piezometer Array #N1 - Bhotekoshi Hydro Structure",
    lat: 27.952,
    lng: 85.922,
    type: "Piezometer",
    porePressureKpa: 340.5,
    volumetricWaterContentPct: 98.5,
    slopeAngleDeg: 62.0,
    displacementMmHr: 30.6,
    riskScore: 0.99,
    status: "critical",
    lastUpdated: "Real-time Detection Trigger"
  },
  {
    id: "INC-NEP-02",
    zoneId: "nepal_dam",
    name: "Acoustic Hydrograph Telemetry Station - Koshi Border Gateway",
    lat: 27.935,
    lng: 85.905,
    type: "Hydro-Acoustic Radar",
    porePressureKpa: 310.0,
    volumetricWaterContentPct: 96.0,
    slopeAngleDeg: 12.0,
    displacementMmHr: 45.0,
    riskScore: 0.97,
    status: "critical",
    lastUpdated: "Just now"
  },
  {
    id: "SAR-NEP-03",
    zoneId: "nepal_dam",
    name: "Sentinel-1A SAR InSAR Anomaly Sensor Pin - Dam Crest Wall",
    lat: 27.960,
    lng: 85.938,
    type: "InSAR Radar Node",
    porePressureKpa: 285.0,
    volumetricWaterContentPct: 92.0,
    slopeAngleDeg: 55.0,
    displacementMmHr: 22.4,
    riskScore: 0.96,
    status: "critical",
    lastUpdated: "1 min ago"
  },
  {
    id: "PZ-GKT-01",
    zoneId: "gangtok",
    name: "Piezometer Array #108 - Mile 9 Gangtok Road",
    lat: 27.342,
    lng: 88.612,
    type: "Piezometer",
    porePressureKpa: 198.4,
    volumetricWaterContentPct: 78.5,
    slopeAngleDeg: 42.5,
    displacementMmHr: 4.2,
    riskScore: 0.82,
    status: "critical",
    lastUpdated: "12 mins ago"
  },
  {
    id: "INC-GKT-04",
    zoneId: "gangtok",
    name: "Subsurface Inclinometer - Namnam Rockfall Spur",
    lat: 27.329,
    lng: 88.601,
    type: "Inclinometer",
    porePressureKpa: 142.1,
    volumetricWaterContentPct: 64.0,
    slopeAngleDeg: 48.0,
    displacementMmHr: 1.8,
    riskScore: 0.65,
    status: "watch",
    lastUpdated: "5 mins ago"
  },
  {
    id: "RG-GKT-09",
    zoneId: "gangtok",
    name: "Automated Rain Gauge & Soil Probe - Deorali Slopes",
    lat: 27.322,
    lng: 88.618,
    type: "Soil Moisture",
    porePressureKpa: 110.0,
    volumetricWaterContentPct: 58.2,
    slopeAngleDeg: 34.0,
    displacementMmHr: 0.4,
    riskScore: 0.38,
    status: "safe",
    lastUpdated: "2 mins ago"
  },
  {
    id: "PZ-SHL-02",
    zoneId: "shillong",
    name: "Multi-depth Piezometer - Mawlai Bypass Cliff",
    lat: 25.592,
    lng: 91.884,
    type: "Piezometer",
    porePressureKpa: 224.6,
    volumetricWaterContentPct: 86.4,
    slopeAngleDeg: 51.0,
    displacementMmHr: 6.8,
    riskScore: 0.89,
    status: "critical",
    lastUpdated: "3 mins ago"
  },
  {
    id: "INC-SHL-05",
    zoneId: "shillong",
    name: "Inclinometer Mesh - Barapani Reservoir Bank",
    lat: 25.651,
    lng: 91.912,
    type: "Inclinometer",
    porePressureKpa: 165.2,
    volumetricWaterContentPct: 71.0,
    slopeAngleDeg: 38.0,
    displacementMmHr: 2.1,
    riskScore: 0.68,
    status: "watch",
    lastUpdated: "8 mins ago"
  },
  {
    id: "PZ-KAL-01",
    zoneId: "kalimpong",
    name: "Deep Borehole Piezometer - 29th Mile NH-10",
    lat: 27.054,
    lng: 88.461,
    type: "Piezometer",
    porePressureKpa: 268.0,
    volumetricWaterContentPct: 94.2,
    slopeAngleDeg: 55.5,
    displacementMmHr: 9.4,
    riskScore: 0.95,
    status: "critical",
    lastUpdated: "Just now"
  },
  {
    id: "INC-KAL-03",
    zoneId: "kalimpong",
    name: "Tiltmeter Sensor Node - Birmik Slope",
    lat: 27.078,
    lng: 88.482,
    type: "Inclinometer",
    porePressureKpa: 188.0,
    volumetricWaterContentPct: 79.0,
    slopeAngleDeg: 46.0,
    displacementMmHr: 3.9,
    riskScore: 0.76,
    status: "warning",
    lastUpdated: "15 mins ago"
  }
];

// Excavations & Slope Sector Statistics Table
export const SLOPE_SECTORS = [
  {
    refName: "DAM-NEP-101",
    zoneId: "nepal_dam",
    location: "Bhotekoshi Main Concrete Dam Wall",
    meanRisk: 0.99,
    minRisk: 0.94,
    maxRisk: 1.00,
    stdDev: 0.02,
    status: "critical",
    lat: 27.952,
    lng: 85.922
  },
  {
    refName: "DAM-NEP-102",
    zoneId: "nepal_dam",
    location: "Upper Glacial Lake Moraine Dam Wall",
    meanRisk: 0.96,
    minRisk: 0.88,
    maxRisk: 0.99,
    stdDev: 0.04,
    status: "critical",
    lat: 27.960,
    lng: 85.938
  },
  {
    refName: "TER-535",
    zoneId: "gangtok",
    location: "Mile 9 Teesta Valley Cut",
    meanRisk: 0.84,
    minRisk: 0.68,
    maxRisk: 0.95,
    stdDev: 0.07,
    status: "critical",
    lat: 27.342,
    lng: 88.612
  },
  {
    refName: "EXV-549",
    zoneId: "gangtok",
    location: "Namnam Railway Excavation",
    meanRisk: 0.72,
    minRisk: 0.54,
    maxRisk: 0.88,
    stdDev: 0.09,
    status: "warning",
    lat: 27.329,
    lng: 88.601
  },
  {
    refName: "SLP-812",
    zoneId: "gangtok",
    location: "Deorali Ropeway Slope",
    meanRisk: 0.44,
    minRisk: 0.28,
    maxRisk: 0.59,
    stdDev: 0.06,
    status: "safe",
    lat: 27.322,
    lng: 88.618
  },
  {
    refName: "SHL-104",
    zoneId: "shillong",
    location: "Mawlai Bypass Cut #2",
    meanRisk: 0.88,
    minRisk: 0.75,
    maxRisk: 0.96,
    stdDev: 0.05,
    status: "critical",
    lat: 25.592,
    lng: 91.884
  },
  {
    refName: "SHL-209",
    zoneId: "shillong",
    location: "Umiam Lake Bluff",
    meanRisk: 0.66,
    minRisk: 0.48,
    maxRisk: 0.79,
    stdDev: 0.08,
    status: "watch",
    lat: 25.651,
    lng: 91.912
  },
  {
    refName: "KAL-901",
    zoneId: "kalimpong",
    location: "29th Mile NH-10 Shear Zone",
    meanRisk: 0.94,
    minRisk: 0.85,
    maxRisk: 0.99,
    stdDev: 0.03,
    status: "critical",
    lat: 27.054,
    lng: 88.461
  },
  {
    refName: "CMP-302",
    zoneId: "champhai",
    location: "Zokhawthar Border Cutting",
    meanRisk: 0.63,
    minRisk: 0.45,
    maxRisk: 0.78,
    stdDev: 0.07,
    status: "watch",
    lat: 23.456,
    lng: 93.328
  },
  {
    refName: "KHM-405",
    zoneId: "kohima",
    location: "Phesama Sinking Stretch",
    meanRisk: 0.67,
    minRisk: 0.51,
    maxRisk: 0.82,
    stdDev: 0.08,
    status: "watch",
    lat: 25.6747,
    lng: 94.11
  }
];

// Predictive Time Series Data (Dual Axis / Envelope Spline)
export const HYDRO_TIME_SERIES = [
  { date: "Aug 10", rain_10_acc: 42, rain_15_max: 12.5, riskMean: 0.22, riskLower: 0.16, riskUpper: 0.28, event: null },
  { date: "Aug 12", rain_10_acc: 58, rain_15_max: 18.0, riskMean: 0.29, riskLower: 0.22, riskUpper: 0.36, event: "Minor Rockfall at Mile 14" },
  { date: "Aug 14", rain_10_acc: 84, rain_15_max: 28.4, riskMean: 0.41, riskLower: 0.34, riskUpper: 0.49, event: null },
  { date: "Aug 16", rain_10_acc: 112, rain_15_max: 36.0, riskMean: 0.58, riskLower: 0.49, riskUpper: 0.66, event: null },
  { date: "Aug 18", rain_10_acc: 145, rain_15_max: 48.2, riskMean: 0.71, riskLower: 0.63, riskUpper: 0.79, event: "Mudslide near Namchi Bypass" },
  { date: "Aug 20", rain_10_acc: 168, rain_15_max: 52.0, riskMean: 0.76, riskLower: 0.69, riskUpper: 0.84, event: null },
  { date: "Aug 22", rain_10_acc: 189, rain_15_max: 64.5, riskMean: 0.83, riskLower: 0.76, riskUpper: 0.90, event: "NH-10 Culvert Washout" },
  { date: "Aug 24 (Today)", rain_10_acc: 218, rain_15_max: 78.0, riskMean: 0.88, riskLower: 0.81, riskUpper: 0.94, event: "Critical Alert Issued" },
  { date: "Aug 26 (Yesterday)", rain_10_acc: 312, rain_15_max: 184.0, riskMean: 0.99, riskLower: 0.95, riskUpper: 1.00, event: "NEPAL CATASTROPHIC DAM BREACH & OUTBURST WAVE DETECTED" },
  { date: "Aug 27 (Fcst)", rain_10_acc: 235, rain_15_max: 82.0, riskMean: 0.91, riskLower: 0.83, riskUpper: 0.97, event: null },
  { date: "Aug 26 (Fcst)", rain_10_acc: 210, rain_15_max: 55.0, riskMean: 0.78, riskLower: 0.68, riskUpper: 0.86, event: null },
  { date: "Aug 27 (Fcst)", rain_10_acc: 175, rain_15_max: 38.0, riskMean: 0.62, riskLower: 0.52, riskUpper: 0.71, event: null },
  { date: "Aug 28 (Fcst)", rain_10_acc: 140, rain_15_max: 22.0, riskMean: 0.45, riskLower: 0.36, riskUpper: 0.54, event: null }
];

// Top Arterial Highway Vulnerabilities (Band 4 Left)
export const HIGHWAY_VULNERABILITIES = [
  {
    id: "nepal-koshi-corridor",
    name: "Nepal Transboundary Outburst Corridor (Bhotekoshi - Koshi Basin)",
    lengthKm: 140,
    displacementRate: "30.6 mm/hr",
    riskScore: 0.99,
    status: "Catastrophic Inundation",
    detourName: "High Altitude Evacuation Routes Only",
    trafficImpact: "Submerged & Destroyed Bridge Access",
    clearedEta: "Emergency Operations"
  },
  {
    id: "nh10-kalimpong",
    name: "NH-10 Kalimpong - Teesta Corridor",
    lengthKm: 48,
    displacementRate: "9.4 mm/hr",
    riskScore: 0.94,
    status: "Blocked",
    detourName: "Via Lava - Gorubathan (Extra 3.5 hrs)",
    trafficImpact: "Heavy Freight & Military Access Blocked",
    clearedEta: "36 hrs"
  },
  {
    id: "shillong-bypass",
    name: "Shillong Bypass - Mawlai Cut",
    lengthKm: 32,
    displacementRate: "6.8 mm/hr",
    riskScore: 0.89,
    status: "One-Lane Restriction",
    detourName: "Via Old City Mawroh Road",
    trafficImpact: "Substantial Freight Slowdown",
    clearedEta: "12 hrs"
  },
  {
    id: "nh29-kohima",
    name: "NH-29 Dimapur - Kohima Ridge",
    lengthKm: 65,
    displacementRate: "4.5 mm/hr",
    riskScore: 0.74,
    status: "High Alert / One-Lane",
    detourName: "Via Peducha Bypass",
    trafficImpact: "Light Passenger Vehicles Only",
    clearedEta: "Monitoring"
  },
  {
    id: "nh108-champhai",
    name: "NH-108 Aizawl - Champhai Highway",
    lengthKm: 88,
    displacementRate: "3.8 mm/hr",
    riskScore: 0.68,
    status: "Watch Status",
    detourName: "Via Seling - Keifang Road",
    trafficImpact: "Clear with Caution",
    clearedEta: "Operational"
  },
  {
    id: "gangtok-nathula",
    name: "JN Road (Gangtok - Nathu La Pass)",
    lengthKm: 52,
    displacementRate: "8.1 mm/hr",
    riskScore: 0.91,
    status: "Blocked",
    detourName: "No Alternate Vehicle Route",
    trafficImpact: "Tourist & Military Convoy Suspended",
    clearedEta: "48 hrs"
  }
];

// Geo-Tagged Field Reports & Crowdsourced Ingestion (Band 4 Right)
export const INITIAL_CITIZEN_REPORTS = [
  {
    id: "REP-2026-NEP01",
    author: "Border Post Sentinel Station #4 (Nepal-India Boundary)",
    location: "Upper Koshi River Gateway, Nepal Border",
    lat: 27.940,
    lng: 85.910,
    timestamp: "12 mins ago",
    category: "CATASTROPHIC DAM BREACH & 5.8M SURGE WAVE",
    crackWidthCm: 184.0,
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80",
    verified: true,
    verificationSource: "AUTOMATED DETECTION: Sentinel-1A SAR + Telemetry",
    inSarData: {
      displacementRateYear: "-184 mm (6h Crest Collapse)",
      coherenceIndex: 0.12,
      interferogramFringe: "Complete Phase Loss (Structural Breach)",
      satellitePass: "Sentinel-1A (Pass 142 Nepal Overpass)"
    }
  },
  {
    id: "REP-2026-0841",
    author: "Sonam Lepcha (Panchayat Field Assistant)",
    location: "Mile 9, Teesta Valley Road, East Sikkim",
    lat: 27.341,
    lng: 88.611,
    timestamp: "28 mins ago",
    category: "Fresh Tension Cracks & Mud Seepage",
    crackWidthCm: 14.5,
    photoUrl: "https://images.unsplash.com/photo-1596489911771-ef627cf9f33b?auto=format&fit=crop&w=600&q=80",
    verified: false,
    verificationSource: "Pending Field Team",
    inSarData: {
      displacementRateYear: "-48 mm/yr",
      coherenceIndex: 0.88,
      interferogramFringe: "Concentric Red Shift (High Gradient)",
      satellitePass: "Sentinel-1A (Desc Pass 112)"
    }
  },
  {
    id: "REP-2026-0839",
    author: "Praveen Rai (BRO Engineer)",
    location: "29th Mile Slope, NH-10 Kalimpong",
    lat: 27.055,
    lng: 88.462,
    timestamp: "1 hour ago",
    category: "Major Subsidence & Retaining Wall Bulge",
    crackWidthCm: 32.0,
    photoUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80",
    verified: true,
    verificationSource: "Verified by InSAR & Field Ops",
    inSarData: {
      displacementRateYear: "-112 mm/yr",
      coherenceIndex: 0.94,
      interferogramFringe: "Severe Phase Discontinuity",
      satellitePass: "RadarSAT-2 (Asc Pass 44)"
    }
  },
  {
    id: "REP-2026-0835",
    author: "Malsawmi Ralte (VVD Volunteer)",
    location: "Mawlai Bypass Cut, Shillong",
    lat: 25.593,
    lng: 91.885,
    timestamp: "3 hours ago",
    category: "Subsurface Seepage & Small Rock Falls",
    crackWidthCm: 8.2,
    photoUrl: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    verified: true,
    verificationSource: "Verified by SDRF Scout",
    inSarData: {
      displacementRateYear: "-24 mm/yr",
      coherenceIndex: 0.81,
      interferogramFringe: "Moderate Phase Deformation",
      satellitePass: "Sentinel-1B (Asc Pass 78)"
    }
  }
];

// Heatmap Grid Cells (2D Geo Coordinates for NE India)
export const RASTER_HEATMAP_GRID = [
  // Nepal Dam Breach Cluster
  { lat: 27.950, lng: 85.920, risk: 0.99 },
  { lat: 27.955, lng: 85.925, risk: 0.98 },
  { lat: 27.945, lng: 85.915, risk: 0.95 },
  { lat: 27.960, lng: 85.930, risk: 0.97 },
  { lat: 27.935, lng: 85.905, risk: 0.94 },

  // Gangtok Cluster
  { lat: 27.345, lng: 88.610, risk: 0.92 },
  { lat: 27.340, lng: 88.615, risk: 0.85 },
  { lat: 27.335, lng: 88.605, risk: 0.78 },
  { lat: 27.330, lng: 88.620, risk: 0.64 },
  { lat: 27.325, lng: 88.600, risk: 0.42 },
  { lat: 27.350, lng: 88.625, risk: 0.89 },
  
  // Shillong Cluster
  { lat: 25.595, lng: 91.880, risk: 0.88 },
  { lat: 25.590, lng: 91.890, risk: 0.81 },
  { lat: 25.580, lng: 91.870, risk: 0.55 },
  { lat: 25.600, lng: 91.900, risk: 0.72 },
  { lat: 25.610, lng: 91.920, risk: 0.60 },

  // Kalimpong Cluster
  { lat: 27.050, lng: 88.460, risk: 0.96 },
  { lat: 27.060, lng: 88.470, risk: 0.91 },
  { lat: 27.070, lng: 88.480, risk: 0.83 },

  // Champhai Cluster
  { lat: 23.450, lng: 93.320, risk: 0.65 },
  { lat: 23.460, lng: 93.330, risk: 0.70 },

  // Kohima Cluster
  { lat: 25.670, lng: 94.100, risk: 0.68 },
  { lat: 25.680, lng: 94.120, risk: 0.74 }
];
