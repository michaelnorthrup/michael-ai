// Public-safe knowledge base for the chat assistant.
// Source of truth: Remote Brain/Projects/career/Resume (LinkedIn Profile.md,
// 2026 Accomplishments.md Layer 2, Work Experience/*). Only public-cleared
// facts belong here: no internal project/platform names, no compensation,
// no colleague names, no unverified metrics.

export const PROFILE: string = `
# Michael Northrup

Location: Salt Lake City, Utah.
Email: michael.northrup.data@gmail.com
LinkedIn: https://www.linkedin.com/in/m-northrup/

## Positioning
Applied AI / forward-deployed solutions engineer and tech lead. He helps business teams turn ambiguous AI opportunities into secure, adopted production workflows, and builds the playbooks and capability that let other teams do the same. Roughly 8+ years across data science, ML engineering, and applied AI, in HR tech, fintech, and healthcare.

His forward-deployed work is internal: he embeds with business teams at his company (CX, payroll, revenue, operations) from discovery through adoption. He has not worked as an external client-facing FDE at a consulting firm; describe it accurately.

## Current role: Sr. AI Solutions Engineer & Tech Lead, BambooHR (Feb 2026 – present, Salt Lake City)
Works as an internal forward-deployed AI engineer for Customer Experience, payroll, revenue, and operations teams. Owns projects end to end: stakeholder discovery, scoping, architecture, build, deployment, adoption, and handoff. Since October 2026 he has also been a tech lead across a set of AI Ops projects and one of the team's lead architects.

Shipped and in-flight work (described generically; internal names are not public):
- An agent-based payroll anomaly-detection system built with evals from the start (ReAct-style agent, human review), plus a rule-lineage tool that lets payroll experts verify every detection rule back to its source data columns. It passed its go/no-go review.
- Document AI for payroll onboarding audits: LLMs extract data from scanned and multi-format tax filings, verify it against a new client's payroll setup, and link every finding to its source document. Auditors can review each rule in plain English and down to its source columns.
- A customer-interaction intelligence pipeline that turns support, phone, chat, and client-meeting conversations into product, service, and sales-expansion signals (grew from sentiment classification into commercial lead signals).
- An internal AI application platform that handles sign-in, access control, data and PII access, LLM access, and deployment once at the platform level, so a new app becomes a folder and a config file instead of weeks of tickets and hand-built plumbing. He owns this platform; its design was grounded in an audit of existing apps that found the same auth, session, and LLM-wrapper plumbing rebuilt many times.
- A human-in-the-loop AI project-management companion that turns documents and meeting transcripts into reviewable decisions, risks, action items, status updates, and cross-project dependencies. It was productionized with SSO, a managed database, observability, and CI/CD.
- Strategy and architecture for a knowledge and content program that unifies fragmented help-center and learning content into a governed source of truth for customer help, internal learning, and AI retrieval. Key insight he often shares: AI retrieval is only as trustworthy as the content operating model underneath it.
- A secure, observable full-stack AI writing assistant (auth, rate limiting, caching, real cost tracking, metrics, autoscaling).
- A reusable AI application launch playbook giving teams a rapid-experiment path and a production path, covering CI/CD, secrets, security review, data governance, service accounts, access control, monitoring, and launch, including the non-obvious failure modes he hit while shipping real apps.

Enablement and leadership:
- Helped a portfolio of CX AI initiatives get through deployment, identity, data access, connectors, and production readiness, and coached project owners through discovery and scoping.
- Built and delivered a multi-module coding-agent curriculum for the technology organization (environment setup, context management, Git, planning, verification, working with coding agents, AI code review). Co-delivered company-wide Claude Code training.
- Launched an AI Champions program, ran recurring hands-on workshops (coding agents, agentic workflows, MCP), planned CX hackathons, and was brought into CX leadership AI training.
- As tech lead: set a right-sized engineering approach (invest in architecture and guardrails up front, then move fast inside them), introduced risk tiers (prototype, internal tool, production) with their own definition of done, and studied the team's code-review data (hundreds of PRs, 1,000+ review comments), finding the cost was waiting for review rather than reviewing. He proposed risk-based review levels and a much leaner, CI-enforced coding standard. These are proposals, not yet adopted outcomes.
- Ran a hiring loop and helped hire a Senior Data Scientist; mentors new team members.
- Works across CX, Data Engineering, Payroll, Sales, Architecture, IT, Security, and Governance, translating AI ideas into the technical, data, security, and ownership decisions needed to run them.

## Data Scientist II, BILL (Jan 2025 – Jan 2026, Draper, UT)
Fintech; the role was entirely Customer Experience focused.
- Found an overlooked transaction-decline problem, built the business case, pitched it, and drove it to production, surfacing a $25M total-payment-volume opportunity by predicting 50% of transaction declines.
- Developed and deployed decline-intervention models that contributed to a $3M monthly revenue increase while improving the customer payment experience.
- Architected the production ML foundation: SageMaker and S3 data lake, monitoring, and drift detection.
- Created a standardized Feature/Train/Inference/Production (FTIP) framework that made model deployment and retraining repeatable across the company.
- Built dbt models and an internal data-science package that standardized cross-functional definitions and model-development workflows.

## Senior Data Scientist, Preston Ventures (Nov 2023 – May 2024, Aliso Viejo, CA)
- Engineered ETL workflows for data collection, preprocessing, and labeling for healthcare models.
- Architected and deployed healthcare models with feature engineering, rigorous validation, and hyperparameter optimization.
- Implemented MLflow model tracking and versioning for reproducibility across interdisciplinary teams.

## Full Stack Data Scientist, Bayesian Health (Nov 2022 – Nov 2023, New York, NY)
- Developed and validated predictive models on electronic health record (EHR) data for clinical decision support.
- Deployed models into customer-facing applications, with state-machine decision logic for real-time insights.
- Built MLOps foundations: model registries, monitoring, automated deployment pipelines.
- This is where his reliability mindset comes from: a model is only useful when it operates safely and clearly inside a real workflow.

## Associate Data Scientist, BioFire Diagnostics (Aug 2018 – Feb 2022, Salt Lake City)
- Built a role-based web application giving teams secure access to sensitive healthcare data with HIPAA compliance.
- Automated validation for customer-facing data pipelines, resolving dozens of API and analytics quality issues.
- Modernized data-science infrastructure on AWS (scheduled workflows, database migrations); built LSTM time-series forecasting.

## Earlier
- Data Science Intern, Intermountain Healthcare (summer 2017): survival-analysis models for employee-turnover risk that informed a retention program; presented to non-technical audiences.
- Research Assistant, Rocky Mountain Center for Occupational and Environmental Health (2017–2018): statistical analysis in R and SQL, literature reviews, survival analysis of job-turnover risk factors.

## Education
- Master of Statistics, University of Utah
- B.S. in Mathematics and Statistics, University of Utah

## Skills
- Applied AI: AI agents, LLM applications, RAG, LLM evaluation (including LLM-as-judge), MCP, human-in-the-loop workflows, multi-tier classifiers (embeddings → LLM → fine-tuned model), prompt and model selection.
- ML: predictive modeling, anomaly detection, survival analysis, time-series forecasting, A/B testing, MLOps (registries, monitoring, drift detection, automated deployment).
- Engineering: Python, TypeScript, SQL, R; FastAPI, Flask; Docker, Kubernetes; AWS (SageMaker, S3, Redshift, EC2, EMR, Glue); Databricks, Snowflake, dbt, MLflow, Spark, Airflow; PostgreSQL/MySQL; Okta/OIDC; Prometheus/OpenTelemetry; Chrome extensions.
- AI tooling: Anthropic Claude and Claude Code, OpenAI.
- Leadership: technical leadership and architecture, AI enablement and training, cross-functional delivery, business cases, explaining technical work to non-technical audiences.
- Domains: customer experience, HR/people tech, fintech, healthcare.

## How he works (themes he would stand behind)
- The model is rarely the hardest part. AI adoption speeds up when teams have a clear path from idea to a secure, supported product.
- Building one useful AI system matters; making the next ten easier to build is where impact compounds.
- Good enablement is not doing every project for people. It is creating a path they can follow without rediscovering every hidden failure.
- Thin-deploy-first: get a minimal service building, passing security gates, and answering a health check before adding databases, auth, and live data.
- Evals and human review from the start for anything that touches money or sensitive data.
`.trim();
