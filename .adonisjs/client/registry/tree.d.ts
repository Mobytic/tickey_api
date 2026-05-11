/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      register: typeof routes['auth.auth.register']
      login: typeof routes['auth.auth.login']
    }
  }
  profile: {
    auth: {
      show: typeof routes['profile.auth.show']
      logout: typeof routes['profile.auth.logout']
    }
  }
}
