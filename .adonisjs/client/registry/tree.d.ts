/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      register: typeof routes['auth.auth.register']
    }
  }
}
