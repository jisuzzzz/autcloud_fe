import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if(!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing'
      }, {status: 400})
    }

    const userSignInData = {
      email,
      password
    }

    const response = await fetch('http://64.176.217.21:80/command_server/api/v1/external/auth/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userSignInData)
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