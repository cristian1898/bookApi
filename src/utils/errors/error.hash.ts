const statusCode = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  expired: 410,
  ok: 200,
  created: 201,
  noContent: 204,
  internalError: 500,
};

export const MessagesError = {
  messageSuccess: () => ({
    message: "Existo en la operacion",
    status: statusCode.ok,
  }),
  notDeleteError: () => ({
    message: "El author no tiene libros asociados",
    status: statusCode.unauthorized,
  }),
  notFoundErrorUser: () => ({
    message: "email o name ya existe",
    status: statusCode.badRequest,
  }),
  notFoundError: () => ({
    message: "Operacion no efectuada",
    status: statusCode.notFound,
  }),
  internalError: () => ({
    message: "Error interno del servidor",
    status: statusCode.internalError,
  }),
  deleteID: (name: string, id: string) => ({
    message: `${name} con id: ${id} eliminado`,
    status: statusCode.ok,
  }),
  updateID: (name: string, id: string) => ({
    message: `${name} con id: ${id} actulizado`,
    status: statusCode.ok,
  }),
  createdID: (name: string, id: string) => ({
    message: `${name} con id: ${id} creado`,
    status: statusCode.created,
  }),
  list: <T>(name: string, data: T) => ({
    message: `Encontrada la lista de ${name}s`,
    details: data,
    status: statusCode.ok,
  }),
  listOne: <T>(name: string, id: string, item: T) => ({
    message: `Encontrado el recuros  ${name} con  id: ${id}`,
    status: statusCode.ok,
    details: item,
  }),
  count: <T>(name: string, data: T) => ({
    message: `Exito al contar los ${name}s`,
    details: data,
    status: statusCode.ok,
  }),
};
