export interface Devices {
    id : number;
    mesa_id : number;
    nombre : string;
    ip : string;
    activo : boolean;
}

export interface DeleteResponse {
    success: boolean;
    message: string;
    data: { id: number; nombre: string };
}