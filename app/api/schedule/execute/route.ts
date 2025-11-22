import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { generateContent } from '@/lib/gemini';
import { createMemory } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Verify request is authorized (you can add CRON_SECRET check here)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const scheduledTasksCollection = db.collection('scheduled_tasks');

    // Find tasks that should be executed (time has passed and not yet executed)
    const now = new Date();
    const tasksToExecute = await scheduledTasksCollection
      .find({
        time: { $lte: now },
        executed: false
      })
      .toArray();

    console.log(`Found ${tasksToExecute.length} tasks to execute`);

    const results = [];

    for (const task of tasksToExecute) {
      try {
        let result;

        switch (task.type) {
          case 'send_reminder':
            result = await executeReminder(task);
            break;
          
          case 'generate_summary':
            result = await executeSummary(task);
            break;
          
          case 'cleanup_session':
            result = await executeCleanup(task);
            break;
          
          default:
            result = { error: `Unknown task type: ${task.type}` };
        }

        // Mark task as executed
        await scheduledTasksCollection.updateOne(
          { _id: task._id },
          { 
            $set: { 
              executed: true, 
              executedAt: new Date(),
              result 
            } 
          }
        );

        results.push({
          taskId: task._id,
          type: task.type,
          success: true,
          result
        });

      } catch (error) {
        console.error(`Error executing task ${task._id}:`, error);
        results.push({
          taskId: task._id,
          type: task.type,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      executedCount: results.length,
      results
    });

  } catch (error) {
    console.error('Error executing scheduled tasks:', error);
    return NextResponse.json(
      { error: 'Failed to execute tasks' },
      { status: 500 }
    );
  }
}

async function executeReminder(task: any) {
  // Implement your reminder logic here
  console.log('Executing reminder:', task);
  return { message: 'Reminder sent' };
}

async function executeSummary(task: any) {
  // Generate a summary for the user's sessions
  const userId: string = task.userId;
  const sessionId: string = task.sessionId;
  
  if (!userId || !sessionId) {
    throw new Error('userId and sessionId required for summary generation');
  }

  const prompt = `Generate a brief summary for user ${userId}`;
  const summary = await generateContent(prompt);
  
  await createMemory(userId, sessionId, summary || '');

  return { summary };
}

async function executeCleanup(task: any) {
  // Implement cleanup logic
  console.log('Executing cleanup:', task);
  return { message: 'Cleanup completed' };
}
