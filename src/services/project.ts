interface CreateProjectData {
  name: string
  description: string
  accessToken?: string
}

interface DeleteProjectData {
  project_id:string
  accessToken?: string
}

interface KickMemberData {
  project_id:string
  email:string
  accessToken?: string
}

interface AssginRoleData {
  invitee_email: string
  project_id: string
  role:string
  accessToken?: string
}
// todo: Add error message logging code
export class ProjectService {
  private static API_URL = 'http://64.176.217.21:80/command_server/api/v1/external/project'

  static async createProject(data: CreateProjectData) {
    const { accessToken, ...projectData } = data
    // console.log(data.accessToken)
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
    return response
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
    return response
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
    return response
  }

  // static async createCommandList() {
  //   const { accessToken } = data
  // }

}