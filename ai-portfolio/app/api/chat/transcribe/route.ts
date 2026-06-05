import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    
    const response = await groq.audio.transcriptions.create({
      file: file,
      model: 'whisper-large-v3', // Groq's ultra-fast voice model
      response_format: 'json',
    });

    
    return NextResponse.json({ text: response.text });
    
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}