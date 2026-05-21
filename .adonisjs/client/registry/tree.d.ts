/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    show: typeof routes['auth.show']
    logout: typeof routes['auth.logout']
    update: typeof routes['auth.update']
  }
  tickets: {
    index: typeof routes['tickets.index']
    create: typeof routes['tickets.create']
    show: typeof routes['tickets.show']
    update: typeof routes['tickets.update']
  }
  categories: {
    index: typeof routes['categories.index']
    create: typeof routes['categories.create']
    update: typeof routes['categories.update']
    delete: typeof routes['categories.delete']
  }
}
