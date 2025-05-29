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
  command_list: CommandList,
  accessToken: string,
}

interface SendVultrApiKeyData {
  project_id: string,
  api_key: any
  accessToken: string
}

interface GetArchitectureSuggestionData {
  additional_requirements: string;
  computing_service_model: string;
  instance_requirements: Array<{
    anticipated_rps: number;
    requirements_for_data_processing: string;
    target_stability: string;
  }>;
  location: string;
  service_type: string;
  accessToken: string;
  project_id: string
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
    console.log(response)
    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }

  static async deployCommand(data: DeployData) {
    const { accessToken, ...deployData } = data
    const response = await fetch(`${this.API_URL}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(deployData)
    }) 
    // console.log(response)
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
    console.log(api_key)

    const response = await fetch(`${this.API_URL}/vultr-api-key`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({api_key, project_id})
    })

    if(!response.ok) {
      throw new Error('External API error');
    }
    return response.json();
  }

  static async getArchitectureSuggestion(data: GetArchitectureSuggestionData) {
    const { accessToken, project_id, ...suggestionData } = data
    const response = await fetch(`${this.API_URL}/${project_id}/architecture/suggestion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(suggestionData)
    })

    if (!response.ok) {
      throw new Error('External API error')
    }
    return response.json()
  }
}