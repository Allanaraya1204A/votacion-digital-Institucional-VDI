export interface mesas {
    id: number;
    nombre: string;
    descripcion: string;
    activa: boolean;
}

export interface responseDeleteMesa {
    success: boolean;
    message: string;
    data: { id: number; nombre: string };
}