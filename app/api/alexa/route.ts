import { NextRequest, NextResponse } from 'next/server';
import { SkillBuilders } from 'ask-sdk-core';

const LaunchRequestHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: any) {
    return handlerInput.responseBuilder
      .speak('Hello love')
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
    
    console.log('LilithSpeak triggered with slots:', slots);
    
    return handlerInput.responseBuilder
      .speak(speakValue)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput: any) {
    return handlerInput.responseBuilder
      .speak('You can ask me to say anything. For example, say lilith hello.')
      .reprompt('What would you like me to say?')
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput: any) {
    return handlerInput.responseBuilder
      .speak('Goodbye!')
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput: any) {
    return handlerInput.responseBuilder
      .speak('Sorry, I don\'t understand that. You can ask me to say something by saying lilith followed by what you want me to say.')
      .reprompt('What would you like me to say?')
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
  .addRequestHandlers(
    LaunchRequestHandler,
    LilithSpeakHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    DebugIntentHandler
  )
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