interface SignUpData {
  email: string
  password: string
  name: string
  phone_num: string
}

interface SignInData {
  email: string
  password: string 
}

interface VerificationData {
  email: string
  verification_code: string
}

export class AuthService {
  private static API_URL = 'http://64.176.217.21:80/command_server/api/v1/external/auth'

  static async signUp(data: SignUpData){
    const response = await fetch(`${this.API_URL}/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }
  
  static async signIn(data: SignInData){
    const response = await fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }
  
  static async verifyCode(data: VerificationData) {
    const response = await fetch(`${this.API_URL}/verification/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('External API error')
    }
    return response
  }

  static isTokenExpired(token: string): boolean {
    try {
      // atob(): base64 디코딩 함수
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
      // return true
    } catch (error) {
      console.error('Token parsing error:', error)
      return true
    }
  }

  static async refreshToken(refreshToken: string) {
    const response = await fetch(`${this.API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }
    return response.json();
  }

}