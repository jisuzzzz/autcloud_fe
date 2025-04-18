import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, verification_code }  = await request.json()

    if(!email || !verification_code) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing'
      }, {status:400})
    }

    const checkVerificationData = {
      email,
      verification_code
    }

    const response = await fetch('http://64.176.217.21:80/command_server/api/v1/external/auth/verification/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(checkVerificationData)
    })

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: "External API error"
      }, { status: response.status })
    }

    return NextResponse.json({
      success: true,
    })

  } catch (error) {
    console.log('SignIn error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error"
    }, { status: 500 })
  }
}