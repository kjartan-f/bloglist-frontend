import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {

  const user = await axios.post(baseUrl, credentials)
  console.log(user.data)
  return user.data
}

export default { login }

