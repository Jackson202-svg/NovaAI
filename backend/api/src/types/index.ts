export type UserRole = 'user' | 'admin' | 'support';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
