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

    const response = await fetch('http://64.176.217.21:80/command_server/api/v1/external/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userSignInData)
    })
    
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: "External API error"
      }, { status: response.status })
    }
    
    const nextResponse = NextResponse.json({ success: true })

    // console.log('Setting cookies with:', {
    //   access_token: data.access_token,
    //   refresh_token: data.refresh_token
    // });

    nextResponse.cookies.set({
      name: 'access_token',
      value: data.access_token,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/'
    })

    nextResponse.cookies.set({
      name: 'refresh_token',
      value: data.refresh_token,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/'
    })
    // console.log('response headers:', {
    //   cookies: nextResponse.cookies.getAll()
    // });
    return nextResponse

  } catch (error) {
    console.error('SignIn error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error"
    }, { status: 500 })
  }
}