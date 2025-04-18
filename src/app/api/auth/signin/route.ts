import { NextResponse } from "next/server";
import { AuthService } from "@/services/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if(!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing'
      }, {status: 400})
    }

    const data = await AuthService.signIn({ email, password })
    
    const nextResponse = NextResponse.json({ success: true })

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

    return nextResponse

  } catch (error) {
    console.error('SignIn error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error"
    }, { status: 500 })
  }
}