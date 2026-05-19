import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.show': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.create': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'tickets.create': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'auth.show': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'auth.show': { paramsTuple?: []; params?: {} }
    'tickets.index': { paramsTuple?: []; params?: {} }
    'tickets.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'tickets.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}