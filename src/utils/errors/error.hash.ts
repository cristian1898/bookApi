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
  messageSuccess: () => ({ message: "Not Found", status: statusCode.notFound }),
  notFoundError: () => ({ message: "Not Found", status: statusCode.notFound }),
  internalError: () => ({
    message: "Internal server error",
    status: statusCode.internalError,
  }),
  deleteID: (name: string, id: string) => ({
    message: `${name} with id: ${id} deleted`,
    status: statusCode.ok,
  }),
  updateID: (name: string, id: string) => ({
    message: `${name} with id: ${id} updated`,
    status: statusCode.ok,
  }),
  createdID: (name: string, id: string) => ({
    message: `${name} with id: ${id} created`,
    status: statusCode.created,
  }),
  list: <T>(name: string, data: T) => ({
    message: `Successfully found ${name}s`,
    details: data,
    status: statusCode.ok,
  }),
  listOne: <T>(name: string, id: string, item: T) => ({
    message: `Successfully found ${name} with id: ${id}`,
    status: statusCode.ok,
    details: item,
  }),
};
