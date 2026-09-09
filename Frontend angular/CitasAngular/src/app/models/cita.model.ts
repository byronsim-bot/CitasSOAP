export interface Cita {
  idCita: number;
  idPaciente: number;
  idMedico: number;
  fecha: string;
  hora: string;
  motivo: string;
  tratamiento: string;
  estado: boolean;
}

export interface NuevaCita {
  idPaciente: number;
  idMedico: number;
  fecha: string;
  hora: string;
  motivo: string;
  tratamiento: string;
  estado: boolean;
}