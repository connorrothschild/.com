"use client";

import React, { useState, useEffect } from "react";

// Timeline data structure
const timelineData = [
  {
    id: "copilot-beta",
    date: "June 29, 2021",
    title: "GitHub Announces Copilot for Technical Preview",
    description:
      "GitHub announces GitHub Copilot for technical preview in Visual Studio Code, marking the first mainstream tool to generate code from natural language prompts. Built on OpenAI's Codex model, it represents a paradigm shift from traditional autocomplete to AI-driven code generation.",
    references: [
      {
        title: "Introducing GitHub Copilot: AI pair programmer",
        link: "https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/",
      },
      {
        title: "GitHub Copilot Technical Preview",
        link: "https://github.com/features/copilot",
      },
    ],
    significance:
      "This was the first mainstream tool to allow code generation from natural language cues, sparking early experiments with AI-driven coding and establishing the foundation for what would eventually become vibe coding. It also marked the evolution of Microsoft's earlier research into practical, widely-available AI coding assistance.",
    tier: 1,
    era: "copilot-era",
    daysSincePrevious: 0,
  },
  {
    id: "openai-codex-2021",
    date: "August 10, 2021",
    title: "OpenAI Releases Codex (2021)",
    description:
      "OpenAI announces Codex, a code autocompletion tool available in select IDEs like Visual Studio Code and Neovim. It was a modified, production version of GPT-3, fine-tuned on gigabytes of source code in a dozen programming languages. This was the original model powering GitHub Copilot.",
    references: [
      {
        title: "OpenAI Codex",
        link: "https://openai.com/index/openai-codex/",
      },
    ],
    significance:
      "This marked the first major AI model specifically designed for code generation, establishing the technical foundation that would power GitHub Copilot and influence all subsequent AI coding tools.",
    tier: 2,
    era: "copilot-era",
    daysSincePrevious: 42,
  },
  {
    id: "copilot-expansion",
    date: "October 2021 - March 2022",
    title: "Copilot Expands to Multiple IDEs",
    description:
      "GitHub rapidly expands Copilot's availability across development environments. The JetBrains plugin launches on October 29, 2021, followed by the Neovim plugin on October 27, 2021, and Visual Studio 2022 support on March 29, 2022. This multi-platform approach demonstrates the tool's potential to work across different coding environments and developer preferences.",
    references: [
      {
        title: "GitHub Copilot available for JetBrains and Neovim",
        link: "https://news.ycombinator.com/item?id=29016506",
      },
    ],
    significance:
      "This expansion showed that AI coding assistance could work across diverse development environments, not just a single IDE, making it accessible to developers regardless of their preferred tools and workflows.",
    tier: 3,
    era: "copilot-era",
    daysSincePrevious: 80,
  },
  {
    id: "copilot-general-availability",
    date: "June 21, 2022",
    title: "Copilot Exits Technical Preview",
    description:
      "GitHub announces that Copilot is out of technical preview and becomes available as a subscription-based service for individual developers. This marks the transition from experimental tool to commercial product, signaling the market's readiness for AI-assisted coding tools.",
    references: [
      {
        title:
          "Copilot, GitHub's AI-powered programming assistant, is now generally available",
        link: "https://techcrunch.com/2022/06/21/copilot-githubs-ai-powered-programming-assistant-is-now-generally-available/",
      },
    ],
    significance:
      "This marked the transition from experimental tool to commercial product, signaling that the market was ready for AI-assisted coding tools and establishing the business model that would support the development of more advanced AI coding assistants.",
    tier: 2,
    era: "copilot-era",
    daysSincePrevious: 84,
  },
  {
    id: "chatgpt-gpt35",
    date: "November 30, 2022",
    title: "ChatGPT and GPT-3.5 Launch",
    description:
      "OpenAI releases ChatGPT as a free research preview, powered by GPT-3.5. While AI coding tools like Copilot existed since 2021, ChatGPT's conversational interface and free access brought AI capabilities to mainstream attention. The model could engage in natural language conversations and assist with coding tasks, though it wasn't specifically optimized for code generation.",
    references: [
      {
        title: "Introducing ChatGPT",
        link: "https://openai.com/index/chatgpt/",
      },
    ],
    significance:
      "This marked the first time AI language models became widely accessible to the general public, not just developers. While not specifically designed for coding, ChatGPT's success demonstrated the potential for AI to assist with complex tasks and paved the way for more specialized coding tools.",
    tier: 1,
    era: "copilot-era",
    daysSincePrevious: 162,
  },
  {
    id: "ai-coding-mainstream-adoption",
    date: "March 14, 2023",
    title:
      "AI Coding Tools Reach Mainstream Adoption Due to New Model Performance",
    description:
      "OpenAI releases GPT-4, a multimodal model that exhibits 'human-level performance' on professional benchmarks, with improved reasoning capabilities and a longer context window (32,768 tokens). While AI coding tools like Copilot existed since 2021, they reached mainstream adoption in early 2023 due to these powerful new models. The combination of GPT-3.5's conversational interface and GPT-4's improved capabilities led developers to realize that AI could generate larger, more complex code blocks, not just simple snippets.",
    references: [
      {
        title:
          "OpenAI's GPT-4 exhibits 'human-level performance' on professional benchmarks",
        link: "https://arstechnica.com/information-technology/2023/03/openai-announces-gpt-4-its-next-generation-ai-language-model/",
      },
      {
        title: "GPT-4 Technical Report",
        link: "https://cdn.openai.com/papers/gpt-4.pdf",
      },
    ],
    significance:
      "This marked a turning point in AI capabilities, demonstrating that language models could perform at human levels on complex reasoning tasks. The breakthrough made AI coding assistance much more practical and reliable, accelerating adoption beyond early adopters to mainstream developers. This period marked the transition from experimental tools used by early adopters to mainstream adoption by regular developers, though concerns about code reliability and security also emerged.",
    tier: 1,
    era: "copilot-era",
    daysSincePrevious: 104,
  },
  {
    id: "supermaven-launch",
    date: "July 2, 2024",
    title: "Supermaven Launches as Copilot Competitor",
    description:
      "Supermaven launches as a direct competitor to GitHub Copilot, offering AI-powered code completion with a focus on context awareness and low latency. The tool positions itself as an alternative to Copilot with different pricing and integration approaches.",
    references: [
      {
        title: "Announcing Supermaven 1.0",
        link: "https://supermaven.com/blog/announcing-supermaven-1.0",
      },
    ],
    significance:
      "This marked the beginning of a competitive landscape in AI coding assistants, showing that the market was large enough to support multiple players beyond just GitHub Copilot. Supermaven's focus on context awareness and low latency demonstrated the importance of technical differentiation in the AI coding space.",
    tier: 3,
    era: "copilot-era",
    daysSincePrevious: 51,
  },
  {
    id: "cursor-series-a",
    date: "August 22, 2024",
    title: "Cursor Raises $60M Series A and Announces 40,000 Customers",
    description:
      "Anysphere announces a $60 million Series A funding round led by Andreessen Horowitz and Thrive Capital, with participation from OpenAI, Jeff Dean, Noam Brown, and founders of Stripe, GitHub, Ramp, and Perplexity. The company reveals it has grown to over 40,000 customers, including innovative startups, research labs, and enterprises, and has built SOTA next-edit-prediction models and multi-billion-file retrieval systems.",
    references: [
      {
        title: "Series A and Magic",
        link: "https://cursor.com/blog/series-a",
      },
    ],
    significance:
      "This funding round validated Cursor's position as a leading AI coding tool and provided the resources needed for rapid expansion. The impressive customer growth to 40,000 users demonstrated strong market demand for AI-assisted coding, while the high-profile investor backing signaled confidence in the company's vision of 'building a magical tool that will one day write all the world's software.'",
    tier: 2,
    era: "cursor-era",
    daysSincePrevious: 51,
  },
  {
    id: "cursor-acquires-supermaven",
    date: "November 12, 2024",
    title: "Cursor Acquires Supermaven",
    description:
      "Anysphere, the company behind Cursor, acquires AI coding assistant Supermaven for an undisclosed sum. The acquisition enables Cursor to launch a new version of its Tab AI model that's 'fast, context-aware, and highly intelligent,' especially at sequences of long code. Supermaven's Babble model, with its 1 million token context window and low-latency architecture, will be integrated into Cursor's technology stack.",
    references: [
      {
        title: "Anysphere acquires Supermaven to beef up Cursor",
        link: "https://techcrunch.com/2024/11/12/anysphere-acquires-supermaven-to-beef-up-cursor/",
      },
    ],
    significance:
      "This acquisition marked the consolidation of AI coding tools, with Cursor absorbing Supermaven's technology to enhance its own capabilities. It demonstrated the competitive nature of the AI coding assistant market and showed how established players were acquiring innovative competitors to strengthen their position.",
    tier: 2,
    era: "cursor-era",
    daysSincePrevious: 82,
  },
  {
    id: "windsurf-launch",
    date: "November 13, 2024",
    title: "Windsurf Launches with AI Flows",
    description:
      "Windsurf (formerly Codeium) launches the Windsurf Editor, introducing the concept of 'AI flows' that combine the collaborative nature of copilots with the independent capabilities of agents. The editor features Cascade, a conversational AI that understands human actions in real-time, and Supercomplete, which predicts next intent rather than just next text.",
    references: [
      {
        title: "Windsurf Launch",
        link: "https://windsurf.com/blog/windsurf-launch",
      },
    ],
    significance:
      "Windsurf was the first major competitor to Cursor, offering a similar product with minor differences in pricing and integration approaches.",
    tier: 1,
    era: "cursor-era",
    daysSincePrevious: 1,
  },
  {
    id: "cursor-fusion",
    date: "January 13, 2025",
    title: "Cursor Releases Upgraded Fusion Tab-Model",
    description:
      "Cursor announces Fusion, their next generation Tab model that produces nearly instant, much higher quality cursor jumps while improving edit quality. The model accurately predicts over 25% more difficult edits per line and suggests over 10x longer stretches of changes compared to their March 2024 original model, with 260ms latency and 13,000 token context length.",
    references: [
      {
        title: "A new Tab model",
        link: "https://cursor.com/blog/tab-update",
      },
    ],
    significance:
      "This demonstrated that AI could embed deeply into IDE workflows, predicting edits and guiding code in a way that aligned with 'vibe' iteration. The Fusion model's ability to suggest both edits and cursor jumps represents a significant advancement in making AI coding assistance feel more natural and intuitive.",
    tier: 1,
    era: "cursor-era",
    daysSincePrevious: 62,
  },
  {
    id: "karpathy-coins-term",
    date: "February 2, 2025",
    title: "Andrej Karpathy Coins 'Vibe Coding'",
    description:
      "The former Tesla AI director and OpenAI researcher gives the practice its cultural identity, moving it from a niche developer habit to a named paradigm. This moment marks the shift from underground practice to recognized methodology.",
    references: [
      {
        title: "Andrej Karpathy Tweet",
        link: "https://x.com/karpathy/status/1886192184808149383?lang=en",
      },
    ],
    significance:
      "This gave the practice a cultural identity and marked the shift from niche habit to named paradigm. It provided a framework for understanding and discussing AI-assisted development.",
    tier: 1,
    era: "cursor-era",
    daysSincePrevious: 20,
  },
  {
    id: "yc-w25-report",
    date: "March 6, 2025",
    title: "Y Combinator W25 Reports 25% AI Code Usage",
    description:
      "Y Combinator's W25 batch reveals that approximately 25% of startups are relying on AI for more than 95% of their code generation, demonstrating that vibe coding has moved from experimental to production-ready. YC managing partner Jared Friedman noted that these were all highly technical founders who would have built products from scratch a year ago, but now rely almost entirely on AI.",
    references: [
      {
        title:
          "A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated",
        link: "https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/",
      },
    ],
    significance:
      "This showed vibe coding moving into real startup production work, proving that the practice was viable for commercial software development, not just personal projects. The fact that highly technical founders are choosing AI over traditional coding represents a fundamental shift in how software is built.",
    tier: 2,
    era: "cursor-era",
    daysSincePrevious: 32,
  },
  {
    id: "cursor-web-app",
    date: "June 30, 2025",
    title: "Cursor Launches Web App for AI Coding Agents",
    description:
      "Cursor extends vibe coding beyond traditional IDEs into browser and Slack workflows, making AI-assisted development more accessible across teams and breaking down barriers between coding and collaboration tools. The web platform allows users to run tasks while away, access from any device, collaborate seamlessly with team members, and work with rich context including images and parallel agent execution.",
    references: [
      {
        title: "Cursor on web and mobile",
        link: "https://cursor.com/blog/agent-web",
      },
    ],
    significance:
      "This extended vibe coding beyond IDEs into browser and Slack workflows, making it more accessible across teams and democratizing AI-assisted development beyond traditional developer tools. The Slack integration with '@Cursor' mentions represents a new paradigm for team collaboration with AI coding assistants.",
    tier: 3,
    era: "cursor-era",
    daysSincePrevious: 116,
  },
  {
    id: "claude-code-beta",
    date: "February 24, 2025",
    title: "Anthropic Releases Claude 3.7 Sonnet and Claude Code",
    description:
      "Anthropic introduces Claude Code, a CLI tool with preview IDE support, pushing vibe coding into more agentic workflows where developers can delegate entire tasks to AI from the terminal. This marks the beginning of Claude's foray into terminal-based AI coding assistance.",
    references: [
      {
        title: "Claude 3.7 Sonnet and Claude Code",
        link: "https://www.anthropic.com/news/claude-3-7-sonnet",
      },
    ],
    significance:
      "This pushed vibe coding into more agentic workflows where developers could 'delegate' tasks to AI from the terminal, not just autocomplete. It represented a shift from reactive to proactive AI assistance and marked Anthropic's entry into the terminal-based AI coding space.",
    tier: 2,
    era: "terminal-era",
    daysSincePrevious: 238,
  },
  {
    id: "openai-codex-cli-2025",
    date: "April 16, 2025",
    title: "OpenAI Launches Codex CLI",
    description:
      "OpenAI launches Codex CLI, a lightweight, open source coding agent that runs locally in the terminal. This is a completely different product from their 2021 Codex model - it's designed to link OpenAI's models (including o3 and o4-mini) with local code and computing tasks, allowing models to write and edit code on desktop and take actions like moving files.",
    references: [
      {
        title:
          "OpenAI debuts Codex CLI, an open source coding tool for terminals",
        link: "https://techcrunch.com/2025/04/16/openai-debuts-codex-cli-an-open-source-coding-tool-for-terminals/",
      },
    ],
    significance:
      "This marked OpenAI's foray into competing with Claude Code and other terminal-based AI coding tools.",
    tier: 2,
    era: "terminal-era",
    daysSincePrevious: 51,
  },
  {
    id: "openai-codex-agent-2025",
    date: "May 16, 2025",
    title: "OpenAI Launches New Codex Agent (2025)",
    description:
      "OpenAI announces a research preview of a third distinct tool also named Codex (separate from both the 2021 Codex model and the April 2025 Codex CLI), based on a fine-tuned version of o3. It's a software agent that performs tasks including writing features, answering codebase questions, running tests, and proposing PRs for review.",
    references: [
      {
        title: "Introducing Codex",
        link: "https://openai.com/index/introducing-codex/",
      },
    ],
    significance:
      "This represented a significant evolution in AI coding tools, moving beyond simple code completion to full software development workflows including testing and PR management. The third distinct 'Codex' product from OpenAI demonstrates the company's continued investment in AI-assisted development, though the naming convention has become somewhat confusing with three different products sharing the same name.",
    tier: 2,
    era: "terminal-era",
    daysSincePrevious: 30,
  },
  {
    id: "claude-code-ga",
    date: "May 22, 2025",
    title: "Claude Code Reaches General Availability",
    description:
      "Claude Code launches with full IDE integrations for VS Code and JetBrains, plus CI/CD support, expanding vibe coding from prototype territory into structured team workflows and enterprise environments. This coincides with the release of Claude 4 models, including Opus 4 (the world's best coding model) and Sonnet 4, which power the enhanced Claude Code experience.",
    references: [
      {
        title: "Introducing Claude 4",
        link: "https://www.anthropic.com/news/claude-4",
      },
    ],
    significance:
      "This expanded vibe coding from prototype territory into structured team workflows, making AI-assisted development accessible to larger development teams and enterprise environments. The simultaneous release of Claude 4 models, particularly Opus 4's 72.5% performance on SWE-bench, represents a significant leap in AI coding capabilities.",
    tier: 2,
    era: "terminal-era",
    daysSincePrevious: 6,
  },
  {
    id: "gemini-cli-launch",
    date: "June 25, 2025",
    title: "Google Launches Gemini CLI",
    description:
      "Google introduces Gemini CLI, an open-source AI agent that brings Gemini 2.5 Pro directly into developers' terminals. The tool offers unmatched free usage limits with 60 model requests per minute and 1,000 requests per day at no charge, along with a massive 1 million token context window. It includes built-in tools for Google Search integration, MCP support, and seamless integration with Gemini Code Assist in VS Code.",
    references: [
      {
        title: "Gemini CLI: your open-source AI agent",
        link: "https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/",
      },
    ],
    significance:
      "This represents Google's major entry into the terminal-based AI coding space, offering the industry's largest free usage allowance and bringing enterprise-grade AI capabilities directly to individual developers' command lines. The open-source nature and integration with existing Google AI tools creates a comprehensive ecosystem for AI-assisted development.",
    tier: 1,
    era: "terminal-era",
    daysSincePrevious: 34,
  },
];

