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
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    const speakValue = slots?.speak?.value || slots?.greetings?.value || 'I didn\'t catch that.';
    return handlerInput.responseBuilder
      .speak(speakValue)
      .getResponse();
  }
};

const DebugIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest';
  },
  handle(handlerInput: any) {
    const intent = handlerInput.requestEnvelope.request.intent;
    const intentName = intent?.name || 'UnknownIntent';
    const speakSlot = intent?.slots?.speak?.value;
    const reply = speakSlot || `You triggered ${intentName}`;
    return handlerInput.responseBuilder
      .speak(reply)
      .getResponse();
  }
};

const skill = SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, LilithSpeakHandler, DebugIntentHandler)
  .create();

export async function POST(request: NextRequest) {
  const alexaRequest = await request.json();

  // Log the incoming request so you can see intent names and slot payloads
  console.log('Alexa request received:', JSON.stringify(alexaRequest, null, 2));

  try {
    const response = await skill.invoke(alexaRequest);
    // Log the generated response for debugging too
    console.log('Alexa response:', JSON.stringify(response, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error invoking skill:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}