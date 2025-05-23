import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services/project'

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value
    const project_id = request.url.split('/')[5]

    if (!project_id || !accessToken) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }

    const suggestionData = await request.json()

    suggestionData.accessToken = accessToken
    suggestionData.project_id = project_id
    // console.log(suggestionData)

    const response = await ProjectService.getArchitectureSuggestion(suggestionData)
    return NextResponse.json({ success: true, response }, { status: 200 })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}