const TimelineEvent = ({
  date,
  title,
  description,
  references,
  significance,
  tier = 2,
  id,
  daysSincePrevious,
}: {
  date: string;
  title: string;
  description: React.ReactNode;
  references?: Array<{ title: string; link: string }>;
  significance: React.ReactNode;
  tier?: 1 | 2 | 3;
  id: string;
  daysSincePrevious?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const tierStyles = {
    1: {
      container: "mb-20",
      title: "text-3xl",
      //   indent: "ml-0",
    },
    2: {
      container: "mb-12",
      title: "text-2xl",
      //   indent: "ml-4",
    },
    3: {
      container: "mb-8",
      title: "text-xl",
      //   indent: "ml-8",
    },
  };

  const styles = tierStyles[tier];

  return (
    <div
      id={id}
      data-event-id={id}
      className={`relative ${styles.container} scroll-mt-24`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className={`w-3 h-3 bg-white rounded-full`} />
        </div>
        <div className={`flex-1 min-w-0`}>
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-white/60 text-xs font-mono uppercase tracking-tight whitespace-nowrap">
                {date}
                {isHovered &&
                  daysSincePrevious !== undefined &&
                  daysSincePrevious > 0 && (
                    <span className="text-white/40 ml-2">
                      ({daysSincePrevious} days since previous event)
                    </span>
                  )}
              </span>
            </div>
            <h3 className={`font-light ${styles.title} text-white text-pretty`}>
              {title}
            </h3>
          </div>
          <div className="text-[18px] leading-[1.6] text-white/60 font-light mb-4">
            {description}
          </div>

          <div className="text-[18px] leading-[1.6] text-white/60 font-light">
            {significance}
          </div>

          {references && references.length > 0 && (
            <div className="mt-8 pb-3 border-b border-white/20">
              <div className="flex flex-row justify-end flex-wrap gap-x-2 gap-y-0.5">
                {references.map((ref, index) => (
                  <a
                    key={index}
                    href={ref.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="active:scale-[.99] transition-all duration-100 bg-white/20 px-2 py-1 rounded-md block text-white/60 text-sm hover:text-white no-underline"
                  >
                    <span className="opacity-50">0{index + 1}.</span>{" "}
                    {ref.title}{" "}
                    <span className="opacity-75 inline-block -rotate-45">
                      &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EraSection = ({
  title,
  subtitle,
  description,
  children,
  id,
}: {
  title: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
  id: string;
}) => (
  <section id={id} className="mb-20 scroll-mt-24">
    <div className="mb-12">
      <h2 className="text-[32px] lg:text-[48px] mb-4 font-light leading-[1.1] tracking-[-0.02em] text-white">
        {title}
      </h2>
      <p className="text-[20px] lg:text-[24px] leading-[1.4] text-white font-light mb-6">
        {subtitle}
      </p>
      <p className="text-[20px] leading-[1.6] text-white/80 font-light max-w-3xl">
        {description}
      </p>
    </div>
    <div className="relative">
      <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/10 via-white/90 to-white/10" />
      {children}
    </div>
  </section>
);

// New Timeline View Components
const TimelineView = () => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  // Calculate total days from start to end
  const startDate = new Date("2021-06-01");
  const endDate = new Date("2025-07-01");
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Convert dates to days from start
  const parseDate = (dateStr: string) => {
    if (dateStr.includes(" - ")) {
      const [start] = dateStr.split(" - ");
      return new Date(start + " 1, 2021");
    }
    return new Date(dateStr);
  };

  const getEraColor = (era: string) => {
    switch (era) {
      case "copilot-era":
        return "bg-blue-500";
      case "cursor-era":
        return "bg-purple-500";
      case "terminal-era":
        return "bg-green-500";
      default:
        return "bg-white";
    }
  };

  const getEraLabel = (era: string) => {
    switch (era) {
      case "copilot-era":
        return "The Copilot Era";
      case "cursor-era":
        return "The Cursor Era";
      case "terminal-era":
        return "The Terminal Era";
      default:
        return "Unknown Era";
    }
  };

  // Calculate positions for each event
  const eventsWithPositions = timelineData.map((event) => {
    const eventDate = parseDate(event.date);
    const daysFromStart = Math.ceil(
      (eventDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const position = (daysFromStart / totalDays) * 100;
    return { ...event, position, daysFromStart };
  });

  return (
    <div className="relative">
      {/* Scrollable Timeline Container */}
      <div className="relative overflow-x-auto">
        <div
          className="relative h-32 min-w-max"
          style={{ width: `${totalDays * 2}px` }}
        >
          {/* Timeline Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/60 to-white/20" />

          {/* Timeline Events */}
          {eventsWithPositions.map((event) => (
            <div
              key={event.id}
              className="absolute top-0 bottom-0 flex flex-col items-center group"
              style={{ left: `${event.position}%` }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Event Dot */}
              <div className="relative z-10 mt-12">
                <div
                  className={`w-3 h-3 rounded-full ${getEraColor(
                    event.era
                  )} border-2 border-black shadow-lg transition-all duration-300 ${
                    hoveredEvent === event.id ? "scale-150" : "scale-100"
                  }`}
                />
                {hoveredEvent === event.id && (
                  <div
                    className={`absolute inset-0 w-3 h-3 rounded-full ${getEraColor(
                      event.era
                    )} animate-ping`}
                  />
                )}
              </div>

              {/* Event Label */}
              <div className="mt-2 text-center">
                <div className="text-xs text-white/60 font-mono">
                  {event.date.split(" ")[0]} {event.date.split(" ")[1]}
                </div>
                <div className="text-xs text-white/80 font-light max-w-24 leading-tight">
                  {event.title.length > 20
                    ? event.title.substring(0, 20) + "..."
                    : event.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Details Tooltip */}
      {hoveredEvent && (
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-xl max-w-md">
            {(() => {
              const event = timelineData.find((e) => e.id === hoveredEvent);
              if (!event) return null;

              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-black/60 text-sm font-mono uppercase tracking-tight">
                      {event.date}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-black ${getEraColor(
                        event.era
                      )}`}
                    >
                      {getEraLabel(event.era)}
                    </span>
                    {event.tier === 1 && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-600 border border-yellow-500/30">
                        Major Event
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-light text-black mb-4 leading-tight">
                    {event.title}
                  </h3>

                  <p className="text-black/80 font-light mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="bg-black/5 rounded-md p-4 mb-4 border-l-2 border-black/20">
                    <p className="text-sm text-black/70 font-light leading-relaxed">
                      <span className="font-medium text-black/90">
                        Significance:
                      </span>{" "}
                      {event.significance}
                    </p>
                  </div>

                  {event.references && event.references.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.references.map((ref, refIndex) => (
                        <a
                          key={refIndex}
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 bg-black/10 hover:bg-black/20 rounded-md text-black/70 hover:text-black text-sm transition-all duration-200 pointer-events-auto"
                        >
                          <span className="text-xs opacity-50">
                            0{refIndex + 1}.
                          </span>
                          {ref.title}
                          <span className="text-xs opacity-75">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Era Legend */}
      <div className="mt-8 flex justify-center gap-8 text-sm text-white/60">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getEraColor("copilot-era")}`}
          ></div>
          <span>The Copilot Era (2021-2023)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getEraColor("cursor-era")}`}
          ></div>
          <span>The Cursor Era (2024-2025)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getEraColor("terminal-era")}`}
          ></div>
          <span>The Terminal Era (2025)</span>
        </div>
      </div>
    </div>
  );
};

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("copilot-era");
  const [activeEvent, setActiveEvent] = useState("copilot-beta");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["copilot-era", "cursor-era", "terminal-era"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);

            // Find the event within this section that's most visible
            const eventElements = element.querySelectorAll("[data-event-id]");
            let mostVisibleEvent = null;
            let bestVisibility = 0;

            eventElements.forEach((eventEl) => {
              const eventRect = eventEl.getBoundingClientRect();
              const visibility =
                Math.min(
                  Math.min(window.innerHeight, eventRect.bottom) -
                    Math.max(0, eventRect.top),
                  eventRect.height
                ) / eventRect.height;

              if (visibility > bestVisibility) {
                bestVisibility = visibility;
                mostVisibleEvent = eventEl.getAttribute("data-event-id");
              }
            });

            if (mostVisibleEvent) {
              setActiveEvent(mostVisibleEvent);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocItems = [
    { id: "copilot-era", label: "The Copilot Era", era: "2021-2023" },
    { id: "cursor-era", label: "The Cursor Era", era: "2024-2025" },
    { id: "terminal-era", label: "The Terminal Era", era: "2025" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Minimap data
  const getEraColor = (era: string) => {
    switch (era) {
      case "copilot-era":
        return "bg-blue-500";
      case "cursor-era":
        return "bg-purple-500";
      case "terminal-era":
        return "bg-green-500";
      default:
        return "bg-white";
    }
  };

  const startDate = new Date("2021-06-01");
  const endDate = new Date("2025-07-01");
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const parseDate = (dateStr: string) => {
    if (dateStr.includes(" - ")) {
      const [start] = dateStr.split(" - ");
      return new Date(start + " 1, 2021");
    }
    return new Date(dateStr);
  };

  const minimapEvents = timelineData.map((event) => {
    const eventDate = parseDate(event.date);
    const daysFromStart = Math.ceil(
      (eventDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const position = (daysFromStart / totalDays) * 100;
    return { ...event, position };
  });

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-sm border-r border-white/10 z-50 overflow-y-auto scrollbar-hide">
      <div className="px-4 py-8 h-full flex flex-col">
        {/* Timeline Minimap */}
        <div className="mb-2">
          {/* <h3 className="text-lg font-light text-white mb-4">
            Timeline Overview
          </h3> */}
          <div className="relative h-24 bg-black/20 rounded-lg mx-3">
            {/* Minimap Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-white/20 via-white/60 to-white/20" />

            {/* Era demarcation lines on timeline */}
            <div className="absolute top-8 left-0 right-0 h-0.5">
              {/* Copilot Era starts June 2021 */}
              <div
                className="w-px h-[5px] bg-white/60 absolute top-0"
                style={{ left: "0%" }}
              ></div>
              {/* Cursor Era starts August 2024 */}
              <div
                className="w-px h-[5px] bg-white/60 absolute top-0"
                style={{
                  left: `${
                    (Math.ceil(
                      (new Date("2024-08-01").getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) /
                      totalDays) *
                    100
                  }%`,
                }}
              ></div>
              {/* Terminal Era starts February 2025 */}
              <div
                className="w-px h-[5px] bg-white/60 absolute top-0"
                style={{
                  left: `${
                    (Math.ceil(
                      (new Date("2025-02-01").getTime() - startDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) /
                      totalDays) *
                    100
                  }%`,
                }}
              ></div>
            </div>

            {/* Minimap Events */}
            {minimapEvents.map((event) => {
              const isActiveEvent = event.id === activeEvent;
              return (
                <div
                  key={event.id}
                  className="absolute top-6 cursor-pointer"
                  style={{ left: `${4 + (event.position / 100) * 92}%` }}
                  onClick={() => {
                    // Scroll to the specific event
                    const eventElement = document.getElementById(event.id);
                    if (eventElement) {
                      eventElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-white/20 border transition-all duration-300 ${
                      isActiveEvent
                        ? "border-white scale-125 shadow-lg shadow-white/50"
                        : "border-white/30 hover:border-white/60 hover:scale-110"
                    }`}
                    title={`${event.date}: ${event.title}`}
                  />
                </div>
              );
            })}

            {/* Year markers */}
            <div className="absolute top-12 left-4 right-4 flex justify-between text-xs text-white/40 font-mono">
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
              <span>2024</span>
              <span>2025</span>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="flex-1">
          {/* <h3 className="text-lg font-light text-white mb-6">
            Table of Contents
          </h3> */}
          <nav className="space-y-2">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-1 border-l-2 transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-white border-white"
                    : "text-white/60 hover:text-white/80 border-transparent"
                }`}
              >
                <div className="font-light text-sm">{item.label}</div>
                {item.era && (
                  <div className="text-xs text-white/40 font-mono uppercase mt-1">
                    {item.era}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function VibeCodingHistory() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TableOfContents />

      <div className="relative">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 py-16 relative">
          {/* Top scrim gradient */}
          <div className="fixed top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
          {/* Bottom scrim gradient */}
          <div className="fixed bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
          {/* Introduction */}
          <section id="introduction" className="mb-20 scroll-mt-24">
            <div className="mb-12">
              <h1 className="text-[36px] lg:text-[72px] mb-6 font-light leading-[1.1] tracking-[-0.02em] text-wrap-balance">
                The History of Vibe Coding, So Far
              </h1>
              <p className="text-[16px] leading-[1.4] text-white/50 mb-8 font-mono uppercase tracking-tight">
                Last updated: September 2025
              </p>
            </div>

            <div className="space-y-6">
              {/* <p className="text-[20px] leading-[1.6] text-white/80 font-light">
                In just four years, the way we write code has undergone a
                fundamental transformation. What began as an experimental tool
                for code completion has evolved into a cultural phenomenon
                that's reshaping software development itself.
              </p> */}
              <p className="text-[20px] leading-[1.6] text-white/80 font-light">
                "Vibe coding" — the term coined by Andrej Karpathy in February
                2025 — describes a new approach to programming where developers
                work in close collaboration with AI, iterating through code with
                an intuitive, almost conversational flow.
              </p>
              <p className="text-[20px] leading-[1.6] text-white/80 font-light">
                But vibe coding has changed tremendously in the past few years.
                It's capabilities have grown as new models have released, it's
                meaning has evolved, and it's applications have expanded. This
                is my best effort at documenting the history of AI-assisted
                programming, so far.
              </p>
            </div>
          </section>

          {/* The Copilot Era */}
          <EraSection
            id="copilot-era"
            title="The Copilot Era"
            subtitle="2021-2023: The Foundation Years"
            description="AI tools for code assistance were around as early as 2021, but they didn't reach mainstream adoption until 2023. GitHub Copilot's launch in 2021 marked the beginning of AI code generation, but it took around two years for the technology and underlying models to mature enough for mainstream adoption."
          >
            <TimelineEvent
              id="copilot-beta"
              date="June 29, 2021"
              title="GitHub Announces Copilot for Technical Preview"
              description="GitHub announces GitHub Copilot for technical preview in Visual Studio Code, marking the first mainstream tool to generate code from natural language prompts. Built on OpenAI's Codex model, it represents a paradigm shift from traditional autocomplete to AI-driven code generation."
              references={[
                {
                  title: "Introducing GitHub Copilot: AI pair programmer",
                  link: "https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/",
                },
                {
                  title: "GitHub Copilot Technical Preview",
                  link: "https://github.com/features/copilot",
                },
              ]}
              significance="This was the first mainstream tool to allow code generation from natural language cues, sparking early experiments with AI-driven coding and establishing the foundation for what would eventually become vibe coding. It also marked the evolution of Microsoft's earlier research into practical, widely-available AI coding assistance."
              tier={1}
              daysSincePrevious={0}
            />

            <TimelineEvent
              id="openai-codex-2021"
              date="August 10, 2021"
              title="OpenAI Releases Codex (2021)"
              description="OpenAI announces Codex, a code autocompletion tool available in select IDEs like Visual Studio Code and Neovim. It was a modified, production version of GPT-3, fine-tuned on gigabytes of source code in a dozen programming languages. This was the original model powering GitHub Copilot."
              references={[
                {
                  title: "OpenAI Codex",
                  link: "https://openai.com/index/openai-codex/",
                },
              ]}
              significance="This marked the first major AI model specifically designed for code generation, establishing the technical foundation that would power GitHub Copilot and influence all subsequent AI coding tools."
              tier={2}
              daysSincePrevious={42}
            />

            <TimelineEvent
              id="copilot-expansion"
              date="October 2021 - March 2022"
              title="Copilot Expands to Multiple IDEs"
              description="GitHub rapidly expands Copilot's availability across development environments. The JetBrains plugin launches on October 29, 2021, followed by the Neovim plugin on October 27, 2021, and Visual Studio 2022 support on March 29, 2022. This multi-platform approach demonstrates the tool's potential to work across different coding environments and developer preferences."
              references={[
                {
                  title: "GitHub Copilot available for JetBrains and Neovim",
                  link: "https://news.ycombinator.com/item?id=29016506",
                },
              ]}
              significance="This expansion showed that AI coding assistance could work across diverse development environments, not just a single IDE, making it accessible to developers regardless of their preferred tools and workflows."
              tier={3}
              daysSincePrevious={80}
            />

            <TimelineEvent
              id="copilot-general-availability"
              date="June 21, 2022"
              title="Copilot Exits Technical Preview"
              description="GitHub announces that Copilot is out of technical preview and becomes available as a subscription-based service for individual developers. This marks the transition from experimental tool to commercial product, signaling the market's readiness for AI-assisted coding tools."
              references={[
                {
                  title:
                    "Copilot, GitHub's AI-powered programming assistant, is now generally available",
                  link: "https://techcrunch.com/2022/06/21/copilot-githubs-ai-powered-programming-assistant-is-now-generally-available/",
                },
              ]}
              significance="This marked the transition from experimental tool to commercial product, signaling that the market was ready for AI-assisted coding tools and establishing the business model that would support the development of more advanced AI coding assistants."
              tier={2}
              daysSincePrevious={84}
            />

            {/* <TimelineEvent
              id="early-llm-tools"
              date="2021–2022"
              title="Early LLM Coding Tools and Practices Emerge"
              description="The foundation years where developers began experimenting with AI coding assistants. Early tools focused on autocomplete, debugging help, and prompt engineering practices that would later become central to vibe coding workflows."
              significance="These were the foundation years where autocomplete, debugging help, and prompt engineering practices laid the groundwork for vibe coding. Developers began learning to work with AI as a coding partner rather than just a tool."
            /> */}

            <TimelineEvent
              id="chatgpt-gpt35"
              date="November 30, 2022"
              title="ChatGPT and GPT-3.5 Launch"
              description="OpenAI releases ChatGPT as a free research preview, powered by GPT-3.5. While AI coding tools like Copilot existed since 2021, ChatGPT's conversational interface and free access brought AI capabilities to mainstream attention. The model could engage in natural language conversations and assist with coding tasks, though it wasn't specifically optimized for code generation."
              references={[
                {
                  title: "Introducing ChatGPT",
                  link: "https://openai.com/index/chatgpt/",
                },
              ]}
              significance="This marked the first time AI language models became widely accessible to the general public, not just developers. While not specifically designed for coding, ChatGPT's success demonstrated the potential for AI to assist with complex tasks and paved the way for more specialized coding tools."
              tier={1}
              daysSincePrevious={162}
            />

            <TimelineEvent
              id="ai-coding-mainstream-adoption"
              date="March 14, 2023"
              title="AI Coding Tools Reach Mainstream Adoption Due to New Model Performance"
              description="OpenAI releases GPT-4, a multimodal model that exhibits 'human-level performance' on professional benchmarks, with improved reasoning capabilities and a longer context window (32,768 tokens). While AI coding tools like Copilot existed since 2021, they reached mainstream adoption in early 2023 due to these powerful new models. The combination of GPT-3.5's conversational interface and GPT-4's improved capabilities led developers to realize that AI could generate larger, more complex code blocks, not just simple snippets."
              references={[
                {
                  title:
                    "OpenAI's GPT-4 exhibits 'human-level performance' on professional benchmarks",
                  link: "https://arstechnica.com/information-technology/2023/03/openai-announces-gpt-4-its-next-generation-ai-language-model/",
                },
                {
                  title: "GPT-4 Technical Report",
                  link: "https://cdn.openai.com/papers/gpt-4.pdf",
                },
              ]}
              significance="This marked a turning point in AI capabilities, demonstrating that language models could perform at human levels on complex reasoning tasks. The breakthrough made AI coding assistance much more practical and reliable, accelerating adoption beyond early adopters to mainstream developers. This period marked the transition from experimental tools used by early adopters to mainstream adoption by regular developers, though concerns about code reliability and security also emerged."
              tier={1}
              daysSincePrevious={104}
            />

            <TimelineEvent
              id="supermaven-launch"
              date="July 2, 2024"
              title="Supermaven Launches as Copilot Competitor"
              description="Supermaven launches as a direct competitor to GitHub Copilot, offering AI-powered code completion with a focus on context awareness and low latency. The tool positions itself as an alternative to Copilot with different pricing and integration approaches."
              references={[
                {
                  title: "Announcing Supermaven 1.0",
                  link: "https://supermaven.com/blog/announcing-supermaven-1.0",
                },
              ]}
              significance="This marked the beginning of a competitive landscape in AI coding assistants, showing that the market was large enough to support multiple players beyond just GitHub Copilot. Supermaven's focus on context awareness and low latency demonstrated the importance of technical differentiation in the AI coding space."
              tier={3}
              daysSincePrevious={51}
            />
          </EraSection>

          {/* The Cursor Era */}
          <EraSection
            id="cursor-era"
            title="The Cursor Era"
            subtitle="2024-2025: The IDE Revolution"
            description="Cursor's introduction marked a fundamental shift in how AI integrates with development workflows. This era saw AI move from being a helpful assistant to becoming deeply embedded in the coding process itself, leading to the coining of 'vibe coding' as a cultural phenomenon."
          >
            <TimelineEvent
              id="cursor-series-a"
              date="August 22, 2024"
              title="Cursor Raises $60M Series A and Announces 40,000 Customers"
              description="Anysphere announces a $60 million Series A funding round led by Andreessen Horowitz and Thrive Capital, with participation from OpenAI, Jeff Dean, Noam Brown, and founders of Stripe, GitHub, Ramp, and Perplexity. The company reveals it has grown to over 40,000 customers, including innovative startups, research labs, and enterprises, and has built SOTA next-edit-prediction models and multi-billion-file retrieval systems."
              references={[
                {
                  title: "Series A and Magic",
                  link: "https://cursor.com/blog/series-a",
                },
              ]}
              significance="This funding round validated Cursor's position as a leading AI coding tool and provided the resources needed for rapid expansion. The impressive customer growth to 40,000 users demonstrated strong market demand for AI-assisted coding, while the high-profile investor backing signaled confidence in the company's vision of 'building a magical tool that will one day write all the world's software.'"
              tier={2}
              daysSincePrevious={51}
            />

            <TimelineEvent
              id="cursor-acquires-supermaven"
              date="November 12, 2024"
              title="Cursor Acquires Supermaven"
              description="Anysphere, the company behind Cursor, acquires AI coding assistant Supermaven for an undisclosed sum. The acquisition enables Cursor to launch a new version of its Tab AI model that's 'fast, context-aware, and highly intelligent,' especially at sequences of long code. Supermaven's Babble model, with its 1 million token context window and low-latency architecture, will be integrated into Cursor's technology stack."
              references={[
                {
                  title: "Anysphere acquires Supermaven to beef up Cursor",
                  link: "https://techcrunch.com/2024/11/12/anysphere-acquires-supermaven-to-beef-up-cursor/",
                },
              ]}
              significance="This acquisition marked the consolidation of AI coding tools, with Cursor absorbing Supermaven's technology to enhance its own capabilities. It demonstrated the competitive nature of the AI coding assistant market and showed how established players were acquiring innovative competitors to strengthen their position."
              tier={2}
              daysSincePrevious={82}
            />

            <TimelineEvent
              id="windsurf-launch"
              date="November 13, 2024"
              title="Windsurf Launches with AI Flows"
              description="Windsurf (formerly Codeium) launches the Windsurf Editor, introducing the concept of 'AI flows' that combine the collaborative nature of copilots with the independent capabilities of agents. The editor features Cascade, a conversational AI that understands human actions in real-time, and Supercomplete, which predicts next intent rather than just next text."
              references={[
                {
                  title: "Windsurf Launch",
                  link: "https://windsurf.com/blog/windsurf-launch",
                },
              ]}
              significance="Windsurf was the first major competitor to Cursor, offering a similar product with minor differences in pricing and integration approaches."
              tier={1}
              daysSincePrevious={1}
            />

            <TimelineEvent
              id="cursor-fusion"
              date="January 13, 2025"
              title="Cursor Releases Upgraded Fusion Tab-Model"
              description="Cursor announces Fusion, their next generation Tab model that produces nearly instant, much higher quality cursor jumps while improving edit quality. The model accurately predicts over 25% more difficult edits per line and suggests over 10x longer stretches of changes compared to their March 2024 original model, with 260ms latency and 13,000 token context length."
              references={[
                {
                  title: "A new Tab model",
                  link: "https://cursor.com/blog/tab-update",
                },
              ]}
              significance="This demonstrated that AI could embed deeply into IDE workflows, predicting edits and guiding code in a way that aligned with 'vibe' iteration. The Fusion model's ability to suggest both edits and cursor jumps represents a significant advancement in making AI coding assistance feel more natural and intuitive."
              tier={1}
              daysSincePrevious={62}
            />

            <TimelineEvent
              id="karpathy-coins-term"
              date="February 2, 2025"
              title="Andrej Karpathy Coins 'Vibe Coding'"
              description="The former Tesla AI director and OpenAI researcher gives the practice its cultural identity, moving it from a niche developer habit to a named paradigm. This moment marks the shift from underground practice to recognized methodology."
              references={[
                {
                  title: "Andrej Karpathy Tweet",
                  link: "https://x.com/karpathy/status/1886192184808149383?lang=en",
                },
              ]}
              significance="This gave the practice a cultural identity and marked the shift from niche habit to named paradigm. It provided a framework for understanding and discussing AI-assisted development."
              tier={1}
              daysSincePrevious={20}
            />

            <TimelineEvent
              id="yc-w25-report"
              date="March 6, 2025"
              title="Y Combinator W25 Reports 25% AI Code Usage"
              description="Y Combinator's W25 batch reveals that approximately 25% of startups are relying on AI for more than 95% of their code generation, demonstrating that vibe coding has moved from experimental to production-ready. YC managing partner Jared Friedman noted that these were all highly technical founders who would have built products from scratch a year ago, but now rely almost entirely on AI."
              references={[
                {
                  title:
                    "A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated",
                  link: "https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/",
                },
              ]}
              significance="This showed vibe coding moving into real startup production work, proving that the practice was viable for commercial software development, not just personal projects. The fact that highly technical founders are choosing AI over traditional coding represents a fundamental shift in how software is built."
              tier={2}
              daysSincePrevious={32}
            />

            <TimelineEvent
              id="cursor-web-app"
              date="June 30, 2025"
              title="Cursor Launches Web App for AI Coding Agents"
              description="Cursor extends vibe coding beyond traditional IDEs into browser and Slack workflows, making AI-assisted development more accessible across teams and breaking down barriers between coding and collaboration tools. The web platform allows users to run tasks while away, access from any device, collaborate seamlessly with team members, and work with rich context including images and parallel agent execution."
              references={[
                {
                  title: "Cursor on web and mobile",
                  link: "https://cursor.com/blog/agent-web",
                },
              ]}
              significance="This extended vibe coding beyond IDEs into browser and Slack workflows, making it more accessible across teams and democratizing AI-assisted development beyond traditional developer tools. The Slack integration with '@Cursor' mentions represents a new paradigm for team collaboration with AI coding assistants."
              tier={3}
              daysSincePrevious={116}
            />
          </EraSection>

          {/* The Claude Code Era */}
          <EraSection
            id="terminal-era"
            title="The Terminal Era"
            subtitle="2025: The Terminal Future"
            description="The introduction of Terminal-based AI coding tools, like Claude Code and OpenAI Codex CLI, marked a new phase where AI could take on more autonomous roles in development. This era represents the maturation of vibe coding from a practice to a legitimate field of study, complete with its own challenges and opportunities."
          >
            <TimelineEvent
              id="claude-code-beta"
              date="February 24, 2025"
              title="Anthropic Releases Claude 3.7 Sonnet and Claude Code"
              description="Anthropic introduces Claude Code, a CLI tool with preview IDE support, pushing vibe coding into more agentic workflows where developers can delegate entire tasks to AI from the terminal. This marks the beginning of Claude's foray into terminal-based AI coding assistance."
              references={[
                {
                  title: "Claude 3.7 Sonnet and Claude Code",
                  link: "https://www.anthropic.com/news/claude-3-7-sonnet",
                },
              ]}
              significance="This pushed vibe coding into more agentic workflows where developers could 'delegate' tasks to AI from the terminal, not just autocomplete. It represented a shift from reactive to proactive AI assistance and marked Anthropic's entry into the terminal-based AI coding space."
              tier={2}
              daysSincePrevious={238}
            />

            <TimelineEvent
              id="openai-codex-cli-2025"
              date="April 16, 2025"
              title="OpenAI Launches Codex CLI"
              description="OpenAI launches Codex CLI, a lightweight, open source coding agent that runs locally in the terminal. This is a completely different product from their 2021 Codex model - it's designed to link OpenAI's models (including o3 and o4-mini) with local code and computing tasks, allowing models to write and edit code on desktop and take actions like moving files."
              references={[
                {
                  title:
                    "OpenAI debuts Codex CLI, an open source coding tool for terminals",
                  link: "https://techcrunch.com/2025/04/16/openai-debuts-codex-cli-an-open-source-coding-tool-for-terminals/",
                },
              ]}
              significance="This marked OpenAI's foray into competing with Claude Code and other terminal-based AI coding tools."
              tier={2}
              daysSincePrevious={51}
            />

            <TimelineEvent
              id="openai-codex-agent-2025"
              date="May 16, 2025"
              title="OpenAI Launches New Codex Agent (2025)"
              description="OpenAI announces a research preview of a third distinct tool also named Codex (separate from both the 2021 Codex model and the April 2025 Codex CLI), based on a fine-tuned version of o3. It's a software agent that performs tasks including writing features, answering codebase questions, running tests, and proposing PRs for review."
              references={[
                {
                  title: "Introducing Codex",
                  link: "https://openai.com/index/introducing-codex/",
                },
              ]}
              significance="This represented a significant evolution in AI coding tools, moving beyond simple code completion to full software development workflows including testing and PR management. The third distinct 'Codex' product from OpenAI demonstrates the company's continued investment in AI-assisted development, though the naming convention has become somewhat confusing with three different products sharing the same name."
              tier={2}
              daysSincePrevious={30}
            />

            <TimelineEvent
              id="claude-code-ga"
              date="May 22, 2025"
              title="Claude Code Reaches General Availability"
              description="Claude Code launches with full IDE integrations for VS Code and JetBrains, plus CI/CD support, expanding vibe coding from prototype territory into structured team workflows and enterprise environments. This coincides with the release of Claude 4 models, including Opus 4 (the world's best coding model) and Sonnet 4, which power the enhanced Claude Code experience."
              references={[
                {
                  title: "Introducing Claude 4",
                  link: "https://www.anthropic.com/news/claude-4",
                },
              ]}
              significance="This expanded vibe coding from prototype territory into structured team workflows, making AI-assisted development accessible to larger development teams and enterprise environments. The simultaneous release of Claude 4 models, particularly Opus 4's 72.5% performance on SWE-bench, represents a significant leap in AI coding capabilities."
              tier={2}
              daysSincePrevious={6}
            />

            <TimelineEvent
              id="gemini-cli-launch"
              date="June 25, 2025"
              title="Google Launches Gemini CLI"
              description="Google introduces Gemini CLI, an open-source AI agent that brings Gemini 2.5 Pro directly into developers' terminals. The tool offers unmatched free usage limits with 60 model requests per minute and 1,000 requests per day at no charge, along with a massive 1 million token context window. It includes built-in tools for Google Search integration, MCP support, and seamless integration with Gemini Code Assist in VS Code."
              references={[
                {
                  title: "Gemini CLI: your open-source AI agent",
                  link: "https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/",
                },
              ]}
              significance="This represents Google's major entry into the terminal-based AI coding space, offering the industry's largest free usage allowance and bringing enterprise-grade AI capabilities directly to individual developers' command lines. The open-source nature and integration with existing Google AI tools creates a comprehensive ecosystem for AI-assisted development."
              tier={1}
              daysSincePrevious={34}
            />
          </EraSection>

          {/* Conclusion */}
          <section id="conclusion" className="mb-20 scroll-mt-24">
            <div className="border-t border-white/20 pt-12">
              <div className="space-y-6">
                <p className="text-[20px] leading-[1.6] text-white/80 font-light">
                  Thanks for reading! This is one of three parts in my
                  collection of notes on AI-assisted development. It will be
                  updated as I continue to research the topic.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
