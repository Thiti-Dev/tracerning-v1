export interface RegisterCredential {
  username: string;
  email: string;
  password: string;
}

export interface ErrorRender {
  email?: boolean | string;
}
