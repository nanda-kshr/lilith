import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const alexaRequest = await request.json();
  const response = {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Hello World"
      },
      shouldEndSession: true
    }
  };

  return NextResponse.json(response);
}