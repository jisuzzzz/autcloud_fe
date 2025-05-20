import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('access_token')?.value
    const project_id = request.url.split('/project/')[1]

    if (!accessToken || !project_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing fields' }),
        { status: 400 }
      )
    }
    
    const response = await fetch(
      `http://64.176.217.21:80/command_server/api/v1/external/project/${project_id}/session`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'text/event-stream'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`)
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })

  } catch (err) {
    console.error('SSE Setup error:', err)
    return new Response(
      JSON.stringify({ error: 'Failed to setup SSE connection' }), 
      { status: 500 }
    )
  }
}