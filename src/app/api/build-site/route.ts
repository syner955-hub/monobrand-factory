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
}

function generateCSS(brandData: BuildRequest["brandData"], randomSeed: number): string {
  const primary = brandData?.colors?.primaryColor || "#7c3aed";
  const bg = brandData?.colors?.bgColor || "#0f0f1a";
  const text = brandData?.colors?.textColor || "#ffffff";
  const radius = 8 + (randomSeed % 8);
  const fontOptions = ["'Inter','Segoe UI',sans-serif", "'Poppins','Helvetica',sans-serif", "'Roboto','Arial',sans-serif", "'Montserrat',sans-serif", "'Open Sans',sans-serif"];
  const font = fontOptions[randomSeed % fontOptions.length];

  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
:root{--primary:${primary};--bg:${bg};--text:${text};--radius:${radius}px;--font:${font}}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:var(--font);background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh}
.container{max-width:1200px;margin:0 auto;padding:0 20px}
header{padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.1);position:sticky;top:0;background:var(--bg);z-index:100;backdrop-filter:blur(10px)}
header .container{display:flex;align-items:center;justify-content:space-between}
.logo{font-size:24px;font-weight:700;color:var(--primary);text-decoration:none}
.logo img{height:40px;width:auto}
nav{display:flex;gap:24px;align-items:center}
nav a{color:var(--text);text-decoration:none;font-size:14px;font-weight:500;opacity:0.8;transition:opacity 0.2s}
nav a:hover{opacity:1;color:var(--primary)}
.hero{padding:80px 0;text-align:center}
.hero h1{font-size:clamp(32px,5vw,56px);font-weight:800;margin-bottom:16px;line-height:1.1}
.hero p{font-size:18px;opacity:0.7;max-width:600px;margin:0 auto 32px}
.cta-btn{display:inline-block;padding:14px 32px;background:var(--primary);color:#fff;text-decoration:none;border-radius:var(--radius);font-weight:600;font-size:15px;transition:all 0.2s;border:none;cursor:pointer}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,58,237,0.3)}
section{padding:60px 0}
h2{font-size:28px;font-weight:700;margin-bottom:20px}
h3{font-size:20px;font-weight:600;margin-bottom:12px}
p{margin-bottom:16px;opacity:0.85}
ul,ol{margin-bottom:16px;padding-left:24px}
li{margin-bottom:8px}
table{width:100%;border-collapse:collapse;margin:20px 0;border-radius:var(--radius);overflow:hidden}
th,td{padding:12px 16px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1)}
th{background:rgba(255,255,255,0.05);font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.5px}
details{margin-bottom:12px;border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius);overflow:hidden}
summary{padding:16px;cursor:pointer;font-weight:600;background:rgba(255,255,255,0.03)}
details p{padding:0 16px 16px}
footer{padding:40px 0;border-top:1px solid rgba(255,255,255,0.1);text-align:center;opacity:0.6;font-size:13px}
.grid-2{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius);padding:24px;transition:border-color 0.2s}
.card:hover{border-color:var(--primary)}
@media(max-width:768px){nav{display:none}.hero{padding:40px 0}section{padding:40px 0}}`;
}

function generateHTML(config: BuildRequest, pageId: string, css: string): string {
  const pageContent = config.content[pageId] || "";
  const title = `${config.brand}${pageId !== "home" ? " — " + pageId.charAt(0).toUpperCase() + pageId.slice(1) : ""} | Official`;
  const navItems = config.pages.map(p => {
    const labels: Record<string, string> = { home: "Home", bonus: "Bonuses", games: "Games", legit: "About", login: "Login", geo: config.geo?.toUpperCase() || "Region", payments: "Payments", mobile: "Mobile", vip: "VIP", faq: "FAQ" };
    const href = p === "home" ? "/" : `/${p}/`;
    return `<a href="${href}">${labels[p] || p}</a>`;
  }).join("\n        ");

  const metaKeywords = config.searchEngine === "bing" || config.searchEngine === "both"
    ? `\n    <meta name="keywords" content="${config.brand}, ${config.brand} casino, ${config.brand} ${config.geo}, ${config.brand} bonus, ${config.brand} login">`
    : "";

  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.brand,
    "url": `https://${config.domain || "example.com"}`,
  });

  return `<!DOCTYPE html>
<html lang="${config.language || "en"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${config.brand} — Your trusted online casino. Play slots, table games and more. Welcome bonus available.">${metaKeywords}
    <link rel="canonical" href="https://${config.domain || "example.com"}${pageId === "home" ? "/" : "/" + pageId + "/"}">
    <link rel="icon" href="/favicon.ico">
    <style>${css}</style>
    <script type="application/ld+json">${schemaOrg}</script>
</head>
<body>
    <header>
        <div class="container">
            <a href="/" class="logo">${config.brand}</a>
            <nav>
        ${navItems}
            </nav>
            <a href="#" class="cta-btn">Play Now</a>
        </div>
    </header>
    <main>
        ${pageId === "home" ? `<div class="hero"><div class="container"><h1>Welcome to ${config.brand}</h1><p>Your premier online casino destination. Join now and claim your welcome bonus.</p><a href="#" class="cta-btn">Get Started</a></div></div>` : ""}
        <section><div class="container">${pageContent}</div></section>
    </main>
    <footer><div class="container"><p>&copy; ${new Date().getFullYear()} ${config.brand}. All rights reserved. 18+ | Gamble responsibly.</p></div></footer>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const config: BuildRequest = await req.json();
    if (!config.brand || !config.pages?.length) {
      return NextResponse.json({ error: "Brand and pages required" }, { status: 400 });
    }

    const randomSeed = Math.floor(Math.random() * 1000);
    const css = generateCSS(config.brandData, randomSeed);

    // Build files map
    const files: Record<string, string> = {};

    for (const pageId of config.pages) {
      const html = generateHTML(config, pageId, css);
      if (pageId === "home") {
        files["index.html"] = html;
      } else {
        files[`${pageId}/index.html`] = html;
      }
    }

    // robots.txt
    files["robots.txt"] = `User-agent: *\nAllow: /\nSitemap: https://${config.domain || "example.com"}/sitemap.xml`;

    // sitemap.xml
    const sitemapUrls = config.pages.map(p => {
      const loc = p === "home" ? "/" : `/${p}/`;
      return `  <url><loc>https://${config.domain || "example.com"}${loc}</loc><lastmod>${new Date().toISOString().split("T")[0]}</lastmod></url>`;
    }).join("\n");
    files["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>`;

    // IndexNow for Bing
    if (config.searchEngine === "bing" || config.searchEngine === "both") {
      const indexNowKey = Math.random().toString(36).substring(2, 34);
      files[`${indexNowKey}.txt`] = indexNowKey;
    }

    files[".nojekyll"] = "";

    return NextResponse.json({
      success: true,
      files,
      stats: {
        pages: config.pages.length,
        totalFiles: Object.keys(files).length,
        searchEngine: config.searchEngine,
        hasIndexNow: config.searchEngine === "bing" || config.searchEngine === "both",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
