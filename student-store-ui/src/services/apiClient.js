import axios from "axios"

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.token = null
    this.tokenName = "student_store_token"
  }

  setToken(token) {
    this.token = token
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`

    const headers = {
      "Content-Type": "application/json",
      Authorization: this.token ? `Bearer ${this.token}` : "",
    }

    try {
      const res = await axios({ url, method, data, headers })
      return { data: res.data, error: null }
    } catch (error) {
      console.error({ errorResponse: error.response })
      const message = error?.response?.data?.error?.message
      return { data: null, error: message || String(error) }
    }
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me/`, method: `GET` })
  }

  async signupUser(credentials) {
    return await this.request({ endpoint: `auth/register/`, method: `POST`, data: credentials })
  }

  async loginUser(credentials) {
    return await this.request({ endpoint: `auth/login/`, method: `POST`, data: credentials })
  }

 async listProducts() {
   return await this.request({ endpoint: `store/`, method: `GET` })
 }

 async createOrder (order) {
   return await this.request({ endpoint: `order/`, method: `POST`, data: order })
 }

  async logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }
}

const apiClient = new ApiClient("http://localhost:3001")

export default apiClient;