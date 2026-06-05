import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    // Parse the incoming form data containing the audio file
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No audio file provided.' }, { status: 400 });
    }

    // Pass the file directly to Groq's Whisper model
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: 'whisper-large-v3-turbo', // Turbo model is optimized for speed and price
      response_format: 'json',
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error: any) {
    console.error('Error inside transcription route:', error);
    return NextResponse.json(
      { error: 'An internal error occurred while processing the audio.' },
      { status: 500 }
    );
  }
}