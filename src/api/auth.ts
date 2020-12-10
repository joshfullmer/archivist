import axios from 'axios'

import { useAppState } from '../state/app.state'

const { setJwt } = useAppState()

export const login = async (username: string, password: string): Promise<void> => {
  const { data } = await axios.post('http://localhost:4000/login', {
    username,
    password
  })

  setJwt(data.jwt)
}
