// src/data/staticProjects.js
export const STATIC_FEATURED = [
  {
    id: "agri-blockchain", title: "AgriChain",
    tagline: "End-to-end agricultural supply chain on Ethereum with AI-driven insurance risk scoring.",
    metrics: [
      { label: "Smart Contract Functions", value: "14+" },
      { label: "ML Accuracy", value: "91%" },
      { label: "User Roles", value: "5" },
      { label: "IEEE Submission", value: "Submitted" },
    ],
    status: "Local / Research",
    tech: ["Solidity","React","Truffle","Web3.js","TensorFlow.js","Python"],
    github: "https://github.com/Tamz-0",
    livePreview: null,
    caseStudy: {
      problem: "Agricultural supply chains in India suffer from opacity — farmers receive 20-30% of final product value due to multi-layer middlemen, and banks cannot verify crop ownership or yield history for loan underwriting. No tamper-proof record of inputs, ownership transfers, or quality certifications exists at the farm level.",
      solution: "A permissioned DApp on Ethereum where each produce batch is minted as an on-chain asset. Role-based smart contracts enforce ownership transfers across Farmer → Vendor → Consumer. A parallel AI module uses crop images and geo-data to generate insurance risk scores and loan eligibility estimates, surfaced to Bank and Insurance dashboards.",
      architecture: [
        "Solidity contracts (Truffle) manage asset lifecycle: mint, transfer, verify, insure.",
        "React frontend with Web3.js connects MetaMask wallet and dispatches contract calls.",
        "TensorFlow.js model runs client-side for crop health inference (no server round-trip).",
        "Flask microservice handles heavier VGG19-based risk scoring and generates PDF insurance reports.",
        "Firebase Firestore stores off-chain metadata (images, GPS, timestamps) linked by IPFS content hash.",
      ],
      decisions: [
        "Chose Ethereum + Truffle over Hyperledger: simpler local dev cycle, better React/Web3.js tooling, sufficient for prototype throughput.",
        "Client-side TF.js for lightweight checks avoids latency for farmers with poor connectivity; heavier scoring deferred to Flask.",
        "Role-based access enforced in Solidity modifiers — not just frontend gates — to prevent privilege escalation.",
      ],
      challenges: [
        "Gas cost optimization for batch minting: consolidated struct packing reduced deployment cost by ~18%.",
        "Cross-browser Web Speech API inconsistencies in the voice module required a fallback polling state machine.",
        "Coordinating 5 distinct role dashboards from a single contract state required careful event indexing.",
      ],
      metrics_detail: "VGG19 crop disease model: 91% test accuracy on 38-class PlantVillage dataset. Insurance risk scoring: F1 0.87 on held-out validation set. Contract functions: 14 public entry points across 3 contracts.",
    },
  },
  {
    id: "disease-diagnostic", title: "CropMD",
    tagline: "Computer vision diagnostic portal for crop and livestock disease — Flask + VGG19 inference pipeline.",
    metrics: [
      { label: "Model", value: "VGG19" },
      { label: "Dataset Classes", value: "38" },
      { label: "Accuracy", value: "91%" },
      { label: "Report Generation", value: "<2s" },
    ],
    status: "Local",
    tech: ["Python","Flask","TensorFlow","VGG19","Firebase","HTML/CSS"],
    github: "https://github.com/Tamz-0",
    livePreview: null,
    caseStudy: {
      problem: "Smallholder farmers in India lose 15-25% of crop yield annually to undiagnosed or misdiagnosed disease. Access to trained agronomists is limited and expensive. Early-stage disease is visually identifiable but requires expert knowledge most farmers don't have.",
      solution: "A web portal where farmers upload a leaf or livestock image. The backend runs it through a fine-tuned VGG19 classification pipeline, returns the disease name, confidence score, and a structured treatment plan. Reports are generated as downloadable PDFs.",
      architecture: [
        "Flask REST API receives base64 image, decodes and preprocesses to 224x224 for VGG19 input.",
        "VGG19 fine-tuned on PlantVillage dataset (38 classes) with transfer learning from ImageNet weights.",
        "Prediction + top-3 confidence scores returned with mapped treatment metadata.",
        "Firebase Storage for image persistence; Firestore for diagnosis history per user session.",
        "Mobile companion built in MIT App Inventor for field-level camera capture with offline queue.",
      ],
      decisions: [
        "VGG19 over MobileNet: higher accuracy on fine-grained disease patterns despite larger size — acceptable for server-side inference.",
        "Flask chosen over FastAPI: simpler deployment for this scope; no async bottleneck at current request volume.",
        "Treatment metadata stored as a JSON lookup (not DB) — disease classes are finite and rarely change.",
      ],
      challenges: [
        "Class imbalance in PlantVillage (some diseases have 10x more samples) — mitigated with class-weighted loss during fine-tuning.",
        "Image quality from mobile cameras degraded accuracy; added preprocessing (CLAHE contrast enhancement) to normalize inputs.",
        "PDF generation without a headless browser: used WeasyPrint with custom CSS templates.",
      ],
      metrics_detail: "91% top-1 accuracy, 97% top-3 accuracy across 38 disease classes. Inference time on CPU: 380ms avg. Report generation: under 2 seconds end-to-end.",
    },
  },
  {
    id: "voice-shopping", title: "VoiceCart",
    tagline: "Voice-to-product search assistant with live e-commerce link generation.",
    metrics: [
      { label: "APIs Integrated", value: "3" },
      { label: "Avg Query Parse Time", value: "<800ms" },
      { label: "Speech Accuracy", value: "Web Speech API" },
      { label: "Fallback Coverage", value: "Full" },
    ],
    status: "Local",
    tech: ["React","Node.js","OpenAI API","Web Speech API"],
    github: "https://github.com/Tamz-0",
    livePreview: null,
    caseStudy: {
      problem: "Voice commerce interfaces are largely gimmicks — they either use rigid keyword matching or dump raw transcriptions into search bars. The result is high error rates and user abandonment. A genuinely usable voice-to-cart flow requires intent parsing, not just transcription.",
      solution: "A React app that listens via Web Speech API, sends the transcript to an OpenAI-powered intent parser that extracts product category, attributes (size, color, brand), and price constraints, then assembles deep-link search URLs for each e-commerce platform. Results render as product cards with direct shopping links.",
      architecture: [
        "Web Speech API handles real-time transcription with interim results for live feedback.",
        "Node.js middleware forwards transcript to OpenAI with a structured extraction prompt; response enforces JSON schema.",
        "URL builder maps parsed intent fields to platform-specific query parameters (Amazon SERP, Flipkart API, Myntra URL patterns).",
        "React state machine manages: idle → listening → processing → results → error states.",
      ],
      decisions: [
        "OpenAI for intent parsing over regex/NLP: generalizes to colloquial queries like 'something warm for Delhi winters' that rule-based systems fail on.",
        "State machine over ad-hoc booleans: voice UIs have complex async transitions; explicit states prevent race conditions.",
        "No backend session state: stateless per-query design keeps latency low and eliminates session management complexity.",
      ],
      challenges: [
        "Web Speech API fires multiple interim events — debouncing to final transcript required careful timing logic.",
        "Cross-browser support gaps (Safari, Firefox) required feature detection with text-input fallback.",
        "OpenAI response latency was the dominant bottleneck; streaming partial JSON mitigated perceived wait time.",
      ],
      metrics_detail: "End-to-end query parse time: median 780ms on broadband. Fallback text input covers ~15% of sessions where microphone access is denied.",
    },
  },
];

