import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.index': { paramsTuple?: []; params?: {} }
    'auth.show': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.website_index': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.create': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ticket_statuses.index': { paramsTuple?: []; params?: {} }
    'ticket_statuses.create': { paramsTuple?: []; params?: {} }
    'ticket_statuses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ticket_statuses.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'nametags.index': { paramsTuple?: []; params?: {} }
    'nametags.create': { paramsTuple?: []; params?: {} }
    'nametags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'nametags.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'tickets.create': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'ticket_statuses.create': { paramsTuple?: []; params?: {} }
    'nametags.create': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.index': { paramsTuple?: []; params?: {} }
    'auth.show': { paramsTuple?: []; params?: {} }
    'auth.website_index': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'ticket_statuses.index': { paramsTuple?: []; params?: {} }
    'nametags.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.index': { paramsTuple?: []; params?: {} }
    'auth.show': { paramsTuple?: []; params?: {} }
    'auth.website_index': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'ticket_statuses.index': { paramsTuple?: []; params?: {} }
    'nametags.index': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'auth.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ticket_statuses.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'nametags.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'categories.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ticket_statuses.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'nametags.delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}