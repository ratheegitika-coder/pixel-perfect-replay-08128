import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DEMO_PLACES, INTERESTS, type Place } from "./places";
import { recommendLocal } from "./planner";

const prefsSchema = z.object({
  location: z.string().min(1).max(120),
  interests: z.array(z.enum(INTERESTS)).max(5),
  hours: z.number().min(1).max(16),
  budget: z.number().min(0).max(100000),
});

const str = { type: "string" } as const;
const num = { type: "number" } as const;
const PLACES_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["places"],
  properties: {
    places: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "category", "description", "whyVisit", "gemScore", "cost", "duration", "lat", "lng", "history", "significance", "fact", "whyMatters", "notice"],
        properties: {
          name: str, category: { type: "string", enum: [...INTERESTS] }, description: str, whyVisit: str,
          gemScore: num, cost: num, duration: num, lat: num, lng: num,
          history: str, significance: str, fact: str, whyMatters: str, notice: str,
        },
      },
    },
  },
};

async function askModel(prompt: string, json = false): Promise<string> {
  const { generateResponse } = await import("@lovable.dev/ai-gateway");
  const res = await generateResponse({
    model: "openai/gpt-6-astra",
    input: prompt,
    reasoning: { effort: "low" },
    ...(json ? { text: { format: { type: "json_schema" as const, name: "places", strict: true, schema: PLACES_SCHEMA } } } : {}),
  });
  let text = "";
  for (const item of res.output ?? []) {
    if (item.type === "message") {
      for (const c of item.content) if (c.type === "output_text") text += c.text;
    }
  }
  return text;
}

export const discoverPlaces = createServerFn({ method: "POST" })
  .inputValidator((d) => prefsSchema.parse(d))
  .handler(async ({ data }): Promise<{ places: Place[]; source: "ai" | "demo" }> => {
    const fallback = () => ({ places: recommendLocal(DEMO_PLACES, data), source: "demo" as const });
    try {
      const prompt = `You are LocalLens, a local tourism expert. Recommend exactly 5 real, lesser-known (hidden gem) places in or near "${data.location}" for a traveller interested in ${data.interests.join(", ") || "anything local"}, with ${data.hours} hours and a budget of ${data.budget} INR per person total. Avoid the top-3 famous landmarks.
Return JSON {"places": [...]} with 5 objects with keys: name, category (one of ${INTERESTS.join("|")}), description (1 sentence), whyVisit (1 sentence), gemScore (0-100, higher = more hidden), cost (INR number), duration (minutes number), lat, lng (numbers), history, significance, fact, whyMatters, notice (each 1-2 sentences).`;
      const text = await askModel(prompt, true);
      const parsed = JSON.parse(text) as { places?: unknown };
      const raw = z
        .array(
          z.object({
            name: z.string(), category: z.enum(INTERESTS).catch("Culture"), description: z.string(), whyVisit: z.string(),
            gemScore: z.coerce.number(), cost: z.coerce.number(), duration: z.coerce.number(), lat: z.coerce.number(), lng: z.coerce.number(),
            history: z.string(), significance: z.string(), fact: z.string(), whyMatters: z.string(), notice: z.string(),
          }),
        )
        .parse(parsed.places);
      if (raw.length === 0) return fallback();
      return {
        source: "ai",
        places: raw.slice(0, 5).map((p, i) => ({
          ...p,
          id: `ai-${i}-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          gemScore: Math.max(0, Math.min(100, Math.round(p.gemScore))),
        })),
      };
    } catch (e) {
      console.error("AI discovery failed, using demo data", e);
      return fallback();
    }
  });

export const askAboutPlace = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ place: z.string().max(200), context: z.string().max(3000), question: z.string().min(1).max(500) }).parse(d))
  .handler(async ({ data }): Promise<{ answer: string }> => {
    try {
      const answer = await askModel(
        `You are LocalLens, a warm local guide. Place: ${data.place}. Known info: ${data.context}\nAnswer briefly (max 90 words): ${data.question}`,
      );
      return { answer: answer.trim() || "I couldn't find an answer right now." };
    } catch (e) {
      console.error(e);
      return { answer: `AI is unavailable right now. Here's what we know: ${data.context.slice(0, 300)}` };
    }
  });
