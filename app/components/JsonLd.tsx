type PersonJsonLdDeveloper = {
  name: string;
  title?: string;
  bio?: string;
  headline?: string;
  slug: string;
  skills?: string[];
};

type BlogJsonLdPost = {
  title: string;
  excerpt?: string;
  description?: string;
  author: string;
  created_at?: string;
  updated_at?: string;
  slug: string;
};

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MageMatch",
    url: "https://magematch.com",
    logo: "https://magematch.com/magematch-logo.svg",
    description:
      "Dedicated marketplace for Adobe Commerce and Magento developers",
    email: "hello@magematch.com",
    foundingDate: "2026",
    sameAs: [
      "https://github.com/magematch",
      "https://www.linkedin.com/company/magematch",
    ],
  };

  return <JsonLdScript data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MageMatch",
    url: "https://magematch.com",
    description: "Find vetted Adobe Commerce and Magento 2 developers",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://magematch.com/developers?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLdScript data={data} />;
}

export function PersonJsonLd({ developer }: { developer: PersonJsonLdDeveloper }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: developer.name,
    jobTitle: developer.title || "Magento Developer",
    description: developer.bio || developer.headline || "Magento specialist",
    url: `https://magematch.com/developers/${developer.slug}`,
    worksFor: {
      "@type": "Organization",
      name: "MageMatch",
    },
    knowsAbout: developer.skills || [],
  };

  return <JsonLdScript data={data} />;
}

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `https://magematch.com${item.href}`,
    })),
  };

  return <JsonLdScript data={data} />;
}

export function BlogPostJsonLd({ post }: { post: BlogJsonLdPost }) {
  const description = post.excerpt || post.description || "Magento guide";

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://magematch.com/developers/arjun-dhiman",
    },
    publisher: {
      "@type": "Organization",
      name: "MageMatch",
      url: "https://magematch.com",
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://magematch.com/blog/${post.slug}`,
    },
  };

  return <JsonLdScript data={data} />;
}