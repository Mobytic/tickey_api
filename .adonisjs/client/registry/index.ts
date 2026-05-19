/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/v1/auth/register',
    tokens: [{"old":"/api/v1/auth/register","type":0,"val":"api","end":""},{"old":"/api/v1/auth/register","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/register","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/profile',
    tokens: [{"old":"/api/v1/auth/profile","type":0,"val":"api","end":""},{"old":"/api/v1/auth/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/profile","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['auth.show']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'tickets.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tickets',
    tokens: [{"old":"/api/v1/tickets","type":0,"val":"api","end":""},{"old":"/api/v1/tickets","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets","type":0,"val":"tickets","end":""}],
    types: placeholder as Registry['tickets.index']['types'],
  },
  'tickets.create': {
    methods: ["POST"],
    pattern: '/api/v1/tickets/create',
    tokens: [{"old":"/api/v1/tickets/create","type":0,"val":"api","end":""},{"old":"/api/v1/tickets/create","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets/create","type":0,"val":"tickets","end":""},{"old":"/api/v1/tickets/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['tickets.create']['types'],
  },
  'tickets.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tickets/:id',
    tokens: [{"old":"/api/v1/tickets/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tickets/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets/:id","type":0,"val":"tickets","end":""},{"old":"/api/v1/tickets/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tickets.show']['types'],
  },
  'tickets.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/tickets/:id',
    tokens: [{"old":"/api/v1/tickets/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tickets/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tickets/:id","type":0,"val":"tickets","end":""},{"old":"/api/v1/tickets/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tickets.update']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
