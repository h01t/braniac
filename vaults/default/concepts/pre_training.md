# Pre-Training of Large Language Models
Pre-training involves self-supervised learning on massive datasets to build foundational LLM capabilities. In the [[entities/deepseek_llm.md]] project, this includes:

**Data Processing:**
- Deduplication: Aggressive strategy across multiple Common Crawl dumps, removing up to 89.8% duplicates.
- Filtering: Linguistic and semantic evaluations to enhance data quality.
- Remixing: Adjusting for data imbalances to ensure diversity.

**Tokenizer:**
- Byte-level Byte-Pair Encoding (BBPE) based on the tokenizers library.
- Vocabulary size of 100,015 tokens, with pre-tokenization to prevent merging across character categories.

**Architecture:**
- Based on LLaMA design: Pre-Norm with RMSNorm, SwiGLU activation, Rotary Embedding.
- For the 67B model, Grouped-Query Attention (GQA) is used instead of Multi-Head Attention.
- Model specs: 7B (30 layers, 4096 hidden dim), 67B (95 layers, 8192 hidden dim).

**Hyperparameters:**
- Optimizer: AdamW with β1=0.9, β2=0.95, weight decay=0.1.
- Learning rate scheduler: Multi-step instead of cosine, facilitating continual training.
- Batch size and learning rate vary with model size, guided by [[concepts/scaling_laws.md]].

For alignment techniques, see [[concepts/alignment.md]].