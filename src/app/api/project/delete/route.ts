import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services/project'

export async function POST(request: NextRequest) {
  try {
    const { project_id } = await request.json()
    const accessToken = request.cookies.get('access_token')?.value

    if(!project_id || !accessToken) {
      return NextResponse.json({
        success:false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }

    await ProjectService.deleteProject({project_id, accessToken})
    return NextResponse.json({ success: true }, {status:200})

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 })
  }
}