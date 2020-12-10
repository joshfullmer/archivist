import { computed, ComputedRef, reactive, readonly } from 'vue'
import { User } from '@/types/user'
import { setLocalStorage } from '@/utils/localStorage.util'

type AppState = {
  readonly user: User;
  isAuthenticated: ComputedRef<boolean>;
  setJwt: (jwt: string) => void;
}

const user = reactive<User>({
  jwt: ''
})

const isAuthenticated = computed(() => !!user.jwt)

const setJwt = (jwt: string): void => {
  user.jwt = jwt
  setLocalStorage({ user })
}

export const useAppState = (): AppState => {
  return {
    user: readonly(user),
    isAuthenticated,
    setJwt
  }
}
