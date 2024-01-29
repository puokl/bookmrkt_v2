export type RegisterType = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  image?: string;
};

export type LoginType = {
  email: string;
  password: string;
};
