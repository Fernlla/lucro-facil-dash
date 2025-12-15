import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schemaData?: Record<string, unknown>;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO = ({
  title = 'LucroFácil - Gestão Inteligente para Pequenos Negócios | Dashboard Financeiro',
  description = 'Controle lucros em tempo real, gerencie produtos, acompanhe vendas e defina metas com o LucroFácil. Sistema completo de gestão financeira para microempreendedores e pequenos negócios. Teste grátis por 14 dias!',
  keywords = 'gestão financeira, controle de lucros, dashboard financeiro, gerenciamento de vendas, controle de estoque, sistema para pequenas empresas, MEI, microempreendedor, controle de produtos, metas de vendas, relatórios financeiros, assistente IA negócios, análise de vendas, margem de lucro',
  canonical = 'https://lucrofacil.com.br',
  ogImage = 'https://lucrofacil.com.br/og-image.png',
  ogType = 'website',
  schemaData,
  author = 'LucroFácil',
  publishedTime,
  modifiedTime
}: SEOProps) => {
  
  // Schema.org - Organização
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LucroFácil",
    "url": "https://lucrofacil.com.br",
    "logo": "https://lucrofacil.com.br/logo.png",
    "description": "Plataforma de gestão financeira para pequenos negócios",
    "foundingDate": "2025",
    "sameAs": [
      "https://www.facebook.com/lucrofacil",
      "https://www.instagram.com/lucrofacil",
      "https://www.linkedin.com/company/lucrofacil",
      "https://twitter.com/lucrofacil"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-0000-0000",
      "contactType": "Customer Service",
      "availableLanguage": "Portuguese"
    }
  };

  // Schema.org - SoftwareApplication
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LucroFácil",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
      "description": "Teste gratuito de 14 dias"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": description,
    "screenshot": ogImage,
    "softwareVersion": "2.0",
    "datePublished": "2025-01-01",
    "author": {
      "@type": "Organization",
      "name": "LucroFácil"
    },
    "featureList": [
      "Controle de lucros em tempo real",
      "Gestão de produtos e estoque",
      "Relatórios inteligentes",
      "Análise de vendas",
      "Assistente IA",
      "Metas e objetivos",
      "Dashboard completo"
    ]
  };

  // Schema.org - WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LucroFácil",
    "url": "https://lucrofacil.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lucrofacil.com.br/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Schema.org - BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://lucrofacil.com.br"
      }
    ]
  };

  // Schema.org - FAQPage (se houver)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o LucroFácil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LucroFácil é uma plataforma completa de gestão financeira para pequenos negócios, permitindo controle de lucros em tempo real, gestão de produtos, análise de vendas e muito mais."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto custa o LucroFácil?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oferecemos um teste gratuito de 14 dias. Após o período de teste, você pode escolher entre nossos planos que atendem diferentes necessidades de negócio."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso de cartão de crédito para testar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não! Você pode começar seu teste gratuito de 14 dias sem precisar cadastrar cartão de crédito."
        }
      }
    ]
  };

  const allSchemas = [
    organizationSchema,
    softwareSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
    ...(schemaData ? [schemaData] : [])
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />
      
      {/* Robots Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language and Geo */}
      <meta name="language" content="Portuguese" />
      <meta name="geo.region" content="BR" />
      <meta name="geo.placename" content="Brasil" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="LucroFácil" />
      <meta property="og:locale" content="pt_BR" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@lucrofacil" />
      <meta name="twitter:site" content="@lucrofacil" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="LucroFácil" />
      <meta name="application-name" content="LucroFácil" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Schema.org JSON-LD */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;
