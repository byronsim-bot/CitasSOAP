export interface Medico {
  idMedico: number;
  cedula: string;
  nombre: string;
  apellido: string;
  cargo: string;
  especialidad: string;
}

export interface NuevoMedico {
  cedula: string;
  nombre: string;
  apellido: string;
  cargo: string;
  especialidad: string;
}