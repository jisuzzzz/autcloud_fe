interface CreateProjectData {
  name: string
  description: string
}

export class ProjectService {
  private static API_URL = 'http://64.176.217.21:80/command_server/api/v1/external/project'

  static async createProject(data: CreateProjectData) {
    const response = await fetch(`${this.API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('External API error');
    }
    return response.json()
  }
}