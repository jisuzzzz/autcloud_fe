import { NextResponse } from "next/server"
import { AuthService } from "@/services/auth"

export async function POST(request: Request) {
  try {
    const { email, password, name, phone_num } = await request.json()
    if (!email || !password || !name || !phone_num) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing',
      }, {status: 400})
    }
    
    await AuthService.signUp({ email, password, name, phone_num })
    return NextResponse.json({ success: true }, { status:200 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error",
     }, { status: 500 })
  }
}