export const STATIC_OTHER = [
  {
    id: "ship-classification", title: "VesselIQ",
    tagline: "Trajectory-based ship type classifier using AIS movement features.",
    metrics: [{ label: "Features", value: "Speed, Heading, Path Curvature" },{ label: "Dataset", value: "Kaggle AIS" }],
    status: "Research / Local", tech: ["Python","scikit-learn","Pandas","Kaggle API"],
    github: "https://github.com/Tamz-0", livePreview: null,
  },
  {
    id: "souvenir-finder", title: "SouvenirAI",
    tagline: "Travel souvenir discovery engine combining geolocation with Etsy, TripAdvisor, and Wikipedia.",
    metrics: [{ label: "APIs", value: "Etsy, TripAdvisor, Wikipedia" },{ label: "Output", value: "Multi-page PDF report" }],
    status: "Local", tech: ["React","Node.js","TripAdvisor API","Etsy API"],
    github: "https://github.com/Tamz-0", livePreview: null,
  },
  {
    id: "buck-converter", title: "SmartConvert",
    tagline: "RL agent vs. PID controller benchmark for DC-DC buck converter regulation.",
    metrics: [{ label: "Environment", value: "Custom OpenAI Gym" },{ label: "Settling Time Delta", value: "~12%" }],
    status: "Research / Colab", tech: ["Python","OpenAI Gym","NumPy","SciPy","Matplotlib"],
    github: "https://github.com/Tamz-0", livePreview: null,
  },
];