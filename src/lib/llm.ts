// ─────────────────────────────────────────────────────────────
// Wrapper simple del proveedor de LLM.
// Por defecto: Groq (OpenAI-compatible, gratis y rápido).
// Aislado aquí para poder cambiar de proveedor sin tocar la demo.
// ─────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class MissingApiKeyError extends Error {
  constructor() {
    super('Falta la variable de entorno GROQ_API_KEY.');
    this.name = 'MissingApiKeyError';
  }
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

/**
 * Envía mensajes al LLM y devuelve el texto de la respuesta.
 * Lee la API key desde el entorno (NUNCA hardcodear).
 */
export async function ask(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  const apiKey = import.meta.env.GROQ_API_KEY ?? process.env.GROQ_API_KEY;
  if (!apiKey) throw new MissingApiKeyError();

  const model = import.meta.env.GROQ_MODEL ?? process.env.GROQ_MODEL ?? DEFAULT_MODEL;

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts.temperature ?? 0.3,
      max_tokens: opts.maxTokens ?? 500,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`El proveedor de IA respondió ${res.status}. ${detail.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}
