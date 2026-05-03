// src/data/staticBlogs.js
export const STATIC_BLOGS = [
  {
    id: "blockchain-supply-chain", title: "Why Blockchain Beats Databases for Supply Chain Provenance",
    summary: "Most supply chain apps don't need blockchain. Agricultural provenance does. The technical argument for immutability over CRUD: where it holds, where it breaks down, and what the data model actually looks like.",
    tags: ["Blockchain","Architecture"], readTime: "6 min", date: "Mar 2025",
    preview: "The standard counterargument — 'just use a database with audit logs' — ignores one fundamental constraint: the parties writing and reading the record have adversarial incentives. That changes the threat model entirely.",
    content: null,
  },
  {
    id: "vgg19-inference", title: "Deploying VGG19 in Production: Flask + TensorFlow Without the Pain",
    summary: "A practical walkthrough of serving a fine-tuned VGG19 model over HTTP. Covers model loading lifecycle, request preprocessing, class-weighted inference, and generating structured reports at under 2 seconds end-to-end.",
    tags: ["ML","Flask","Deployment"], readTime: "8 min", date: "Jan 2025",
    preview: "The first mistake is loading the model per-request. The second is trusting raw user image input. Here's the initialization pattern that avoids both.",
    content: null,
  },
  {
    id: "rl-vs-pid", title: "RL vs PID: Which Controller Wins for a Buck Converter?",
    summary: "I trained an RL agent in a custom OpenAI Gym environment to regulate a DC-DC buck converter against a classical PID controller. The results depend entirely on the load profile — and that nuance matters.",
    tags: ["RL","Control Systems"], readTime: "10 min", date: "Nov 2024",
    preview: "Under static loads, PID wins on simplicity and interpretability. Under dynamic step loads, the RL agent converges 12% faster. The question isn't which is better — it's which failure mode you can tolerate.",
    content: null,
  },
  {
    id: "web3-react", title: "Connecting React to Ethereum: A Minimal, Clean Pattern",
    summary: "Skip the boilerplate. The minimal architecture for connecting React to Solidity contracts — provider initialization, wallet state management, and contract call patterns — without importing half of npm.",
    tags: ["React","Web3","Solidity"], readTime: "5 min", date: "Oct 2024",
    preview: "Most Web3 React tutorials reach for ethers.js + wagmi + RainbowKit before writing a single contract call. Here's what the actual minimal viable pattern looks like.",
    content: null,
  },
  {
    id: "voice-ui", title: "Building Voice UIs That Don't Feel Like Toys",
    summary: "Web Speech API has a bad reputation. With an explicit state machine, proper interim-result handling, and a solid fallback path, voice interfaces can be genuinely production-ready.",
    tags: ["Voice UI","React","UX"], readTime: "7 min", date: "Aug 2024",
    preview: "The moment you treat the microphone as a simple toggle, you've lost. Voice state is a graph, not a boolean.",
    content: null,
  },
];