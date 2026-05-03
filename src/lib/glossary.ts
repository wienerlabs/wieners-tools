export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  related?: string[];
  link?: string;
};

export const glossary: GlossaryTerm[] = [
  { slug: "agent", term: "Agent", definition: "An LLM that runs in a loop, picking tools, executing them, reading results, and deciding the next step until it returns a final answer or hits a budget.", related: ["agent-loop", "tool-use"] },
  { slug: "agent-loop", term: "Agent loop", definition: "The runtime that turns model output into tool calls, runs them, feeds results back, and stops when the model returns a non-tool response or the call budget is hit.", related: ["agent", "tool-use", "context-window"] },
  { slug: "agentic-payments", term: "Agentic payments", definition: "Automated, programmatic settlement attached to a request. The agent or app pays per call and the server verifies before responding. Sub-cent fees make per-request billing viable.", link: "https://www.x402.org/" },
  { slug: "batch-inference", term: "Batch inference", definition: "Sending many prompts in one request to amortise tokenisation and network cost. Anthropic and OpenAI both offer cheaper batch endpoints with relaxed latency SLAs." },
  { slug: "bert", term: "BERT", definition: "A 2018 encoder-only transformer from Google. Reads text bidirectionally and outputs embeddings. Largely superseded by decoder-only LLMs but still common as a reranker." },
  { slug: "caching", term: "Caching (prompt cache)", definition: "Marking part of the prompt as reusable so repeated calls within a TTL only pay for the new tokens. Big system prompts benefit the most.", related: ["context-window", "kv-cache"], link: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" },
  { slug: "chain-of-thought", term: "Chain of thought (CoT)", definition: "Asking the model to write its reasoning before its final answer. Boosts accuracy on hard tasks; many frontier models do it implicitly now via 'thinking' modes." },
  { slug: "completion", term: "Completion", definition: "The text the model generates in response to a prompt. Older API name (single-turn); modern APIs use 'message' for multi-turn chat." },
  { slug: "constitutional-ai", term: "Constitutional AI", definition: "Anthropic's training approach where a model critiques and rewrites its own outputs against a written set of principles, instead of relying on human-labelled comparisons." },
  { slug: "context-engineering", term: "Context engineering", definition: "The practice of choosing what goes into the model's context window — system prompt, retrieved docs, tool descriptions, prior turns — to maximise the right answer per token spent.", related: ["context-window", "rag"] },
  { slug: "context-window", term: "Context window", definition: "Maximum number of tokens the model can read in one call. 200k for Claude Sonnet 4.6, 1M+ for Gemini 2.5 Pro. Includes system prompt, history, retrieved docs, and the answer.", related: ["caching", "rag"] },
  { slug: "decoder-only", term: "Decoder-only", definition: "The transformer architecture used by all modern chat LLMs. Generates text left-to-right, one token at a time. Encoder-decoder (T5, BART) is mostly retired for chat." },
  { slug: "diffusion", term: "Diffusion model", definition: "Generative model class that turns random noise into images, audio, or video by iteratively denoising. Powers Stable Diffusion, FLUX, Sora-style video.", related: ["generative"] },
  { slug: "distillation", term: "Distillation", definition: "Training a smaller 'student' model to imitate a larger 'teacher' model's outputs. Cheaper to serve at the cost of some quality. Haiku-class models are often distilled from Sonnet-class." },
  { slug: "edge-runtime", term: "Edge runtime", definition: "JavaScript runtime that runs at CDN PoPs (Vercel Edge, Cloudflare Workers). Cold-start in milliseconds; subset of Node APIs; ideal for low-latency reads worldwide.", related: ["serverless"] },
  { slug: "embedding", term: "Embedding", definition: "A fixed-size vector that encodes the meaning of a piece of text or image. Cosine distance between embeddings measures semantic similarity. The basis of search, RAG, recommendations.", related: ["semantic-search", "vector-db", "rag"] },
  { slug: "eval", term: "Eval", definition: "Automated test that scores a model or prompt on a fixed set of inputs. Catches regressions when you tweak the prompt, swap models, or update the system prompt.", related: ["evaluation"] },
  { slug: "evaluation", term: "Evaluation", definition: "Broader process of measuring AI quality: accuracy, helpfulness, harmlessness, latency, cost. Uses both deterministic checks and LLM-as-judge scorers." },
  { slug: "fine-tuning", term: "Fine-tuning", definition: "Continuing to train a base model on your own labelled data to bias it toward your domain or style. Heavier than prompting, lighter than training from scratch.", related: ["lora", "peft", "sft"] },
  { slug: "function-calling", term: "Function calling", definition: "Telling the model the JSON schema of functions it can invoke. The model returns a structured tool_use block; your runtime executes it and feeds back the result.", related: ["tool-use", "structured-output"] },
  { slug: "generative", term: "Generative", definition: "AI that produces new content (text, image, audio, video) rather than only classifying or scoring existing content." },
  { slug: "hallucination", term: "Hallucination", definition: "When the model writes plausible-sounding text that isn't grounded in the input or in fact. Mitigated with retrieval (RAG), citations, narrower prompts, and evals.", related: ["rag", "eval"] },
  { slug: "hnsw", term: "HNSW", definition: "Hierarchical Navigable Small World — the dominant ANN (approximate nearest neighbour) index for vector search. Used inside pgvector, Qdrant, Weaviate, Pinecone." },
  { slug: "huggingface", term: "Hugging Face", definition: "Community hub for ML models, datasets, and Spaces (hosted demos). Most open-weights releases land there first. Also ships the transformers library.", link: "https://huggingface.co/" },
  { slug: "in-context-learning", term: "In-context learning", definition: "Showing the model examples inside the prompt to teach it a pattern, with no weight updates. The cheapest way to specialise a base model.", related: ["zero-shot", "one-shot"] },
  { slug: "inference", term: "Inference", definition: "Running a trained model to get a prediction. Distinct from training. The cost line item that grows with usage." },
  { slug: "instruction-tuning", term: "Instruction tuning", definition: "Fine-tuning a base model on examples of (instruction, ideal answer). Turns a raw next-token predictor into something that follows orders." },
  { slug: "json-mode", term: "JSON mode / strict output", definition: "Constraining the model to emit syntactically valid JSON or to match a JSON Schema. Anthropic does it via system prompt + jsonrepair fallback; OpenAI has a `response_format` flag.", related: ["structured-output", "function-calling"] },
  { slug: "kv-cache", term: "KV cache", definition: "Per-request cache of attention keys/values that lets the model decode each new token in O(1) over the existing prompt. The reason re-running the same prompt is fast." },
  { slug: "latent-space", term: "Latent space", definition: "The model's internal high-dimensional representation. Embeddings live here. Operations like vector arithmetic ('king − man + woman ≈ queen') happen here." },
  { slug: "llm", term: "LLM", definition: "Large Language Model. A neural network trained on huge text corpora to predict the next token. Modern frontier examples: Claude, GPT-4, Gemini, Mistral, Llama." },
  { slug: "llms-txt", term: "llms.txt", definition: "Proposed convention: a `/llms.txt` file at the root of a site that lists the URLs and short descriptions an LLM should read for context. Like robots.txt for AI." },
  { slug: "lora", term: "LoRA", definition: "Low-Rank Adaptation. Cheap fine-tuning that learns a small low-rank delta on top of frozen base weights. The dominant PEFT method for open-weight models.", related: ["fine-tuning", "peft"] },
  { slug: "mcp", term: "MCP", definition: "Model Context Protocol. Open standard from Anthropic that lets LLM clients (Claude Desktop, Cursor) talk to external 'servers' for tools, resources, and prompts.", link: "https://modelcontextprotocol.io/" },
  { slug: "model-card", term: "Model card", definition: "Public document describing a model's training data, intended uses, limitations, evals, and safety mitigations. Industry standard since 2019." },
  { slug: "moe", term: "Mixture of Experts (MoE)", definition: "Architecture where each token routes through only a few specialised sub-networks, not the whole model. Lets you scale parameters without scaling per-token compute. Used in DeepSeek-V3, Mixtral." },
  { slug: "multi-modal", term: "Multi-modal", definition: "Model that accepts more than one input type — text + images, text + audio, sometimes video. GPT-4o, Gemini 2.5, and Claude 4.x all support image input." },
  { slug: "one-shot", term: "One-shot prompting", definition: "Showing the model exactly one example of the desired input → output before asking for the real answer.", related: ["in-context-learning", "zero-shot"] },
  { slug: "openai-compatible", term: "OpenAI-compatible API", definition: "Many providers (Together, Groq, Mistral, OpenRouter) expose an API that mirrors OpenAI's `/v1/chat/completions` shape so you can swap providers by changing the base URL." },
  { slug: "peft", term: "PEFT", definition: "Parameter-Efficient Fine-Tuning. Umbrella for techniques (LoRA, prefix tuning, IA³) that train a tiny number of new parameters instead of all of them.", related: ["fine-tuning", "lora"] },
  { slug: "pgvector", term: "pgvector", definition: "Postgres extension that adds a `vector` column type plus IVF/HNSW indexes. Lets you do RAG inside the same DB as your business data — no separate vector store needed for ≤1M vectors.", related: ["vector-db", "rag"] },
  { slug: "prompt", term: "Prompt", definition: "The text you send to the model. Splits into the system prompt (persistent instructions) and user prompt (the current turn)." },
  { slug: "prompt-caching", term: "Prompt caching", definition: "Same as caching: reuse the encoded representation of a long fixed prefix across calls. Anthropic supports it via `cache_control: ephemeral` blocks.", related: ["caching", "kv-cache"] },
  { slug: "prompt-injection", term: "Prompt injection", definition: "Untrusted input that smuggles instructions to the model ('ignore previous instructions and ...'). The classic security failure mode for any LLM that reads external content." },
  { slug: "quantization", term: "Quantization", definition: "Reducing the precision of model weights (fp16 → int8 → int4) so the model fits on smaller GPUs or laptops. Trade some quality for big speed and memory wins." },
  { slug: "rag", term: "RAG", definition: "Retrieval-Augmented Generation. Embed your docs, store them in a vector DB, retrieve the top-k for each query, and stuff them into the model's context. The standard way to ground answers in your data.", related: ["embedding", "vector-db", "context-engineering"] },
  { slug: "reasoning-model", term: "Reasoning model", definition: "A model that spends extra inference compute on internal 'thinking' (visible or hidden) before answering. Examples: o1/o3 series, Claude 4 thinking mode, DeepSeek-R1." },
  { slug: "reranker", term: "Reranker", definition: "A second-stage model that re-orders candidates from a fast first-stage retriever. Common in search and RAG pipelines; Cohere Rerank and BGE rerankers are popular." },
  { slug: "rlhf", term: "RLHF", definition: "Reinforcement Learning from Human Feedback. Train a reward model from human comparisons, then fine-tune the LLM to maximise the reward. Used in InstructGPT and many post-training stages." },
  { slug: "sampling", term: "Sampling", definition: "How the next token is picked from the probability distribution. Greedy = always max. Sampling with temperature / top-k / top-p adds controlled randomness.", related: ["temperature", "top-k-top-p"] },
  { slug: "semantic-search", term: "Semantic search", definition: "Search by meaning rather than keyword overlap. Embed the query and the documents; rank by cosine similarity. Pairs well with classic BM25 in a hybrid setup.", related: ["embedding", "rag", "vector-db"] },
  { slug: "serverless", term: "Serverless", definition: "Compute model where you don't manage VMs — the platform spins up an instance per request and shuts it down after. Vercel functions, AWS Lambda, Cloudflare Workers." },
  { slug: "sft", term: "SFT", definition: "Supervised Fine-Tuning. The standard fine-tune: feed (prompt, ideal answer) pairs and minimise loss. Usually the first post-training step before RLHF or DPO.", related: ["fine-tuning", "rlhf"] },
  { slug: "sse", term: "Server-Sent Events (SSE)", definition: "One-way streaming protocol over HTTP. The transport every LLM 'streaming' API uses: server pushes tokens as they're decoded, client renders incrementally." },
  { slug: "structured-output", term: "Structured output", definition: "Constraining the model to return data that matches a schema (JSON, XML, function arguments). Removes the need for fragile regex parsing.", related: ["json-mode", "function-calling"] },
  { slug: "temperature", term: "Temperature", definition: "Sampling knob: 0 = deterministic / always pick the highest-probability token, higher = more creative / more random. Most production code lives between 0 and 0.7.", related: ["sampling", "top-k-top-p"] },
  { slug: "tool-use", term: "Tool use", definition: "The LLM emits a structured request to call one of the developer-provided tools. The runtime executes it and returns the result. Foundation of every agent.", related: ["agent", "function-calling"] },
  { slug: "tokenizer", term: "Tokenizer", definition: "Splits text into tokens before the model sees it. Different families (BPE for GPT, SentencePiece for Llama, Tiktoken for OpenAI) split slightly differently — the same string can be 50 or 70 tokens." },
  { slug: "top-k-top-p", term: "Top-k / top-p (nucleus) sampling", definition: "Two ways to truncate the next-token distribution. Top-k keeps the k highest-probability tokens; top-p keeps the smallest set whose cumulative probability ≥ p. Tame randomness without going fully greedy.", related: ["sampling", "temperature"] },
  { slug: "transformer", term: "Transformer", definition: "Neural network architecture from the 2017 'Attention Is All You Need' paper. The base of every modern LLM. Self-attention lets each token attend to every other token in the context." },
  { slug: "umap", term: "UMAP", definition: "Dimensionality reduction algorithm. Projects high-dim embeddings into 2-D so you can plot semantic clusters. Faster and often clearer than t-SNE." },
  { slug: "vector-db", term: "Vector database", definition: "Store and search embeddings at scale. Popular options: Pinecone, Qdrant, Weaviate, Milvus, Chroma, plus pgvector inside Postgres. Powers RAG and semantic search.", related: ["embedding", "rag", "pgvector"] },
  { slug: "voice-agent", term: "Voice agent", definition: "End-to-end pipeline that listens (STT), reasons (LLM), and speaks (TTS) — often over WebRTC for sub-second latency. Built with platforms like Vapi, Retell, or Pipecat." },
  { slug: "webrtc", term: "WebRTC", definition: "Peer-to-peer real-time audio/video standard built into browsers. The transport for low-latency voice agents and many Lovable-style co-edit demos." },
  { slug: "weights", term: "Weights", definition: "The numeric parameters of a trained model. 'Open weights' means the file is downloadable and runnable; 'open source' adds the training code and data.", related: ["fine-tuning", "quantization"] },
  { slug: "zero-shot", term: "Zero-shot prompting", definition: "Asking the model to do a task with no examples — just the instruction. Most modern frontier models are strong zero-shot.", related: ["one-shot", "in-context-learning"] }
];

export const glossaryByLetter = (() => {
  const map: Record<string, GlossaryTerm[]> = {};
  for (const t of glossary) {
    const letter = t.term[0].toUpperCase();
    if (!map[letter]) map[letter] = [];
    map[letter].push(t);
  }
  for (const letter of Object.keys(map)) {
    map[letter].sort((a, b) => a.term.localeCompare(b.term));
  }
  return map;
})();

export const glossaryLetters = Object.keys(glossaryByLetter).sort();

export const totalGlossaryTerms = glossary.length;
