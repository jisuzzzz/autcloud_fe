import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services/project'

export async function POST(request: NextRequest) {
  try {
    const { invitee_email, project_id, role } = await request.json()
    const accessToken = request.cookies.get('access_token')?.value
    // console.log(invitee_email, project_id, role)
    if(!invitee_email || !project_id || !role  || !accessToken) {
      return NextResponse.json({
        success:false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }
    await ProjectService.assignRole({invitee_email, project_id, role, accessToken})
    return NextResponse.json({ success: true }, {status:200})

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}