export type SignUpRequest = {
  username: string;
  email: string;
  name: string;
  password: string;
};

export type SignInRequest = {
  username_or_email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: {
    email: string;
    id: number;
    name: string;
    username: string;
  };
};

export type SignUpResponse = {
  message: string;
};

export type MeResponse = {
  email: string;
  id: number;
  name: string;
  username: string;
};

export type UpdateMeRequest = {
  email: string;
  name: string;
  old_password: string;
  new_password: string;
};

export type UpdateMeResponse = {
  email: string;
  id: number;
  name: string;
  username: string;
};
