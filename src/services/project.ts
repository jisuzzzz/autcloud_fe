import { CommandList } from "@/types/type"

interface CreateProjectData {
  name: string
  description: string
  accessToken: string
}

interface DeleteProjectData {
  project_id:string
  accessToken: string
}

interface KickMemberData {
  project_id:string
  email:string
  accessToken: string
}

interface AssginRoleData {
  invitee_email: string
  project_id: string
  role:string
  accessToken: string
}

interface DeployData {
  project_id: string,
  commandList: CommandList,
  accessToken: string,
}

interface SendVultrApiKeyData {
  project_id: string,
  api_key: any
  accessToken: string
}


export class ProjectService {
  private static API_URL = 'http://64.176.217.21:80/command_server/api/v1/external/project'

  static async createProject(data: CreateProjectData) {
    const { accessToken, ...projectData } = data
    const response = await fetch(`${this.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(projectData)
    })

    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }

  static async deleteProject(data: DeleteProjectData) {
    const { accessToken, project_id } = data
    const response = await fetch(`${this.API_URL}/${project_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })

    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }

  static async kickMember(data: KickMemberData) {
    const { accessToken, project_id, email } = data
    const response = await fetch(`${this.API_URL}/${project_id}/member/${email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })

    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }
  
  static async assignRole(data: AssginRoleData) {
    const { accessToken, ...assignData } = data
    const response = await fetch(`${this.API_URL}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(assignData)
    })
    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }

  static async deployCommand(data: DeployData) {
    const { accessToken, ...deployData } = data
    const response = await fetch(`${this.API_URL}/deploy`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(deployData)
    }) 
    if(!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }

  static async getPublicKey(accessToken: string) {
    const response = await fetch(`${this.API_URL}/public-key`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })
    if(!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }

  static async sendVultrApiKey(data: SendVultrApiKeyData) {
    const { accessToken, api_key, project_id } = data

    let apiKeyArray: number[]
    if (typeof api_key === 'object' && api_key !== null && 'data' in api_key && Array.isArray(api_key.data)) {
      // Handle Buffer-like object format
      apiKeyArray = api_key.data
    } else if (Array.isArray(api_key)) {
      // Handle direct array input
      apiKeyArray = api_key
    } else {
      throw new Error("Invalid api_key format")
    }

    const response = await fetch(`${this.API_URL}/vultr-api-key`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        api_key: apiKeyArray,
        project_id
      })
    })
    console.log(response)
    if(!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }
}