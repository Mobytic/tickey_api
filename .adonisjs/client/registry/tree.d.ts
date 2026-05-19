/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    show: typeof routes['auth.show']
    logout: typeof routes['auth.logout']
  }
  tickets: {
    index: typeof routes['tickets.index']
    create: typeof routes['tickets.create']
    show: typeof routes['tickets.show']
    update: typeof routes['tickets.update']
  }
}
