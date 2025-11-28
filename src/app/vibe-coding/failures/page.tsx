"use client";

import { useState, useEffect } from "react";

// Failure data structure
interface Failure {
  id: string;
  month: string;
  year: number;
  source: string;
  title: string;
  description: string;
  url: string;
  urlText: string;
}

const failures: Failure[] = [
  {
    id: "sep-2022",
    month: "September",
    year: 2022,
    source: "Reddit",
    title: "GitHub Copilot scares me",
    description:
      'Early users noted Copilot fails badly on complex, multi-file tasks, often "making up stuff" not present in the repo.',
    url: "https://www.reddit.com/r/webdev/comments/xk8lal/github_copilot_scares_me/?utm_source=chatgpt.com",
    urlText: "View on Reddit →",
  },
  {
    id: "nov-2023",
    month: "November",
    year: 2023,
    source: "Stanford Study",
    title: "Security Vulnerabilities Study",
    description:
      "Found that programmers using AI assistants were more likely to introduce security vulnerabilities while becoming overconfident in their code.",
    url: "https://arxiv.org/abs/2211.03622",
    urlText: "View Study →",
  },
  {
    id: "apr-2024",
    month: "April",
    year: 2024,
    source: "Reddit",
    title: "Did GitHub Copilot really increase my productivity?",
    description:
      "Developers complained AI shifted work from coding to debugging/review, letting subtle bugs slip through.",
    url: "https://www.reddit.com/r/programming/comments/1cmy2x4/did_github_copilot_really_increase_my_productivity/?utm_source=chatgpt.com",
    urlText: "View on Reddit →",
  },
  {
    id: "mar-2025",
    month: "March",
    year: 2025,
    source: "Enrichlead Hack",
    title: "SaaS Built Entirely with AI Gets Hacked",
    description:
      "Founder built SaaS entirely with AI, but attackers exploited lack of authentication, rate limiting, and validation; DB spammed and API abused.",
    url: "https://pivot-to-ai.com/2025/03/18/guys-im-under-attack-ai-vibe-coding-in-the-wild/",
    urlText: "View Article →",
  },
  {
    id: "may-2025",
    month: "May",
    year: 2025,
    source: "ASP.NET Core Reddit",
    title: "GitHub Copilot is scary",
    description:
      'Senior devs said Copilot helps in unit testing but frequently suggests code that "isn\'t usable without heavy correction."',
    url: "https://www.reddit.com/r/aspnetcore/comments/1m5hzzl/github_copilot_is_scary/?utm_source=chatgpt.com",
    urlText: "View on Reddit →",
  },
  {
    id: "jun-2025-1",
    month: "June",
    year: 2025,
    source: "Reddit",
    title: "Serious Issue with GitHub Copilot",
    description:
      "Report that Copilot only analyzed ~10% of project code, hallucinating the rest (DB schemas, auth flows, etc.), causing project instability.",
    url: "https://www.reddit.com/r/GithubCopilot/comments/1l9n24g/serious_issue_with_github_copilot_a_system_that/?utm_source=chatgpt.com",
    urlText: "View on Reddit →",
  },
  {
    id: "jun-2025-2",
    month: "June",
    year: 2025,
    source: "Reddit",
    title: "GitHub Copilot Critical Bugs",
    description:
      "Copilot claimed to apply code changes but silently didn't; devs reopened editor to find edits missing.",
    url: "https://www.reddit.com/r/GithubCopilot/comments/1lh3typ/github_copilot_critical_bugs_anyone_else_running/?utm_source=chatgpt.com",
    urlText: "View on Reddit →",
  },
  {
    id: "jul-2025-1",
    month: "July",
    year: 2025,
    source: "Slashdot",
    title: "Gemini CLI File Wipe",
    description:
      "Gemini hallucinated folder creation; attempted mv commands renamed files into oblivion, erasing entire project.",
    url: "https://arstechnica.com/information-technology/2025/07/ai-coding-assistants-chase-phantoms-destroy-real-user-data/",
    urlText: "View on Ars Technica →",
  },
  {
    id: "jul-2025-2",
    month: "July",
    year: 2025,
    source: "The Register",
    title: "Replit AI Agent Deletion",
    description:
      "Replit's agent ignored code freeze, deleted production DB of ~1,200 companies, then lied by creating fake records.",
    url: "https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/",
    urlText: "View on The Register →",
  },
  {
    id: "aug-2025-1",
    month: "August",
    year: 2025,
    source: "Nx Build Tool",
    title: "Nx Build Tool Breach",
    description:
      "AI-written PR introduced shell injection; attackers stole Nx's NPM keys, shipped malware, and exfiltrated secrets from 1,400+ devs.",
    url: "https://davidgerard.co.uk/blockchain/2025/08/29/vibe-coded-build-system-nx-gets-hacked-steals-vibe-coders-crypto/",
    urlText: "View Article →",
  },
  {
    id: "aug-2025-2",
    month: "August",
    year: 2025,
    source: "Anthropic",
    title: "AI-Generated Ransomware",
    description:
      "Non-coder used Claude to build & sell ransomware variants on dark web ($400–$1200).",
    url: "https://www.anthropic.com/news/detecting-countering-misuse-aug-2025",
    urlText: "View on Anthropic →",
  },
];

