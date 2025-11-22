import { NextRequest, NextResponse } from 'next/server';
import { SkillBuilders } from 'ask-sdk-core';

const LaunchRequestHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: any) {
    return handlerInput.responseBuilder
      .speak('Hello World')
      .getResponse();
  }
};

const LilithSpeakHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LilithSpeak';
  },
  handle(handlerInput: any) {
    const speakValue = handlerInput.requestEnvelope.request.intent.slots?.speak?.value || 'I didn\'t catch that.';
    return handlerInput.responseBuilder
      .speak(speakValue)
      .getResponse();
  }
};

const skill = SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, LilithSpeakHandler)
  .create();

export async function POST(request: NextRequest) {
  const alexaRequest = await request.json();

  try {
    const response = await skill.invoke(alexaRequest);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error invoking skill:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}