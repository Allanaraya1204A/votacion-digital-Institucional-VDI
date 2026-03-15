export interface User {
    id: number;
  nombre: string;
  email: string;
 rol_id: number;
}
export interface DeleteUserResponse {
  success: boolean;
  message: string;
  data: { id: number; nombre: string };
}

export interface UpdateUser {
  id: number;
    nombre: string;
    email: string;
    rol_id: number;
}