import React from 'react';
import Seo from './Seo';

const FaqPage: React.FC = () => {
  const faqs = [
    {
      question: 'Is Docdex open source and free to use?',
      answer: 'Yes. Docdex is fully open source under the MIT license and free to use.'
    },
    {
      question: 'Does Docdex upload my code or documentation?',
      answer: 'No. Docdex is local-first and stores indexes on your machine. Nothing is uploaded by default.'
    },
    {
      question: 'Which languages are supported for AST and symbols?',
      answer:
        'Docdex supports Rust, Python, JavaScript, TypeScript, Go, Java, C#, C/C++, PHP, Kotlin, Swift, Ruby, Lua, and Dart.'
    },
    {
      question: 'Do I need Ollama to use Docdex?',
      answer:
        'Search and indexing work without Ollama. Repo memory, agent memory embeddings, and optional web refinement use Ollama.'
    },
    {
      question: 'How do I enable TLS and certificates?',
      answer:
        'Use --tls-cert and --tls-key for custom PEM files, or --certbot-domain / --certbot-live-dir for certbot-managed certificates.'
    },
    {
      question: 'How do I secure remote access?',
      answer:
        'Use --auth-token, keep secure mode enabled, and add --allow-ip plus rate limits. TLS is required on non-loopback binds by default.'
    },
    {
      question: 'How do I connect MCP clients?',
      answer:
        'Start docdexd daemon and point clients to http://localhost:<port>/sse or /v1/mcp. The docdexd mcp-add helper auto-configures supported clients.'
    },
    {
      question: 'Can I run multiple repositories?',
      answer:
        'Yes. Run a shared daemon and mount repos via POST /v1/initialize, or run multiple daemons on different ports.'
    },
    {
      question: 'What is repo memory vs agent memory?',
      answer:
        'Repo memory stores project-specific facts and decisions. Agent memory stores long-lived preferences across repos.'
    },
    {
      question: 'Can Docdex be used as a standalone knowledge base?',
      answer:
        'Yes. Run the daemon and query the HTTP API from internal tools, scripts, or dashboards without any cloud services.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-page">
      <Seo
        title="FAQ"
        description="Frequently asked questions about Docdex, including security, TLS, MCP, Ollama, and memory features."
        path="/faq"
        type="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-brand-400 font-mono text-sm tracking-wider uppercase">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mt-4 tracking-tight">Answers to common questions.</h1>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            Everything you need to know about security, deployment, MCP, memory, and Ollama integrations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-surface-200/50 bg-surface-50/20 p-6"
            >
              <summary className="cursor-pointer text-white font-semibold list-none">
                {faq.question}
              </summary>
              <p className="text-gray-400 mt-4 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
