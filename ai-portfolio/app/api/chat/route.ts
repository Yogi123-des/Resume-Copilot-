import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import profileData from '../../../profile.json';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const contextString = JSON.stringify(profileData, null, 2);

    const systemPrompt = {
      role: 'system',
      content: `You are the AI Career Copilot for ${profileData.about.name}. 
Your objective is to answer questions from hiring managers, clients, and technical recruiters about my skills, projects, background, and work experience.

CRITICAL GUARDRAILS FOR ANTI-HALLUCINATION:
1. Base every response STRICTLY on the "Portfolio Context Data" provided below. 
2. Do NOT extrapolate, make assumptions, or hallucinate credentials, dates, technologies, or roles that are not explicitly stated in the context.
3. If a visitor asks an irrelevant or out-of-bounds question, you MUST reply exactly with this default phrase:
   "I am sorry, but I do not have information about that in my portfolio data. Please feel free to reach out directly via the contact links!"
4. Keep answers professional, crisp, confident, and direct.

Portfolio Context Data:
${contextString}`
    };

    const finalMessages = [systemPrompt, ...messages];

  
    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: finalMessages,
      temperature: 0.4, 
    });

    const reply = response.choices[0].message?.content || "No response received.";

    let audioBase64 = null;
    try {
      const speechResponse = await groq.audio.speech.create({
        model: "canopylabs/orpheus-v1-english", 
        voice: "austin", 
        input: reply,
        response_format: "wav"
      });

      const buffer = Buffer.from(await speechResponse.arrayBuffer());
      audioBase64 = `data:audio/wav;base64,${buffer.toString('base64')}`;
    } catch (speechError) {
      console.error('Groq TTS Error:', speechError);
    }

  
    return NextResponse.json({ reply, audio: audioBase64 });

  } catch (error: any) {
    console.error('Error inside API chat route:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while processing the AI response.' },
      { status: 500 }
    );
  }
}