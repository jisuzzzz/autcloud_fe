import { NextResponse } from "next/server"
import { AuthService } from "@/services/auth"

export async function POST(request: Request) {
  try {
    const { email, verification_code }  = await request.json()

    if(!email || !verification_code) {
      return NextResponse.json({
        success: false,
        error: 'Required fields are missing'
      }, {status:400})
    }

    
    await AuthService.verifyCode({ email, verification_code })
    return NextResponse.json({ success: true }, { status:200 })

  } catch (error) {
    console.log('SignIn error:', error)
    return NextResponse.json({
      success: false,
      error: "Internal API Error"
    }, { status: 500 })
  }
}