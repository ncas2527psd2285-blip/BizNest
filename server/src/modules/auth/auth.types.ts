export interface RegisterInput {
  name: string;
  email: string;
  password: string;

  businessName: string;
  businessType: string;
}

export interface LoginInput {
  email: string;
  password: string;
}