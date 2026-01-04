import { useEffect } from 'react';

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: JsonLd;
  noIndex?: boolean;
}

const DEFAULT_IMAGE = '/favicon/android-chrome-512x512.png';
const DEFAULT_SITE_NAME = 'Docdex';

const ensureMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const ensureLink = (selector: string, attrs: Record<string, string>) => {
  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const ensureJsonLd = (id: string, data?: JsonLd) => {
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.id = id;
    document.head.appendChild(element);
  }
  element.text = JSON.stringify(data);
};

const Seo = ({ title, description, path, keywords, image, type = 'website', jsonLd, noIndex }: SeoProps) => {
  useEffect(() => {
    const baseUrl = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://docdex.org';
    const normalizedPath = path?.startsWith('/') ? path : path ? `/${path}` : window.location.pathname;
    const url = `${baseUrl}${normalizedPath || '/'}`;
    const imagePath = image || DEFAULT_IMAGE;
    const imageUrl = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;

    document.title = `${title} | ${DEFAULT_SITE_NAME}`;

    ensureMeta('meta[name="description"]', { name: 'description', content: description });
    ensureMeta('meta[name="keywords"]', {
      name: 'keywords',
      content:
        keywords ||
        'Docdex, local search, code intelligence, AST, impact graph, MCP server, HTTP API, agent memory, repo memory, web search, Ollama, open source'
    });
    ensureMeta('meta[name=\"robots\"]', { name: 'robots', content: noIndex ? 'noindex,nofollow' : 'index,follow' });

    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    ensureMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: DEFAULT_SITE_NAME });

    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    ensureLink('link[rel="canonical"]', { rel: 'canonical', href: url });
    ensureJsonLd('docdex-jsonld', jsonLd);
  }, [title, description, path, keywords, image, type, jsonLd]);

  return null;
};

export default Seo;
