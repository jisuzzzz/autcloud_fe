import { NextResponse } from 'next/server'
import { ProjectService } from '@/services/project'

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json()

    if(!name || !description) {
      return NextResponse.json({
        success:false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }

    await ProjectService.createProject({name, description})
    return NextResponse.json({ success: true }, {status:200})

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 })
  }
}