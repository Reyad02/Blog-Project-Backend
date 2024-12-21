export type TError = {
  path: string | number;
  message: string;
}[];

export type TGenericError = {
  statusCode: number;
  error: TError;
  message: string;
};
