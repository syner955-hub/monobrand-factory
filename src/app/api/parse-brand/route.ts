import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    // Extract colors from CSS
    const brandData = await page.evaluate(() => {
      const getComputedColors = () => {
        const body = document.body;
        const bodyStyle = getComputedStyle(body);
        const buttons = document.querySelectorAll("button, a.btn, .btn, [class*='button'], [class*='cta']");
        const headers = document.querySelectorAll("h1, h2, h3");

        let primaryColor = "#7c3aed";
        let bgColor = bodyStyle.backgroundColor || "#ffffff";
        let textColor = bodyStyle.color || "#1a1a2e";

        // Try to find accent/primary from buttons
        buttons.forEach((btn) => {
          const style = getComputedStyle(btn);
          const bg = style.backgroundColor;
          if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
            primaryColor = bg;
          }
        });

        return { primaryColor, bgColor, textColor };
      };

      const getFavicon = () => {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        return link?.href || "";
      };

      const getLogo = () => {
        // Try header img first
        const headerImg = document.querySelector("header img, nav img, .logo img, [class*='logo'] img") as HTMLImageElement;
        if (headerImg?.src) return headerImg.src;
        // Try SVG
        const headerSvg = document.querySelector("header svg, nav svg, .logo svg");
        if (headerSvg) return "svg";
        return "";
      };

      const getTitle = () => document.title;
      const getDescription = () => {
        const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
        return meta?.content || "";
      };

      const getH1 = () => {
        const h1 = document.querySelector("h1");
        return h1?.textContent?.trim() || "";
      };

      const getFonts = () => {
        const body = getComputedStyle(document.body);
        return body.fontFamily;
      };

      return {
        colors: getComputedColors(),
        favicon: getFavicon(),
        logo: getLogo(),
        title: getTitle(),
        description: getDescription(),
        h1: getH1(),
        fonts: getFonts(),
      };
    });

    // Take screenshot
    const screenshot = await page.screenshot({ encoding: "base64", type: "webp", quality: 60 });

    // Get full HTML for structure analysis
    const html = await page.content();
    await browser.close();

    // Analyze structure with cheerio
    const $ = cheerio.load(html);
    const structure = {
      hasNav: $("nav").length > 0,
      hasFooter: $("footer").length > 0,
      hasHero: $("[class*='hero'], [class*='banner'], .hero, .banner").length > 0,
      hasFAQ: $("[class*='faq'], [class*='accordion'], .faq").length > 0,
      sections: $("section").length,
      h2s: $("h2").map((_, el) => $(el).text().trim()).get().slice(0, 10),
      links: $("a[href]").length,
      images: $("img").length,
      wordCount: $("body").text().replace(/\s+/g, " ").trim().split(" ").length,
    };

    return NextResponse.json({
      success: true,
      brand: {
        ...brandData,
        screenshot: `data:image/webp;base64,${screenshot}`,
        structure,
        url,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
