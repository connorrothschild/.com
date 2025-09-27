---
title: 'Tips for AI-Assisted Development'
date: 2025-01-27
category: "technical"
showToc: false
showTopImage: false
unlisted: false
synopsisForLlms: "Best practices for working with AI coding tools, including context management, prompting strategies, and debugging techniques."
---

This is a collection of tips for working with AI coding tools. It is by no means comprehensive, just a starting point.

## Before Prompting

* **Use many tools**: For complex ideas, make use of many tools to get started. Run your idea through ChatGPT, Claude, Gemini for concepting/deciding on the approach. Use the visual tools that excel at these one shots (Lovable, v0, Bolt, etc., although mostly v0) in parallel to get a first working version.
* **Choose the right editor**: Once you have found a good base, bring that over to a code editor; Cursor is the best choice.
* **Set up project rules**: In Cursor: make use of rules (AGENTS.md, .cursorrules, etc.) with instructions specific to your project and stack. (If you are just beginning, you might not know what you need in these rules, but you will populate them over time.)

## Managing Context

* **Use Git liberally**: Use Git/version control liberally; before taking on a large feature, use THAT as your major undo button.
* **Stage checkpoints**: Make use of the "accept" and "undo" buttons on Cursor. On a complex task; accept once AI reaches a checkpoint. Use a combination of "accepting" (in Cursor) and committing (in Git) to stage minor checkpoints and major successes.
* **Enable strict rules and feedback**: Use TypeScript and ESLint; make sure AI knows exactly what is expected of it and can iterate based on immediate feedback.

## While Prompting

* **Break down complex tasks**: Do not ask the model to one shot your entire idea (if the idea is complex); provide a high level goal, and then walk it through each step as a separate prompt. See the above point about accepting checkpoints.
* **Avoid leading suggestions**: Do not suggest with too much confidence. (e.g. "Shouldn't we just do..."). AI is not a smart person; it is a tool that chiefly wants to please you. Even while coding, it will—like any other model—be sycophantic and suggest things not because they are right, but because you suggested them first.
* **Pit models against each other**: For very complex implementations, you might position different AI models against one another; get an idea, ask another model to critique or refine it; and loop.

## Debugging & Iteration

* **Log everything**: For debugging: use console logs liberally; either make sure AI has access to your logs, or paste them in so the AI knows exactly what happens behind the scenes.
* **Reset after failures**: If the AI fails after trying three times with new approaches, undo all and reset with a new prompt. There's no real notion of "sunk costs" when considering how quickly AI can produce code.