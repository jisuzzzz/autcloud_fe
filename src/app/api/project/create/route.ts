import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services/project'

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json()
    const accessToken = request.cookies.get('access_token')?.value

    if(!name || !description || !accessToken) {
      return NextResponse.json({
        success:false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }

    const res =  await ProjectService.createProject({name, description, accessToken})
    return NextResponse.json({ success: true, project_id: res.project_id}, {status:200})

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 })
  }
}