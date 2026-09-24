export type ProjectId = "ink" | "echo" | "evals" | "loads";

export type WorkflowBranch = {
  label: string;
  title: string;
  detail: string;
  output: string;
  tone: "mint" | "coral" | "blue" | "violet";
};

export type WorkflowProject = {
  id: ProjectId;
  number: string;
  mode: string;
  title: string;
  summary: string;
  description: string;
  inputLabel: string;
  input: string;
  orchestrator: string;
  orchestratorNote: string;
  branches: WorkflowBranch[];
  result: string;
  resultNote: string;
  overview: Array<{ title: string; detail: string; evidence: string }>;
  architecture: Array<{ title: string; components: string; detail: string }>;
  implementation: string;
};

const tones = ["mint", "coral", "blue", "violet"] as const;

export const workflowProjects: WorkflowProject[] = [
  {
    id: "ink", number: "01", mode: "Investigate", title: "InK-9 AI", summary: "Find the cause across evidence.",
    description: "A Master agent plans an investigation, routes bounded work to specialists, and returns an evidence-backed finding.",
    inputLabel: "Engineer issue and goal", input: "Why did a scheduled campaign stop after queue acceptance?",
    orchestrator: "Master · plan and specialist router", orchestratorNote: "Bind the session · draft a reviewable plan · route narrow questions",
    branches: [
      { label: "Log evidence", title: "Splunk logs", detail: "Search indexed events using concrete synthetic identifiers.", output: "Queue accepted; downstream trace absent", tone: tones[0] },
      { label: "Product state", title: "Marketo API", detail: "Perform a read-only lookup of the synthetic campaign state.", output: "Current record state or explicit zero result", tone: tones[1] },
      { label: "Specialist handoff", title: "Active specialist", detail: "Carry the question, prior findings, and source references.", output: "Bounded finding with evidence links", tone: tones[2] },
      { label: "Approval checkpoint", title: "Engineer review", detail: "Ask one blocking question only when the evidence requires it.", output: "Clarified scope and approved next action", tone: tones[3] },
    ], result: "Evidence-backed verdict", resultNote: "Facts · source references · hypothesis · confidence · next action",
    overview: [
      { title: "Frame the issue", detail: "Bind the engineer’s question and investigation goal to one session.", evidence: "A stable starting question and explicit scope." },
      { title: "Review the plan", detail: "Master drafts an ordered plan that can be edited and approved before execution.", evidence: "Plan preview and approval checkpoint." },
      { title: "Route specialists", detail: "Each specialist receives a narrow question and the evidence already gathered.", evidence: "Traceable handoffs without lost context." },
      { title: "Collect evidence", detail: "Search logs, inspect product state, and retain source references.", evidence: "Facts remain separate from hypotheses." },
      { title: "Assess confidence", detail: "Challenge the leading explanation and state remaining uncertainty.", evidence: "Calibrated confidence rather than false certainty." },
      { title: "Return a verdict", detail: "Consolidate facts, hypothesis, confidence, and next action.", evidence: "A supported finding—not an automatic fix." },
    ],
    architecture: [
      { title: "Input and control", components: "Engineer → Master → plan approval", detail: "The issue, goal, and approved scope stay attached to the session." },
      { title: "Specialist investigation", components: "Router → logs → API → handoff", detail: "Bounded specialist work returns evidence and uncertainty." },
      { title: "Evidence and output", components: "Sources → assessment → verdict", detail: "Master consolidates without overstating what the evidence proves." },
    ], implementation: "FastAPI · model routing · Splunk · Marketo APIs · session isolation · confidence-aware investigation",
  },
  {
    id: "echo", number: "02", mode: "Test", title: "Echo AI", summary: "Test an AI conversation end to end.",
    description: "A test mission drives a browser conversation, captures runtime evidence, and verifies whether the requested outcome actually occurred.",
    inputLabel: "Mission with assertions", input: "Create a sample nurture campaign for a fictional audience. #ASSERT: expected UI outcome",
    orchestrator: "Isolated session · Playwright / Chromium", orchestratorNote: "Authenticate · converse · intercept streams · enforce runtime guards",
    branches: [
      { label: "Conversation", title: "Baby Falco chat", detail: "Capture assistant turns, tool events, and the next bounded prompt.", output: "Conversation transcript and guard events", tone: tones[0] },
      { label: "Browser state", title: "DOM actions", detail: "Observe and operate the interface through Playwright.", output: "Actions and observed UI state", tone: tones[1] },
      { label: "Visual evidence", title: "Screenshots", detail: "Capture a screen and use vision analysis only when needed.", output: "Image-backed evidence", tone: tones[2] },
      { label: "Verification", title: "Assertion checker", detail: "Compare the mission’s assertion with observed behavior.", output: "Pass, fail, or reproducible bug artifact", tone: tones[3] },
    ], result: "Mission report", resultNote: "Conversation · verdict · screenshots · assertion result · bug evidence · HTML report",
    overview: [
      { title: "Read the mission", detail: "Load the objective, environment, limits, and explicit assertions.", evidence: "One isolated mission session." },
      { title: "Open the browser", detail: "Playwright starts Chromium and performs the permitted login flow.", evidence: "Browser state and session boundary." },
      { title: "Conduct the conversation", detail: "Send the mission and capture streamed assistant and tool events.", evidence: "Complete turn and event record." },
      { title: "Guard the runtime", detail: "Detect errors, rate limits, truncation, duplicates, and time limits.", evidence: "A bounded, inspectable execution." },
      { title: "Verify the outcome", detail: "Check the assertion against DOM, network, and screenshot evidence.", evidence: "A confident answer alone is not proof." },
      { title: "Preserve the result", detail: "Write the verdict, evidence, and replayable bug artifact when needed.", evidence: "Conversation and HTML mission report." },
    ],
    architecture: [
      { title: "Mission and session", components: "Mission text → isolated worker → Chromium", detail: "Each run has explicit limits and a unique evidence boundary." },
      { title: "Conversation and action", components: "Chat/SSE → reasoning → DOM actions", detail: "Runtime guards constrain how the test continues." },
      { title: "Verification and output", components: "Assertions → screenshots → report", detail: "Observed outcomes determine the verdict." },
    ], implementation: "Playwright / Chromium · chat and SSE interception · runtime guards · assertion verification · screenshots · session reports",
  },
  {
    id: "evals", number: "03", mode: "Evaluate", title: "Echo Evals", summary: "Score and explain response quality.",
    description: "Saved sessions are evaluated against available evidence, then repeated exact missions are compared for regressions.",
    inputLabel: "Evaluation input", input: "Saved Echo session or defined prompt and expected-behavior pair",
    orchestrator: "Evaluation runner", orchestratorNote: "Parse relevant turns · retrieve available documentation · assemble context",
    branches: [
      { label: "Target response", title: "Relevant turns", detail: "Select the user and assistant turns that answer the mission.", output: "Mission, recent context, and target answer", tone: tones[0] },
      { label: "Grounding", title: "Documentation", detail: "Retrieve supporting excerpts when available without inventing sources.", output: "Evidence or explicit no-document state", tone: tones[1] },
      { label: "Evaluation", title: "Claude judge", detail: "Assess the answer with a validated five-part rubric.", output: "Correctness, consistency, alignment, completeness, helpfulness", tone: tones[2] },
      { label: "Comparison", title: "Repeated missions", detail: "Group exact mission matches across sessions.", output: "Regression, strengths, and recurring weak spots", tone: tones[3] },
    ], result: "Quality report", resultNote: "Per-session JSON / HTML · score reasons · cross-session comparison dashboard",
    overview: [
      { title: "Discover sessions", detail: "Load a saved session or a defined prompt and expected pair.", evidence: "Known evaluation input." },
      { title: "Parse relevant turns", detail: "Skip generic welcome text and isolate the answer under review.", evidence: "The actual answer is the evaluation unit." },
      { title: "Retrieve grounding", detail: "Search available documentation and declare when none is available.", evidence: "No invented authoritative source text." },
      { title: "Score the response", detail: "Apply the five 1–5 quality dimensions with specific reasons.", evidence: "Unsupported assurance can fail correctness." },
      { title: "Compare repetitions", detail: "Group repeated exact missions across sessions.", evidence: "Consistency and regression findings." },
      { title: "Review findings", detail: "Inspect the sentence, score, evidence, and comparison result.", evidence: "JSON, HTML, and dashboard views." },
    ],
    architecture: [
      { title: "Session inputs", components: "Saved session → turn parser → target answer", detail: "The evaluator retains mission and conversational context." },
      { title: "Evidence and judge", components: "Documentation → context → five-part rubric", detail: "Scoring reasons remain tied to available evidence." },
      { title: "Reports and comparison", components: "Session result → exact-mission groups → dashboard", detail: "Individual quality and repeated behavior remain distinct." },
    ], implementation: "Evaluation runner · document retrieval · Claude judge · five-part rubric · per-session reports · comparison dashboard",
  },
  {
    id: "loads", number: "04", mode: "Load", title: "Echo Loads", summary: "Inspect measured capacity evidence.",
    description: "Parallel workers exercise chat and callable-agent paths while request and skill-invocation evidence remains distinct.",
    inputLabel: "Load configuration", input: "Users · spawn rate · duration · target · weighted skill mix",
    orchestrator: "Locust virtual users", orchestratorNote: "Start concurrent workers · choose a skill · send bounded API requests",
    branches: [
      { label: "Chat path", title: "Chat requests", detail: "Workers submit synthetic conversations through the configured chat path.", output: "HTTP response and streamed events", tone: tones[0] },
      { label: "Agent path", title: "Callable agents", detail: "Workers submit synthetic callable-agent requests.", output: "Agent response and invocation evidence", tone: tones[1] },
      { label: "Stream parsing", title: "SSE counters", detail: "Separate tool events, token estimates, and rate-limit signals.", output: "Skill invocations and rate-limit counts", tone: tones[2] },
      { label: "Telemetry", title: "Locust metrics", detail: "Track request throughput, latency, and failures.", output: "Run-level performance measures", tone: tones[3] },
    ], result: "Load-test report", resultNote: "Supplied run: 564 requests · 564 skill invocations · 0 failures · HTML / CSV",
    overview: [
      { title: "Configure the run", detail: "Set users, spawn rate, duration, target, and weighted skill mix.", evidence: "A defined workload rather than an estimate." },
      { title: "Start workers", detail: "Locust creates concurrent virtual users with bounded lifecycle hooks.", evidence: "Parallel synthetic execution." },
      { title: "Exercise both paths", detail: "Workers choose a chat skill or callable-agent request.", evidence: "Separate request paths." },
      { title: "Parse streamed events", detail: "Collect text, tool calls, results, and rate-limit events.", evidence: "HTTP success stays distinct from skill invocation." },
      { title: "Measure the run", detail: "Track throughput, latency, failures, invocations, and token estimates.", evidence: "Supplied sample: 564 requests and invocations, zero failures." },
      { title: "Review the report", detail: "Export saved dashboards and run summaries against configured thresholds.", evidence: "One recorded sample, not extrapolated capacity." },
    ],
    architecture: [
      { title: "Configuration", components: "Operator → users → spawn rate → skill mix", detail: "Every run begins with explicit workload parameters." },
      { title: "Concurrent execution", components: "Locust → chat path / agent path → SSE", detail: "Workers exercise distinct service paths and parse their events." },
      { title: "Measurement", components: "Counters → latency / errors → report", detail: "Requests, invocations, and rate limits remain separate metrics." },
    ], implementation: "Locust · concurrent workers · chat and callable-agent APIs · SSE parsing · counters · HTML / CSV reports",
  },
];
