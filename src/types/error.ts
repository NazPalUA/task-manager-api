export interface CustomError extends Error {
  status?: number;
  code?: string;
}

export interface ValidationError extends CustomError {
  status: 400;
  field: string;
}

export interface NotFoundError extends CustomError {
  status: 404;
  resource: string;
}
