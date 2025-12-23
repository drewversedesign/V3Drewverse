
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting to my creative brain. Please try again or contact us directly via email!";
  }
};
