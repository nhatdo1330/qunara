export const career = [
  { period: "Present", company: "Adobe", role: "Senior Software Quality Engineer", detail: "Quality engineering, automation, distributed-system investigation, and AI-assisted testing across enterprise marketing and data platforms." },
  { period: "2021", company: "eBay / AvenueCode", role: "Senior QA Automation Engineer", detail: "Automation for Purchase History, Buy It Now, and Add to Cart, expanding API and UI coverage while sustaining reliable execution." },
  { period: "2020—2021", company: "First Tech Credit Union", role: "Senior QA Automation Engineer", detail: "Online-banking automation and DevOps integration, including more than 100 wire-transfer cases delivered in ten days." },
  { period: "2014—2019", company: "MeU Solutions", role: "Test Lead & Automation Lead", detail: "Led exploratory and automated testing, built Java and Python frameworks, and helped grow a testing department beyond 40 engineers." },
  { period: "2011—2014", company: "KMS Technology", role: "Software Tester & Test Lead", detail: "Built keyword-driven and Page Object frameworks, shaped test strategy, and led client teams of up to ten engineers." },
  { period: "2007—2011", company: "TRG-Enclave", role: "Senior QA Engineer", detail: "Led testing teams, built Java automation, contributed C/C++ GIS development, and tested SAP-based ERP modules." },
  { period: "Through 2007", company: "Global CyberSoft", role: "Quality & Process Contributor", detail: "Served on the appraisal team that contributed to the organization achieving CMMI Level 4." },
] as const;

export const skillGroups = [
  ["AI systems", "Agent orchestration · LLM evaluation · model routing · evidence synthesis · mission control · workload generation"],
  ["Languages", "TypeScript · JavaScript · Python · Java · C/C++ · C# · SQL · Node.js"],
  ["Automation", "Playwright · Locust · Selenium · WebDriverIO · Cypress · REST Assured · JMeter"],
  ["Cloud & delivery", "AWS · Jenkins · GitHub · CI/CD · Docker · Kubernetes · release validation"],
  ["Data & observability", "Splunk · Snowflake · Databricks · Amazon S3 · SQL Server · MongoDB"],
  ["Quality practice", "API · UI · integration · exploratory · performance · load · security · context-driven testing"],
] as const;

export const credentials = [
  "B.S. Computer Science · HUFLIT University · 2001",
  "PCAP Certified Python Professional · 2021",
  "AWS Certified Cloud Practitioner · 2020",
  "PMP · PMI-RMP · PMI-ACP",
  "Rapid Software Testing · Satisfice · 2016",
  "ISEB ISTQB Certified Tester · 2010",
] as const;

export const publications = [
  { title: "Graph Builder for Exploratory Testing from a Novel Approach", venue: "SOMET 2018 · Spain" },
  { title: "A Novel Approach for Context-Driven Testing Using Heuristics and Machine Learning for Web Applications", venue: "INISCOM 2018 · Da Nang · published by Springer" },
] as const;

export type InvestigationStep = { label: string; actor: string; title: string; detail: string; evidence: string };

export const investigationSteps: InvestigationStep[] = [
  { label: "Triage", actor: "Master", title: "Frame the incident", detail: "A scheduled synthetic campaign stopped after queue acceptance. Establish the last healthy boundary and define what evidence can change the hypothesis.", evidence: "Case INK-SYN-204 · synthetic tenant" },
  { label: "Plan", actor: "Master", title: "Route bounded questions", detail: "Assign configuration, queue, and delivery specialists. Each receives a narrow question and must return evidence, uncertainty, and the next discriminating check.", evidence: "3 specialist plans approved" },
  { label: "Agents", actor: "Specialists", title: "Investigate independently", detail: "Configuration is valid. The queue accepted the job. No downstream delivery event appears in the synthetic trace.", evidence: "7 synthetic artifacts inspected" },
  { label: "Evidence", actor: "Evidence reviewer", title: "Challenge the leading theory", detail: "A control run reaches delivery through the same configuration, narrowing the suspected boundary without declaring a root cause too early.", evidence: "Control run compared" },
  { label: "Assessment", actor: "Master", title: "Calibrate confidence", detail: "The handoff boundary is the strongest supported location. Evidence is consistent but one correlating trace is still absent.", evidence: "Confidence · 0.78" },
  { label: "Verdict", actor: "Master", title: "Return an accountable finding", detail: "Probable handoff failure after queue acceptance. Preserve the evidence bundle and request the missing correlation before escalation.", evidence: "Verdict · probable, not proven" },
];

export const echoMission = [
  ["Mission", "Create a sample nurture campaign using a fictional audience and an approved synthetic email."],
  ["Browser conversation", "Coworker asks for the objective and audience; Echo supplies bounded synthetic details and captures the streamed response."],
  ["Captured evidence", "Conversation turns, browser state, network events, and a redacted synthetic screenshot are attached to the run."],
  ["Outcome verification", "The mission assessor checks completion, then structural verification confirms the expected campaign steps and required fields."],
  ["Bug artifact", "A deliberate authorization failure produces a reproducible artifact with the synthetic transcript, observed result, expected result, and replay steps."],
] as const;

export const evalDimensions = ["Correctness", "Consistency", "Alignment", "Completeness", "Helpfulness"] as const;

export const loadSkillResults = [
  { name: "Plan Program", requests: 160, averageToolCalls: 8.3 },
  { name: "Plan Campaigns", requests: 109, averageToolCalls: 9.6 },
  { name: "Create Program", requests: 177, averageToolCalls: 14.1 },
  { name: "Standardize Data", requests: 118, averageToolCalls: 8.7 },
] as const;
