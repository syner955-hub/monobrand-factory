import { NextRequest, NextResponse } from "next/server";

interface BuildRequest {
  brand: string;
  domain: string;
  geo: string;
  language: string;
  searchEngine: string;
  pages: string[];
  content: Record<string, string>;
  brandData?: {
    colors?: { primaryColor: string; bgColor: string; textColor: string };
    favicon?: string;
    logo?: string;
    fonts?: string;
  };
  affiliateUrl?: string;
}

function randomClass(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 8 + Math.floor(Math.random() * 5); // 8-12 chars
  let result = "";
  // First char must be a letter for valid CSS class
  result += chars.charAt(Math.floor(Math.random() * 52));
  for (let i = 1; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function buildClassMap() {
  return {
    body: randomClass(),
    container: randomClass(),
    header: randomClass(),
    headerInner: randomClass(),
    logo: randomClass(),
    logoImg: randomClass(),
    nav: randomClass(),
    navLink: randomClass(),
    navOpen: randomClass(),
    burger: randomClass(),
    burgerLine: randomClass(),
    ctaBtn: randomClass(),
    ctaBtnHover: randomClass(),
    hero: randomClass(),
    heroTitle: randomClass(),
    heroText: randomClass(),
    section: randomClass(),
    sectionTitle: randomClass(),
    sectionText: randomClass(),
    gamesGrid: randomClass(),
    gameCard: randomClass(),
    gameCardImg: randomClass(),
    gameCardTitle: randomClass(),
    contentSection: randomClass(),
    ctaBlock: randomClass(),
    paymentIcons: randomClass(),
    paymentIcon: randomClass(),
    footer: randomClass(),
    footerInner: randomClass(),
    footerLinks: randomClass(),
    footerLink: randomClass(),
    footerCopy: randomClass(),
    grid2: randomClass(),
    card: randomClass(),
    cardTitle: randomClass(),
    table: randomClass(),
    tableHead: randomClass(),
    tableCell: randomClass(),
    faq: randomClass(),
    faqItem: randomClass(),
    faqQuestion: randomClass(),
    faqAnswer: randomClass(),
    list: randomClass(),
    listItem: randomClass(),
    overlay: randomClass(),
  };
}

type ClassMap = ReturnType<typeof buildClassMap>;

function generateCSS(classMap: ClassMap, brandData: BuildRequest["brandData"]): string {
  const primary = brandData?.colors?.primaryColor || "#7c3aed";
  const bg = brandData?.colors?.bgColor || "#0f0f1a";
  const text = brandData?.colors?.textColor || "#ffffff";
  const fontImport = brandData?.fonts || "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap";

  return `@import url('${fontImport}');
:root {
  --primary: ${primary};
  --bg: ${bg};
  --text: ${text};
  --radius: 8px;
  --font: 'Inter', 'Segoe UI', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
.${classMap.body} {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}
.${classMap.container} {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.${classMap.header} {
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  position: sticky;
  top: 0;
  background: rgba(15,15,26,0.95);
  z-index: 1000;
  backdrop-filter: blur(12px);
}
.${classMap.headerInner} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.${classMap.logo} {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.${classMap.logoImg} {
  height: 40px;
  width: auto;
}
.${classMap.nav} {
  display: flex;
  gap: 24px;
  align-items: center;
}
.${classMap.navLink} {
  color: var(--text);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.2s, color 0.2s;
}
.${classMap.navLink}:hover {
  opacity: 1;
  color: var(--primary);
}
.${classMap.burger} {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 8px;
  background: none;
  border: none;
}
.${classMap.burgerLine} {
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.${classMap.ctaBtn} {
  display: inline-block;
  padding: 12px 28px;
  background: var(--primary);
  color: #fff;
  text-decoration: none;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  cursor: pointer;
  text-align: center;
}
.${classMap.ctaBtn}:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px ${primary}44;
}
.${classMap.hero} {
  padding: 80px 0 60px;
  text-align: center;
  background: linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%);
}
.${classMap.heroTitle} {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.1;
  background: linear-gradient(135deg, var(--text) 0%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.${classMap.heroText} {
  font-size: 18px;
  opacity: 0.7;
  max-width: 600px;
  margin: 0 auto 32px;
}
.${classMap.section} {
  padding: 60px 0;
}
.${classMap.sectionTitle} {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}
.${classMap.sectionText} {
  margin-bottom: 16px;
  opacity: 0.85;
  line-height: 1.7;
}
.${classMap.gamesGrid} {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin: 24px 0;
}
.${classMap.gameCard} {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
  cursor: pointer;
}
.${classMap.gameCard}:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}
.${classMap.gameCardImg} {
  width: 100%;
  aspect-ratio: 4/3;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}
.${classMap.gameCardTitle} {
  padding: 12px;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
}
.${classMap.contentSection} {
  padding: 40px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.${classMap.ctaBlock} {
  text-align: center;
  padding: 32px 0;
}
.${classMap.paymentIcons} {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}
.${classMap.paymentIcon} {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.7;
}
.${classMap.footer} {
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.2);
}
.${classMap.footerInner} {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}
.${classMap.footerLinks} {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-bottom: 20px;
}
.${classMap.footerLink} {
  color: var(--text);
  text-decoration: none;
  font-size: 13px;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.${classMap.footerLink}:hover {
  opacity: 1;
  color: var(--primary);
}
.${classMap.footerCopy} {
  font-size: 12px;
  opacity: 0.4;
  margin-top: 16px;
  line-height: 1.6;
}
.${classMap.grid2} {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 24px 0;
}
.${classMap.card} {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  padding: 24px;
  transition: border-color 0.2s;
}
.${classMap.card}:hover {
  border-color: var(--primary);
}
.${classMap.cardTitle} {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}
.${classMap.table} {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border-radius: var(--radius);
  overflow: hidden;
}
.${classMap.tableHead} {
  background: rgba(255,255,255,0.05);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 16px;
  text-align: left;
}
.${classMap.tableCell} {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.${classMap.faq} {
  margin: 24px 0;
}
.${classMap.faqItem} {
  margin-bottom: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius);
  overflow: hidden;
}
.${classMap.faqQuestion} {
  padding: 16px;
  cursor: pointer;
  font-weight: 600;
  background: rgba(255,255,255,0.03);
}
.${classMap.faqAnswer} {
  padding: 0 16px 16px;
  opacity: 0.8;
}
.${classMap.list} {
  margin-bottom: 16px;
  padding-left: 24px;
}
.${classMap.listItem} {
  margin-bottom: 8px;
}
.${classMap.overlay} {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .${classMap.nav} {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    width: 280px;
    height: 100vh;
    background: var(--bg);
    flex-direction: column;
    padding: 80px 24px 24px;
    gap: 16px;
    border-left: 1px solid rgba(255,255,255,0.1);
    z-index: 1001;
  }
  .${classMap.nav}.${classMap.navOpen} {
    display: flex;
  }
  .${classMap.overlay}.${classMap.navOpen} {
    display: block;
  }
  .${classMap.burger} {
    display: flex;
  }
  .${classMap.hero} {
    padding: 48px 0 36px;
  }
  .${classMap.heroTitle} {
    font-size: 28px;
  }
  .${classMap.section} {
    padding: 36px 0;
  }
  .${classMap.gamesGrid} {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
  .${classMap.paymentIcons} {
    gap: 8px;
  }
  .${classMap.paymentIcon} {
    padding: 8px 14px;
    font-size: 11px;
  }
  .${classMap.ctaBtn} {
    padding: 10px 20px;
    font-size: 13px;
  }
}
@media (max-width: 480px) {
  .${classMap.gamesGrid} {
    grid-template-columns: repeat(2, 1fr);
  }
  .${classMap.grid2} {
    grid-template-columns: 1fr;
  }
}`;
}

function generateBurgerJS(classMap: ClassMap): string {
  return `(function(){
  var burger=document.querySelector('.${classMap.burger}');
  var nav=document.querySelector('.${classMap.nav}');
  var overlay=document.querySelector('.${classMap.overlay}');
  if(!burger||!nav)return;
  function toggle(){
    nav.classList.toggle('${classMap.navOpen}');
    if(overlay)overlay.classList.toggle('${classMap.navOpen}');
  }
  burger.addEventListener('click',toggle);
  if(overlay)overlay.addEventListener('click',toggle);
})();`;
}

function generateHTML(
  config: BuildRequest,
  pageId: string,
  classMap: ClassMap,
  cssFileName: string
): string {
  const pageContent = config.content[pageId] || "";
  const pageLabel = pageId.charAt(0).toUpperCase() + pageId.slice(1).replace(/-/g, " ");
  const title = pageId === "home"
    ? `${config.brand} | Official Casino Site`
    : `${config.brand} — ${pageLabel} | Official`;
  const domain = config.domain || "example.com";
  const canonical = pageId === "home" ? `https://${domain}/` : `https://${domain}/${pageId}/`;
  const affiliateUrl = config.affiliateUrl || "#";
  const lang = config.language || "en";

  const navItems = config.pages
    .filter(p => p !== "go")
    .map(p => {
      const labels: Record<string, string> = {
        home: "Home", bonus: "Bonuses", bonuses: "Bonuses", games: "Games",
        legit: "Is it Legit?", login: "Login", payments: "Payments",
        mobile: "Mobile", vip: "VIP", faq: "FAQ", about: "About",
      };
      const href = p === "home" ? "/" : `/${p}/`;
      return `<a href="${href}" class="${classMap.navLink}">${labels[p] || pageLabel}</a>`;
    }).join("\n            ");

  const metaKeywords = (config.searchEngine === "bing" || config.searchEngine === "both")
    ? `\n    <meta name="keywords" content="${config.brand}, ${config.brand} casino, ${config.brand} ${config.geo}, ${config.brand} bonus, ${config.brand} login, ${config.brand} review">`
    : "";

  const hreflang = `\n    <link rel="alternate" hreflang="${lang}" href="${canonical}">
    <link rel="alternate" hreflang="x-default" href="${canonical}">`;

  const ogTags = `\n    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${config.brand} — Your trusted online casino. Play slots, table games and more.">
    <meta property="og:url" content="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${config.brand}">
    <meta property="og:locale" content="${lang}">`;

  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.brand,
    "url": `https://${domain}`,
    "logo": config.brandData?.logo || `https://${domain}/logo.png`,
    "sameAs": [],
  });

  const schemaWebsite = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.brand,
    "url": `https://${domain}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `https://${domain}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  const faviconTag = config.brandData?.favicon
    ? `<link rel="icon" href="${config.brandData.favicon}">`
    : `<link rel="icon" href="/favicon.ico">`;

  const logoHtml = config.brandData?.logo
    ? `<img src="${config.brandData.logo}" alt="${config.brand}" class="${classMap.logoImg}">`
    : config.brand;

  // Games grid placeholder
  const gamesPlaceholder = ["Slots", "Roulette", "Blackjack", "Poker", "Baccarat", "Live Casino", "Jackpots", "New Games"];
  const gamesGridHtml = gamesPlaceholder.map(g =>
    `<div class="${classMap.gameCard}"><div class="${classMap.gameCardImg}">&#127920;</div><div class="${classMap.gameCardTitle}">${g}</div></div>`
  ).join("\n            ");

  // Payment icons
  const payments = ["Visa", "Mastercard", "Skrill", "Neteller", "Bitcoin", "Bank Transfer", "Apple Pay", "Google Pay"];
  const paymentIconsHtml = payments.map(p =>
    `<div class="${classMap.paymentIcon}">${p}</div>`
  ).join("\n            ");

  // Footer legal links
  const footerLinksHtml = [
    { label: "Terms & Conditions", href: "/terms/" },
    { label: "Privacy Policy", href: "/privacy/" },
    { label: "Responsible Gaming", href: "/responsible-gaming/" },
    { label: "Cookie Policy", href: "/cookies/" },
    { label: "Contact", href: "/contact/" },
  ].map(l => `<a href="${l.href}" class="${classMap.footerLink}">${l.label}</a>`).join("\n            ");

  // Build page body based on pageId
  let mainContent = "";

  if (pageId === "home") {
    mainContent = `
        <div class="${classMap.hero}">
            <div class="${classMap.container}">
                <h1 class="${classMap.heroTitle}">Welcome to ${config.brand}</h1>
                <p class="${classMap.heroText}">Your premier online casino destination. Join now and claim your exclusive welcome bonus.</p>
                <a href="${affiliateUrl}" class="${classMap.ctaBtn}" rel="nofollow">Get Bonus Now</a>
            </div>
        </div>
        <div class="${classMap.section}">
            <div class="${classMap.container}">
                <h2 class="${classMap.sectionTitle}">Popular Games</h2>
                <div class="${classMap.gamesGrid}">
                    ${gamesGridHtml}
                </div>
            </div>
        </div>
        <div class="${classMap.ctaBlock}">
            <a href="${affiliateUrl}" class="${classMap.ctaBtn}" rel="nofollow">Play Now at ${config.brand}</a>
        </div>
        <div class="${classMap.section}">
            <div class="${classMap.container}">
                ${pageContent}
            </div>
        </div>
        <div class="${classMap.ctaBlock}">
            <a href="${affiliateUrl}" class="${classMap.ctaBtn}" rel="nofollow">Claim Your Bonus</a>
        </div>
        <div class="${classMap.section}">
            <div class="${classMap.container}">
                <h2 class="${classMap.sectionTitle}">Payment Methods</h2>
                <div class="${classMap.paymentIcons}">
                    ${paymentIconsHtml}
                </div>
            </div>
        </div>`;
  } else {
    mainContent = `
        <div class="${classMap.section}">
            <div class="${classMap.container}">
                <h1 class="${classMap.sectionTitle}">${pageLabel} — ${config.brand}</h1>
                <div class="${classMap.contentSection}">
                    ${pageContent}
                </div>
            </div>
        </div>
        <div class="${classMap.ctaBlock}">
            <a href="${affiliateUrl}" class="${classMap.ctaBtn}" rel="nofollow">Play Now at ${config.brand}</a>
        </div>
        <div class="${classMap.section}">
            <div class="${classMap.container}">
                <h2 class="${classMap.sectionTitle}">Payment Methods</h2>
                <div class="${classMap.paymentIcons}">
                    ${paymentIconsHtml}
                </div>
            </div>
        </div>
        <div class="${classMap.ctaBlock}">
            <a href="${affiliateUrl}" class="${classMap.ctaBtn}" rel="nofollow">Claim Your Bonus</a>
        </div>`;
  }

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${config.brand} — Your trusted online casino. Play slots, table games and more. Welcome bonus available.">${metaKeywords}${ogTags}${hreflang}
    <link rel="canonical" href="${canonical}">
    ${faviconTag}
    <link rel="stylesheet" href="/${cssFileName}">
    <script type="application/ld+json">${schemaOrg}</script>
    <script type="application/ld+json">${schemaWebsite}</script>
</head>
<body class="${classMap.body}">
    <div class="${classMap.overlay}"></div>
    <header class="${classMap.header}">
        <div class="${classMap.headerInner}">
            <a href="/" class="${classMap.logo}">${logoHtml}</a>
            <nav class="${classMap.nav}">
            ${navItems}
            </nav>
            <button class="${classMap.burger}" aria-label="Menu">
                <span class="${classMap.burgerLine}"></span>
                <span class="${classMap.burgerLine}"></span>
                <span class="${classMap.burgerLine}"></span>
            </button>
            <a href="${affiliateUrl}" class="${classMap.ctaBtn}" rel="nofollow">Play Now</a>
        </div>
    </header>
    <main>${mainContent}
    </main>
    <footer class="${classMap.footer}">
        <div class="${classMap.footerInner}">
            <div class="${classMap.footerLinks}">
            ${footerLinksHtml}
            </div>
            <p class="${classMap.footerCopy}">&copy; ${new Date().getFullYear()} ${config.brand}. All rights reserved. 18+ | Gamble responsibly.<br>This site is for informational purposes only.</p>
        </div>
    </footer>
    <script>${generateBurgerJS(classMap)}</script>
</body>
</html>`;
}

function generateRedirectPage(affiliateUrl: string, brand: string): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Redirecting to ${brand}...</title>
    <meta http-equiv="refresh" content="0;url=${affiliateUrl}">
    <meta name="robots" content="noindex, nofollow">
    <script>window.location.href="${affiliateUrl}";</script>
</head>
<body>
    <p>Redirecting to <a href="${affiliateUrl}">${brand}</a>...</p>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const config: BuildRequest = await req.json();

    if (!config.brand || !config.pages?.length) {
      return NextResponse.json(
        { error: "Brand and pages are required" },
        { status: 400 }
      );
    }

    const domain = config.domain || "example.com";
    const affiliateUrl = config.affiliateUrl || `https://${domain}/go/`;
    const classMap = buildClassMap();

    // Generate CSS
    const cssContent = generateCSS(classMap, config.brandData);
    const cssFileName = `style-${randomClass().toLowerCase()}.css`;

    // Build files map
    const files: Record<string, string> = {};

    // CSS file
    files[cssFileName] = cssContent;

    // HTML pages
    for (const pageId of config.pages) {
      if (pageId === "go") continue; // handled separately
      const html = generateHTML(config, pageId, classMap, cssFileName);
      if (pageId === "home") {
        files["index.html"] = html;
      } else {
        files[`${pageId}/index.html`] = html;
      }
    }

    // Redirect page
    files["go/index.html"] = generateRedirectPage(affiliateUrl, config.brand);

    // robots.txt
    files["robots.txt"] = `User-agent: *
Allow: /
Disallow: /go/

Sitemap: https://${domain}/sitemap.xml`;

    // sitemap.xml
    const today = new Date().toISOString().split("T")[0];
    const sitemapUrls = config.pages
      .filter(p => p !== "go")
      .map(p => {
        const loc = p === "home" ? "/" : `/${p}/`;
        return `  <url>\n    <loc>https://${domain}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p === "home" ? "1.0" : "0.8"}</priority>\n  </url>`;
      }).join("\n");

    files["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

    // IndexNow key for Bing
    let indexNowKey: string | null = null;
    if (config.searchEngine === "bing" || config.searchEngine === "both") {
      indexNowKey = Array.from({ length: 32 }, () =>
        "abcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 36))
      ).join("");
      files[`${indexNowKey}.txt`] = indexNowKey;
    }

    // .nojekyll for GitHub Pages
    files[".nojekyll"] = "";

    return NextResponse.json({
      success: true,
      files,
      stats: {
        brand: config.brand,
        domain,
        pages: config.pages.length,
        totalFiles: Object.keys(files).length,
        cssFile: cssFileName,
        searchEngine: config.searchEngine,
        hasIndexNow: !!indexNowKey,
        indexNowKey,
        classMapSample: {
          header: classMap.header,
          nav: classMap.nav,
          hero: classMap.hero,
        },
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
