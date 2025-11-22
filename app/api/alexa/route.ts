import { NextRequest, NextResponse } from 'next/server';
import { SkillBuilders } from 'ask-sdk-core';
import { SELECTED_VOICES, SYSTEM_PROMPT, SUMMARY_PROMPT, EXIT_LINES, REPROMPT_LINES, LAUNCH_GREETINGS } from './constants';
import { generateContent } from '@/lib/gemini';
import { getOrCreateUser, createMemory, getAllSummaries, getMessages, createMessage } from '@/lib/db';

async function generateAndStoreSummary(userId: string, sessionId: string) {
  try {
    const messages = await getMessages(sessionId, userId);
    if (messages.length === 0) return;
    
    const conversationHistory = messages
      .map(msg => `${msg.actor}: ${msg.text}`)
      .join('\n');
    
    const prompt = SUMMARY_PROMPT.replace('{conversation}', conversationHistory);
    const summary = await generateContent(prompt);
    
    if (summary && summary.trim() !== 'NO_DETAILS') {
      await createMemory(userId, sessionId, summary);
      console.log('Summary stored:', summary);
    }
  } catch (error) {
    console.error('Failed to generate summary:', error);
  }
}

function getRandomExitLine(): string {
  return EXIT_LINES[Math.floor(Math.random() * EXIT_LINES.length)];
}

function getRandomReprompt(): string {
  return REPROMPT_LINES[Math.floor(Math.random() * REPROMPT_LINES.length)];
}

function getRandomLaunchGreeting(): string {
  return LAUNCH_GREETINGS[Math.floor(Math.random() * LAUNCH_GREETINGS.length)];
}

function cleanSSML(text: string): string {
  // Remove markdown code blocks and extra wrapper tags
  let cleaned = text
    .replace(/```xml\n?/g, '')
    .replace(/```\n?/g, '')
    .replace(/^\s*<speak>\s*/i, '')
    .replace(/\s*<\/speak>\s*$/i, '')
    .trim();
  
  // Return just the inner SSML content
  return cleaned;
}

const LaunchRequestHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: any) {
    return handlerInput.responseBuilder
      .speak(getRandomLaunchGreeting())
      .reprompt(getRandomReprompt())
      .getResponse();
  }
};

const LilithSpeakHandler = {
  canHandle(handlerInput: any) {
    const request = handlerInput.requestEnvelope.request;
    if (request.type !== 'IntentRequest') return false;
    
    // Handle multiple conversation intents
    const conversationIntents = [
      'LilithSpeak',
      'GreetingIntent',
      'CasualTalkIntent',
      'AffectionIntent'
    ];
    
    return conversationIntents.includes(request.intent.name);
  },
  async handle(handlerInput: any) {
    const request = handlerInput.requestEnvelope.request;
    const slots = request.intent.slots;
    
    // Extract user input from different slot types
    const slotValue = slots?.speak?.value || 
                      slots?.query?.value || 
                      slots?.message?.value;

    const rawUtterance = request.intent?.rawUtterance || '';
    let userInput = rawUtterance || slotValue || request.intent.name;

    console.log('User:', userInput);
    const userId = handlerInput.requestEnvelope.session.user.userId;
    const sessionId = handlerInput.requestEnvelope.session.sessionId;
    
    await getOrCreateUser(userId);
    
  
    const summaries = await getAllSummaries(userId);
    const messages = await getMessages(sessionId, userId);
    const conversationHistory = messages
      .map(msg => `${msg.actor}: ${msg.text}`)
      .join('\n');
    
    const summariesText = summaries
      .map(s => s.summary)
      .join('\n');
    
    const prompt = `${SYSTEM_PROMPT}

Past Summaries:
${summariesText || 'None'}

Current Conversation:
${conversationHistory}
me: ${userInput}

Generate Lilith's response:`;

    const geminiResponse = await generateContent(prompt);
    
    await createMessage(sessionId, userId, userInput || '', 'me');
    await createMessage(sessionId, userId, geminiResponse || '', 'lilith');
    
    const cleanedResponse = cleanSSML(geminiResponse || '');
    
    return handlerInput.responseBuilder
      .speak(cleanedResponse)
      .reprompt(getRandomReprompt())
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
      .speak('You can ask me to say anything. For example, just say hello or say I love you.')
      .reprompt(getRandomReprompt())
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  async handle(handlerInput: any) {
    const userId = handlerInput.requestEnvelope.session.user.userId;
    const sessionId = handlerInput.requestEnvelope.session.sessionId;
    
    await generateAndStoreSummary(userId, sessionId);
    
    return handlerInput.responseBuilder
      .speak(getRandomExitLine())
      .getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
  },
  async handle(handlerInput: any) {
    const userId = handlerInput.requestEnvelope.session.user.userId;
    const sessionId = handlerInput.requestEnvelope.session.sessionId;
    
    await generateAndStoreSummary(userId, sessionId);
    
    return handlerInput.responseBuilder
      .speak(getRandomExitLine())
      .getResponse();
  }
};

const DebugIntentHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest';
  },
  async handle(handlerInput: any) {
    const userId = handlerInput.requestEnvelope.session.user.userId;
    const sessionId = handlerInput.requestEnvelope.session.sessionId;
    
    await generateAndStoreSummary(userId, sessionId);
    
    return handlerInput.responseBuilder
      .speak(getRandomExitLine())
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput: any) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  async handle(handlerInput: any) {
    console.log('Session ended with reason:', handlerInput.requestEnvelope.request.reason);
    
    const userId = handlerInput.requestEnvelope.session.user.userId;
    const sessionId = handlerInput.requestEnvelope.session.sessionId;
    
    await generateAndStoreSummary(userId, sessionId);
    
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  async handle(handlerInput: any, error: any) {
    console.log('Error handled:', error.message);
    
    try {
      const userId = handlerInput.requestEnvelope.session?.user?.userId;
      const sessionId = handlerInput.requestEnvelope.session?.sessionId;
      
      if (userId && sessionId) {
        await generateAndStoreSummary(userId, sessionId);
      }
    } catch (e) {
      console.error('Failed to store summary in error handler:', e);
    }
    
    return handlerInput.responseBuilder
      .speak(getRandomExitLine())
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
    SessionEndedRequestHandler,
    DebugIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();

function verifyAlexaRequest(request: any): boolean {
  if (!request.version || !request.session || !request.request) {
    return false;
  }

  const validRequestTypes = [
    'LaunchRequest',
    'IntentRequest',
    'SessionEndedRequest'
  ];

  if (!validRequestTypes.includes(request.request.type)) {
    return false;
  }
  if (!request.session.user || !request.session.user.userId) {
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  const alexaRequest = await request.json();
  console.log('Alexa request received:', JSON.stringify(alexaRequest, null, 2));

  if (!verifyAlexaRequest(alexaRequest)) {
    console.error('Invalid Alexa request structure');
    return NextResponse.json(
      { error: 'Invalid request. This endpoint only accepts Alexa requests.' },
      { status: 403 }
    );
  }

  try {
    const response = await skill.invoke(alexaRequest);
    console.log('Alexa response:', JSON.stringify(response, null, 2));
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error invoking skill:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}