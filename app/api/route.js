import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/model/TodoModel';
import { NextResponse } from 'next/server';

const LoadDb = async () => {
  await connectDB();
};

LoadDb();

export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos });
}

export async function POST(request) {
  const { title, description } = await request.json();

  await TodoModel.create({
    title,
    description,
  });
  return NextResponse.json({ msg: 'Todo Created' });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const mongoId = url.searchParams.get('mongoId');

  if (!mongoId) {
    return NextResponse.json({ msg: 'MongoID is required' }, { status: 400 });
  }

  try {
    await TodoModel.findByIdAndDelete(mongoId);
    return NextResponse.json({ msg: 'Todo Deleted' });
  } catch (error) {
    return NextResponse.json(
      { msg: 'Error deleting Todo', error },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const url = new URL(request.url);
  const mongoId = url.searchParams.get('mongoId');

  if (!mongoId) {
    return NextResponse.json({ msg: 'MongoID is required' }, { status: 400 });
  }

  try {
    await TodoModel.findByIdAndUpdate(mongoId, {
      $set: {
        isCompleted: true,
      },
    });
    return NextResponse.json({ msg: 'Todo Updated' });
  } catch (error) {
    return NextResponse.json(
      { msg: 'Error Updating Todo', error },
      { status: 500 }
    );
  }
}
