---
title: 'A History of Vibe Coding, So Far'
date: 2025-09-27
category: "technical"
showToc: true
showTopImage: false
unlisted: false
synopsisForLlms: "A comprehensive timeline documenting the evolution of AI-assisted development from GitHub Copilot's launch in 2021 to the current landscape of terminal-based AI coding tools."
---

"Vibe coding" — the term coined by Andrej Karpathy in February 2025 — describes a new approach to programming where developers work in close collaboration with AI, iterating through code with an intuitive, almost conversational flow.

But vibe coding has changed tremendously in the past few years. Its capabilities have grown as new models have released, its meaning has evolved, and its applications have expanded. This is my best effort at documenting the history of AI-assisted programming, so far.

## The Copilot Era (2021-2023): The Foundation Years

AI tools for code assistance were around as early as 2021, but they didn't reach mainstream adoption until 2023. GitHub Copilot's launch in 2021 marked the beginning of AI code generation, but it took around two years for the technology and underlying models to mature enough for mainstream adoption.

### June 29, 2021: GitHub Announces Copilot for Technical Preview

GitHub announces GitHub Copilot for technical preview in Visual Studio Code, marking the first mainstream tool to generate code from natural language prompts. Built on OpenAI's Codex model, it represents a paradigm shift from traditional autocomplete to AI-driven code generation.

This was the first mainstream tool to allow code generation from natural language cues, sparking early experiments with AI-driven coding and establishing the foundation for what would eventually become vibe coding.

