import merge from 'lodash.merge'

import { useAppState } from '../state/app.state'

type LocalStorageData = {
  user: {
    jwt: string;
  }
}

export const setLocalStorage = (data: LocalStorageData): void => {
  if (window.localStorage?.archivist) {
    const existingLocalStorage: LocalStorageData = JSON.parse(window.localStorage.archivist)

    const mergedLocalStorage: LocalStorageData = merge(existingLocalStorage, data)

    window.localStorage.setItem('archivist', JSON.stringify(mergedLocalStorage))
  } else {
    window.localStorage.setItem('archivist', JSON.stringify(data))
  }
}

export const loadLocalStorage = (): void => {
  if (window.localStorage?.archivist) {
    const localStorage = JSON.parse(window.localStorage.archivist)

    const { setJwt } = useAppState()

    setJwt(localStorage.user.jwt)
  }
}
