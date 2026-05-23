import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });
}

const SYSTEM_PROMPT = `Ты — контент-генератор для монобренд-сайтов казино. Ты создаёшь контент ОТ ЛИЦА БРЕНДА (не обзор, а как будто это официальный сайт).

ПРАВИЛА:
1. Пиши от первого лица бренда ("Мы предлагаем", "Наше казино")
2. Контент должен выглядеть как на официальном сайте казино
3. Включай конкретику: бонусы, условия, игры
4. Не используй шаблонные фразы
5. Каждая секция должна закрывать конкретный поисковый интент
6. Используй HTML-разметку (h2, h3, p, ul, li, table)
7. Добавляй CTA-кнопки в формате: <a class="cta-btn" href="#">Текст</a>
8. Для FAQ используй формат: <details><summary>Вопрос</summary><p>Ответ</p></details>

ФОРМАТ ВЫВОДА: чистый HTML (без обёрток html/body/head, только контент секций)`;

export async function POST(req: NextRequest) {
  try {
    const { brand, geo, language, pages, searchEngine, officialUrl } = await req.json();

    if (!brand || !pages?.length) {
      return NextResponse.json({ error: "Brand and pages required" }, { status: 400 });
    }

    const pageLabels: Record<string, string> = {
      home: "Главная страница",
      bonus: "Бонусы и промо-коды",
      games: "Игры и слоты",
      legit: "Легитимность и безопасность",
      login: "Вход и регистрация",
      geo: `Страница для ${geo?.toUpperCase()}`,
      payments: "Способы оплаты",
      mobile: "Мобильная версия",
      vip: "VIP и программа лояльности",
      faq: "FAQ",
    };

    const engineHints = searchEngine === "bing"
      ? "Оптимизируй под Bing: точные вхождения ключей в первых 100 словах, в H1, в H2. Короче чем для Google (1000-1500 слов на страницу)."
      : searchEngine === "google"
      ? "Оптимизируй под Google: E-E-A-T сигналы, глубокий контент (2000-3000 слов), LSI-ключи, естественный язык."
      : "Универсальный контент для обоих поисковиков.";

    const langMap: Record<string, string> = {
      en: "English", fr: "French", de: "German", sv: "Swedish",
      no: "Norwegian", da: "Danish", ja: "Japanese",
    };

    const content: Record<string, string> = {};

    for (const pageId of pages) {
      const userPrompt = `Сгенерируй контент для страницы "${pageLabels[pageId] || pageId}" монобренд-сайта.

Бренд: ${brand}
Официальный сайт: ${officialUrl || "не указан"}
Гео: ${geo?.toUpperCase()}
Язык контента: ${langMap[language] || "English"}
Поисковик: ${searchEngine}
${engineHints}

Тип страницы: ${pageLabels[pageId]}

Требования:
- Контент от лица бренда (это "наш" сайт)
- HTML-разметка (h2, h3, p, ul, table, details для FAQ)
- CTA-кнопки после ключевых секций
- Конкретика (не общие слова)
- Закрывай поисковый интент для запроса "${brand} ${pageId === 'home' ? '' : pageLabels[pageId]?.toLowerCase()}"

Выдай ТОЛЬКО HTML-контент, без пояснений.`;

      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 3000,
        temperature: 0.7,
      });

      content[pageId] = completion.choices[0]?.message?.content || `<h2>${brand} — ${pageLabels[pageId]}</h2><p>Контент не сгенерирован</p>`;
    }

    return NextResponse.json({ success: true, content });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
