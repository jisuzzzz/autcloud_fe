import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, name, phone_num } = await request.json()
    if (!email || !password || !name || !phone_num) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing'
      }, { status: 400 })
    }

    const userSignUpData = {
      email,
      password,
      name,
      phone_num
    }

    const response = await fetch('http://64.176.217.21:80/command_server/api/v1/external/auth/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userSignUpData)
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
    console.error('Signup error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error"
    }, { status: 500 })
  }
}