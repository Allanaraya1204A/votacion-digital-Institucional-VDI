export interface Candidate {
    id: number;
    eleccion_id: number;
    nombre: string;
    descripcion: string;
    imagen_url: string;
}

export interface deleteresponse {
    success: boolean;
    message: string;
    data: { id: number; nombre: string };

}