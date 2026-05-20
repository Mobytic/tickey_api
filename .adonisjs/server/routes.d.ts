import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.show': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.create': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'tickets.create': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.show': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'auth.show': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'auth.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}