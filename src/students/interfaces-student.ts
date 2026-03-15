export interface Student {
    id: number;
    codigo: string;
    nombres: string; 
    apellidos: string;
    grado: string;
    ya_voto: boolean;
}

export interface CreateStudentDto {
    codigo: string;
    nombres: string; 
    apellidos: string;
    grado: string;
}

export interface DeleteStudentResponse {
    success: boolean;
    message: string;
    data: { id: number; codigo: string };
}

