import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

interface ScheduledTask {
  time: Date;
  type: string;
  userId?: string;
  sessionId?: string;
  executed: boolean;
  createdAt: Date;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { time, type, userId, sessionId } = body;

    if (!time || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: time, type' },
        { status: 400 }
      );
    }

    const scheduledTime = new Date(time);
    
    if (isNaN(scheduledTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid time format. Use ISO 8601 format (e.g., 2025-11-23T15:30:00Z)' },
        { status: 400 }
      );
    }

    if (scheduledTime <= new Date()) {
      return NextResponse.json(
        { error: 'Scheduled time must be in the future' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const scheduledTasksCollection = db.collection<ScheduledTask>('scheduled_tasks');

    const task: ScheduledTask = {
      time: scheduledTime,
      type,
      userId,
      sessionId,
      executed: false,
      createdAt: new Date()
    };

    const result = await scheduledTasksCollection.insertOne(task);

    return NextResponse.json({
      success: true,
      taskId: result.insertedId,
      scheduledFor: scheduledTime.toISOString(),
      type
    });

  } catch (error) {
    console.error('Error scheduling task:', error);
    return NextResponse.json(
      { error: 'Failed to schedule task' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const db = await getDatabase();
    const scheduledTasksCollection = db.collection<ScheduledTask>('scheduled_tasks');

    const filter: any = { executed: false };
    if (userId) {
      filter.userId = userId;
    }

    const tasks = await scheduledTasksCollection
      .find(filter)
      .sort({ time: 1 })
      .toArray();

    return NextResponse.json({ tasks });

  } catch (error) {
    console.error('Error fetching scheduled tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}