**References:**
- [Introducing GitHub Copilot: AI pair programmer](https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/)
- [GitHub Copilot Technical Preview](https://github.com/features/copilot)

### August 10, 2021: OpenAI Releases Codex (2021)

OpenAI announces Codex, a code autocompletion tool available in select IDEs like Visual Studio Code and Neovim. It was a modified, production version of GPT-3, fine-tuned on gigabytes of source code in a dozen programming languages. This was the original model powering GitHub Copilot.

This marked the first major AI model specifically designed for code generation, establishing the technical foundation that would power GitHub Copilot and influence all subsequent AI coding tools.

**References:**
- [OpenAI Codex](https://openai.com/index/openai-codex/)

### October 2021 - March 2022: Copilot Expands to Multiple IDEs

GitHub rapidly expands Copilot's availability across development environments. The JetBrains plugin launches on October 29, 2021, followed by the Neovim plugin on October 27, 2021, and Visual Studio 2022 support on March 29, 2022.

This expansion showed that AI coding assistance could work across diverse development environments, not just a single IDE, making it accessible to developers regardless of their preferred tools and workflows.

### June 21, 2022: Copilot Exits Technical Preview

GitHub announces that Copilot is out of technical preview and becomes available as a subscription-based service for individual developers. This marks the transition from experimental tool to commercial product.

This marked the transition from experimental tool to commercial product, signaling that the market was ready for AI-assisted coding tools and establishing the business model that would support the development of more advanced AI coding assistants.

**References:**
- [Copilot, GitHub's AI-powered programming assistant, is now generally available](https://techcrunch.com/2022/06/21/copilot-githubs-ai-powered-programming-assistant-is-now-generally-available/)

### November 30, 2022: ChatGPT and GPT-3.5 Launch

OpenAI releases ChatGPT as a free research preview, powered by GPT-3.5. While AI coding tools like Copilot existed since 2021, ChatGPT's conversational interface and free access brought AI capabilities to mainstream attention.

This marked the first time AI language models became widely accessible to the general public, not just developers. While not specifically designed for coding, ChatGPT's success demonstrated the potential for AI to assist with complex tasks and paved the way for more specialized coding tools.

**References:**
- [Introducing ChatGPT](https://openai.com/index/chatgpt/)

### March 14, 2023: AI Coding Tools Reach Mainstream Adoption

OpenAI releases GPT-4, a multimodal model that exhibits 'human-level performance' on professional benchmarks, with improved reasoning capabilities and a longer context window (32,768 tokens). The combination of GPT-3.5's conversational interface and GPT-4's improved capabilities led developers to realize that AI could generate larger, more complex code blocks, not just simple snippets.

This marked a turning point in AI capabilities, demonstrating that language models could perform at human levels on complex reasoning tasks. The breakthrough made AI coding assistance much more practical and reliable, accelerating adoption beyond early adopters to mainstream developers.

**References:**
- [OpenAI's GPT-4 exhibits 'human-level performance' on professional benchmarks](https://arstechnica.com/information-technology/2023/03/openai-announces-gpt-4-its-next-generation-ai-language-model/)
- [GPT-4 Technical Report](https://cdn.openai.com/papers/gpt-4.pdf)

### July 2, 2024: Supermaven Launches as Copilot Competitor

Supermaven launches as a direct competitor to GitHub Copilot, offering AI-powered code completion with a focus on context awareness and low latency.

This marked the beginning of a competitive landscape in AI coding assistants, showing that the market was large enough to support multiple players beyond just GitHub Copilot.

**References:**
- [Announcing Supermaven 1.0](https://supermaven.com/blog/announcing-supermaven-1.0)

## The Cursor Era (2024-2025): The IDE Revolution

Cursor's introduction marked a fundamental shift in how AI integrates with development workflows. This era saw AI move from being a helpful assistant to becoming deeply embedded in the coding process itself, leading to the coining of 'vibe coding' as a cultural phenomenon.

### August 22, 2024: Cursor Raises $60M Series A

Anysphere announces a $60 million Series A funding round led by Andreessen Horowitz and Thrive Capital, with participation from OpenAI, Jeff Dean, Noam Brown, and founders of Stripe, GitHub, Ramp, and Perplexity. The company reveals it has grown to over 40,000 customers.

This funding round validated Cursor's position as a leading AI coding tool and provided the resources needed for rapid expansion. The impressive customer growth demonstrated strong market demand for AI-assisted coding.

**References:**
- [Series A and Magic](https://cursor.com/blog/series-a)

### November 12, 2024: Cursor Acquires Supermaven

Anysphere, the company behind Cursor, acquires AI coding assistant Supermaven for an undisclosed sum. The acquisition enables Cursor to launch a new version of its Tab AI model that's 'fast, context-aware, and highly intelligent.'

This acquisition marked the consolidation of AI coding tools, with Cursor absorbing Supermaven's technology to enhance its own capabilities.

**References:**
- [Anysphere acquires Supermaven to beef up Cursor](https://techcrunch.com/2024/11/12/anysphere-acquires-supermaven-to-beef-up-cursor/)

### November 13, 2024: Windsurf Launches with AI Flows

Windsurf (formerly Codeium) launches the Windsurf Editor, introducing the concept of 'AI flows' that combine the collaborative nature of copilots with the independent capabilities of agents.

Windsurf was the first major competitor to Cursor, offering a similar product with minor differences in pricing and integration approaches.

**References:**
- [Windsurf Launch](https://windsurf.com/blog/windsurf-launch)

### January 13, 2025: Cursor Releases Upgraded Fusion Tab-Model

Cursor announces Fusion, their next generation Tab model that produces nearly instant, much higher quality cursor jumps while improving edit quality. The model accurately predicts over 25% more difficult edits per line and suggests over 10x longer stretches of changes.

This demonstrated that AI could embed deeply into IDE workflows, predicting edits and guiding code in a way that aligned with 'vibe' iteration.

**References:**
- [A new Tab model](https://cursor.com/blog/tab-update)

### February 2, 2025: Andrej Karpathy Coins 'Vibe Coding'

The former Tesla AI director and OpenAI researcher gives the practice its cultural identity, moving it from a niche developer habit to a named paradigm.

This gave the practice a cultural identity and marked the shift from niche habit to named paradigm. It provided a framework for understanding and discussing AI-assisted development.

**References:**
- [Andrej Karpathy Tweet](https://x.com/karpathy/status/1886192184808149383?lang=en)

### March 6, 2025: Y Combinator W25 Reports 25% AI Code Usage

Y Combinator's W25 batch reveals that approximately 25% of startups are relying on AI for more than 95% of their code generation, demonstrating that vibe coding has moved from experimental to production-ready.

This showed vibe coding moving into real startup production work, proving that the practice was viable for commercial software development, not just personal projects.

**References:**
- [A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/)

### June 30, 2025: Cursor Launches Web App for AI Coding Agents

Cursor extends vibe coding beyond traditional IDEs into browser and Slack workflows, making AI-assisted development more accessible across teams.

This extended vibe coding beyond IDEs into browser and Slack workflows, making it more accessible across teams and democratizing AI-assisted development beyond traditional developer tools.

**References:**
- [Cursor on web and mobile](https://cursor.com/blog/agent-web)

## The Terminal Era (2025): The Terminal Future

The introduction of Terminal-based AI coding tools, like Claude Code and OpenAI Codex CLI, marked a new phase where AI could take on more autonomous roles in development. This era represents the maturation of vibe coding from a practice to a legitimate field of study.

### February 24, 2025: Anthropic Releases Claude 3.7 Sonnet and Claude Code

Anthropic introduces Claude Code, a CLI tool with preview IDE support, pushing vibe coding into more agentic workflows where developers can delegate entire tasks to AI from the terminal.

This pushed vibe coding into more agentic workflows where developers could 'delegate' tasks to AI from the terminal, not just autocomplete. It represented a shift from reactive to proactive AI assistance.

**References:**
- [Claude 3.7 Sonnet and Claude Code](https://www.anthropic.com/news/claude-3-7-sonnet)

### April 16, 2025: OpenAI Launches Codex CLI

OpenAI launches Codex CLI, a lightweight, open source coding agent that runs locally in the terminal. This is a completely different product from their 2021 Codex model - it's designed to link OpenAI's models with local code and computing tasks.

This marked OpenAI's foray into competing with Claude Code and other terminal-based AI coding tools.

**References:**
- [OpenAI debuts Codex CLI, an open source coding tool for terminals](https://techcrunch.com/2025/04/16/openai-debuts-codex-cli-an-open-source-coding-tool-for-terminals/)

### May 16, 2025: OpenAI Launches New Codex Agent (2025)

OpenAI announces a research preview of a third distinct tool also named Codex, based on a fine-tuned version of o3. It's a software agent that performs tasks including writing features, answering codebase questions, running tests, and proposing PRs for review.

This represented a significant evolution in AI coding tools, moving beyond simple code completion to full software development workflows including testing and PR management.

**References:**
- [Introducing Codex](https://openai.com/index/introducing-codex/)

### May 22, 2025: Claude Code Reaches General Availability

Claude Code launches with full IDE integrations for VS Code and JetBrains, plus CI/CD support, expanding vibe coding from prototype territory into structured team workflows and enterprise environments.

This expanded vibe coding from prototype territory into structured team workflows, making AI-assisted development accessible to larger development teams and enterprise environments.

**References:**
- [Introducing Claude 4](https://www.anthropic.com/news/claude-4)

### June 25, 2025: Google Launches Gemini CLI

Google introduces Gemini CLI, an open-source AI agent that brings Gemini 2.5 Pro directly into developers' terminals. The tool offers unmatched free usage limits with 60 model requests per minute and 1,000 requests per day at no charge.

This represents Google's major entry into the terminal-based AI coding space, offering the industry's largest free usage allowance and bringing enterprise-grade AI capabilities directly to individual developers' command lines.

**References:**
- [Gemini CLI: your open-source AI agent](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/)

### September 29, 2025: Anthropic Releases Claude Sonnet 4.5

Anthropic releases Claude Sonnet 4.5, positioning it as "the best coding model in the world" with state-of-the-art performance on SWE-bench Verified (77.2%). Alongside the model release, Anthropic launches the Claude Agent SDK—the same infrastructure powering Claude Code—enabling developers to build long-running agents with memory, permissions, and subagent coordination. 

**References:**
- [Introducing Claude Sonnet 4.5](https://www.anthropic.com/news/claude-sonnet-4-5)

### November 18, 2025: Google Releases Gemini 3 Pro, Google Antigravity

Google releases Gemini 3 Pro, a new version of the Gemini model that is more capable of writing code. As a personal anecdote, this seems to be the most impressive model I've seen so far, capable of one-shotting most complex coding tasks with ease and without error.

Google also releases Google Antigravity, their take on an IDE. 

## Conclusion

Thanks for reading! If I missed anything, please [let me know](mailto:connor@connorrothschild.com).

Some notes:
- I'm missing some content on V0, Lovable, Replit, Bolt, etc. I'm unsure of their timelines, and also do not use them often, so I've omitted them until I learn more.
- There is a whole other world of "vibe coders" who know nothing about programming, and I don't know if they would consider the history of vibe coding differently. This is chiefly from the view of someone who knows programming.
