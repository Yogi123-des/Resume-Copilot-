# Resume-Copilot
A smart, client-facing interactive portfolio copilot. This website transforms a standard resume into a contextual conversation engine, enabling recruiters to communicate directly with an AI representation grounded in my real academic background, technical skills, and projects without hallucination risks.

---

## 🚀 Live Demo
- **Live Deployed App:** *https://resume-copilot.vercel.app/*


---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework:** Next.js (App Router, Client-Side State Management with React Hooks)
- **Styling:** Tailwind CSS (Custom utilities for fluent fluid transitions, responsive grids, and high-contrast dark theme selection modes)
- **Icons:** `lucide-react`

### Backend & AI Layer
- **API Router Engine:** Serverless Route Handlers (`/app/api/chat/route.ts`)
- **Core Orchestration:** GROQ API Integration with Strict Temperature Controls & Anti-Hallucination Guardrails
- **Data Engine:** Grounded JSON Context Vectoring (`profile.json`)

### System Architecture Flow
1. **User Interface Interaction:** A multi-tab layout displays Core Skills, Projects, Experience, Volunteering, and Education status.
2. **Contextual Ingestion:** When a user prompts a question, the website grabs my resume info from (`profile.json`), glues it to the prompt, and sends the whole package to OpenAI so the AI knows I am.
3. **Guardrail Evaluation:** The AI checks if it actually knows the answer based on my resume. If a user asks something completely random the AI doesn't make things up, it juts says to the user to contact me.

---

## 📌 Features & Implementation Details

- **Deterministic Context Grounding:** Every response from the chat module is strictly pinned to resume entries (`profile.json`). Unknown scopes trigger specialized edge-case fallbacks rather than creating imaginary stories.
- **Dynamic Suggested Prompt Pills:** The interactive container evaluates the context array length and immediately surfaces automated helper questions to speed up user journeys.
- **Microphone Dictation Interface:** Integrates native browser Web Speech Recognition APIs (`webkitSpeechRecognition`) to process audio streams straight into localized prompt states. ( a slight drawback here is that this feature for now only works on chrome)
- **Fluent UI Transitions:** Left-profile information tabs and messaging tracks utilize CSS motion properties (`animate-fluid-entry`, `animate-bubble-entry`) to optimize visual response perception during server round-trips.

---

## 💬 Sample Testing Q&A Pairs

Below are some Q&A pairs used to validate system performance under strict boundary evaluation rules (Note that these are not the exact answers but they will convey the same point):

### Q1: Do you have experience with AI integration?
- **Answer:** Yes, I built this portfolio copilot utilizing the OpenAI API, implementing strict grounding constraints and context mapping patterns to eliminate text hallucinations.

### Q2: What are some transferable skills you have?
- **Answer:** Some transferable skills that I have mastered include the art of public speaking, marketing funnel automation, and creative communication honed through stand-up comedy performance.

### Q3: What is your current academic status?
- **Answer:** I am currently pursuing a dual-degree undergraduate program in Physics and Computer Science at BITS Goa.

### Q4: Where did you complete your high school education?
- **Answer:** I completed my intermediate schooling from Delhi Public School specializing in the PCM (Physics, Chemistry, Mathematics) stream.

### Q5: What was your as mentor in PMP BITS Goa?
- **Answer** As a Mentor at the Peer Mentorship Program (PMP) BITS Goa, my role involved guiding and supporting many freshers at BITS Goa throughout their first year.

---
