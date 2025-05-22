import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/services/project'

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value
    
    if(!accessToken) {
      return NextResponse.json({
        success:false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }

    const public_key = await ProjectService.getPublicKey(accessToken)
    return NextResponse.json({ success: true, public_key }, {status:200})

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 })
  }
}