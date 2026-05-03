import type { CatalogData } from "./types";

export const evalCatalog: CatalogData = {
  id: "eval",
  sections: [
    {
      id: "observability",
      resources: [
        { slug: "langfuse", name: "Langfuse", url: "https://langfuse.com/", blurb: "Open-source LLM tracing, prompt mgmt, evals. Self-hostable." },
        { slug: "helicone", name: "Helicone", url: "https://www.helicone.ai/", blurb: "Drop-in proxy for OpenAI/Anthropic/etc; logs, costs, caching." },
        { slug: "promptlayer", name: "PromptLayer", url: "https://promptlayer.com/", blurb: "Prompt versioning + observability + A/B testing." },
        { slug: "langsmith", name: "LangSmith", url: "https://smith.langchain.com/", blurb: "LangChain's own platform for tracing, datasets, evals, monitoring." },
        { slug: "phoenix", name: "Phoenix (Arize)", url: "https://phoenix.arize.com/", blurb: "Open-source observability for LLM, embedding and agent traces." },
        { slug: "lunary", name: "Lunary", url: "https://lunary.ai/", blurb: "Open-source LLM analytics, prompt mgmt, user-level tracing." },
        { slug: "literal", name: "Literal AI", url: "https://literalai.com/", blurb: "Conversation observability + evals + dataset curation." }
      ]
    },
    {
      id: "evals",
      resources: [
        { slug: "braintrust", name: "Braintrust", url: "https://www.braintrust.dev/", blurb: "End-to-end evals for AI products: prompts, datasets, scorers, regressions." },
        { slug: "openai-evals", name: "OpenAI Evals", url: "https://github.com/openai/evals", blurb: "OpenAI's reference framework for benchmark + scenario evals." },
        { slug: "promptfoo", name: "Promptfoo", url: "https://www.promptfoo.dev/", blurb: "Local-first eval runner; YAML-defined test suites against any provider." },
        { slug: "deepeval", name: "DeepEval", url: "https://docs.confident-ai.com/", blurb: "Pytest-style metrics for hallucination, faithfulness, relevancy." },
        { slug: "ragas", name: "RAGAS", url: "https://docs.ragas.io/", blurb: "Reference framework for RAG-pipeline evaluation metrics." }
      ]
    }
  ]
};
