export interface JwtPayload {
  id: string;
}

export interface IJwt {
  encrypt: (payload: JwtPayload, timeToExpire?: string) => string;
}
