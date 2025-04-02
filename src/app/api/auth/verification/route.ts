import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email }  = await request.json()

    if(!email) {
      return NextResponse.json({
        success: false,
        error: 'Required field is missing'
      }, {status:400})
    }

    const response = await fetch('http://64.176.217.21:80/command_server/api/v1/external/auth/verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(email)
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
    console.error('SignIn error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error"
    }, { status: 500 })
  }
}