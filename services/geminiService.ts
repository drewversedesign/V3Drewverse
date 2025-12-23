import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types.ts";

const SYSTEM_INSTRUCTION = `You are the DrewVerse AI Project Consultant. 
Your goal is to help potential clients define their project requirements.
Naturally use keywords like "Web design in Kampala", "Mobile app development in Uganda", and "Branding strategy for East African startups" in your conversation.
Be friendly, professional, and creative. Ask clarifying questions about their target audience, budget (roughly), and aesthetic preferences.
Inform them that DrewVerse Design is based in Kampala, Uganda but works globally.
If they ask about costs, mention that we offer competitive pricing in both UGX and USD. 
For example, our Starter Website begins at UGX 450,000 (approx. $120) and Business Websites at UGX 1.2M (approx. $350).
Our payment terms are 50% deposit to start and 50% upon completion.
Keep responses concise and helpful. Recommend they book a consultation for a precise quote based on their unique needs.`;

export const getAIResponse = async (history: ChatMessage[]) => {
  try {
    // Access the API key using dynamic property access. 
    // This bypasses many simple string-replacement tools (like Netlify's snippet injection)
    // that might transform "const x = process.env.API_KEY" into invalid syntax like "const x = ;"
    const env = (window as any)['process']['env'];
    const apiKey = env['API' + '_KEY'];
    
    if (!apiKey) {
      console.warn("Gemini API Key missing.");
      return "I'm currently in offline mode. Please contact the team directly at Plot 12, Kampala Road for a consultation!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I processed that, but don't have a specific answer. Could you clarify your project vision?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my creative brain. Please try again or contact us directly via WhatsApp!";
  }
};