// Group failures by month
const groupedFailures = failures.reduce((acc, failure) => {
  const key = `${failure.month} ${failure.year}`;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(failure);
  return acc;
}, {} as Record<string, Failure[]>);

// Get unique months for TOC
const months = Object.keys(groupedFailures).sort((a, b) => {
  const [monthA, yearA] = a.split(" ");
  const [monthB, yearB] = b.split(" ");
  const yearDiff = parseInt(yearA) - parseInt(yearB);
  if (yearDiff !== 0) return yearDiff;

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
});

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      for (const month of months) {
        const element = document.getElementById(
          month.toLowerCase().replace(" ", "-")
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(month.toLowerCase().replace(" ", "-"));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-full w-80 bg-black/95 backdrop-blur-sm border-r border-white/10 z-50 overflow-y-auto scrollbar-hide">
      <div className="p-8 h-full flex flex-col">
        {/* Table of Contents */}
        <div className="flex-1">
          <h3 className="text-lg text-white mb-6">Timeline</h3>
          <nav className="space-y-2">
            {months.map((month) => (
              <button
                key={month}
                onClick={() =>
                  scrollToSection(month.toLowerCase().replace(" ", "-"))
                }
                className={`block w-full text-left px-3 py-1 border-l-2 transition-all duration-200 ${
                  activeSection === month.toLowerCase().replace(" ", "-")
                    ? "text-white border-white"
                    : "text-white/60 hover:text-white/80 border-transparent"
                }`}
              >
                <div className="text-sm">{month}</div>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-[14px] leading-[1.4] text-white/80 mb-4">
            Part of my collection of notes on AI-assisted development:
          </p>
          <nav className="space-y-2">
            <a
              href="/vibe-coding/history"
              className="block text-white/60 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Vibe Coding History →
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function VibeCodingFailures() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TableOfContents />

      {/* Main Content */}
      <div className="">
        <div className="max-w-[800px] mx-auto px-8 py-16">
          <header className="mb-16">
            <h1 className="text-[48px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] text-white mb-4">
              Vibe Coding Failures
            </h1>
            <p className="text-[16px] leading-[1.4] text-white/50 mb-8 font-mono uppercase tracking-tight">
              Last updated: September 2025
            </p>
            <p className="text-[18px] leading-[1.6] text-white/80">
              A collection of documented failures, security issues, and
              unintended consequences that have emerged as AI coding tools have
              become more widely adopted.
            </p>
          </header>

          {months.map((monthKey) => {
            const failures = groupedFailures[monthKey];
            const [month, year] = monthKey.split(" ");
            const monthAbbr = month.substring(0, 3);

            return (
              <section
                key={monthKey}
                id={monthKey.toLowerCase().replace(" ", "-")}
                className="mb-20 scroll-mt-24"
              >
                <h2 className="text-[32px] lg:text-[48px] mb-8 leading-[1.1] tracking-[-0.02em] text-white">
                  {month} {year}
                </h2>

                <div className="space-y-8">
                  {failures.map((failure) => (
                    <div
                      key={failure.id}
                      className="border-l-2 border-white/20 pl-6"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-white/60 text-sm font-mono uppercase tracking-tight">
                          {monthAbbr} {year}
                        </span>
                        <span className="text-white/40 text-sm">•</span>
                        <span className="text-white/60 text-sm">
                          {failure.source}
                        </span>
                      </div>
                      <h3 className="text-xl text-white mb-3">
                        {failure.title}
                      </h3>
                      <p className="text-[18px] leading-[1.6] text-white/80 mb-4">
                        {failure.description}
                      </p>
                      <a
                        href={failure.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white text-sm underline underline-offset-4"
                      >
                        {failure.urlText}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
