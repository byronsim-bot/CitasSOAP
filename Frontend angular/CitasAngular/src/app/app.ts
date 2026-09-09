import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { PacienteService } from './services/paciente.services';
import { MedicoService } from './services/medico.services';
import { CitaService } from './services/cita.services';
import { ClimaService } from './services/clima.services';

import {
  Paciente,
  NuevoPaciente
} from './models/paciente.model';

import {
  Medico,
  NuevoMedico
} from './models/medico.model';

import {
  Cita,
  NuevaCita
} from './models/cita.model';

interface ClimaResultado {
  disponible: boolean;
  mensaje?: string;
  fecha?: string;
  temperaturaMax?: number;
  temperaturaMin?: number;
  probabilidadLluvia?: number;
  codigo?: number;
  descripcion?: string;
  recomendacion?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  pacientes: Paciente[] = [];

  nuevoPaciente: NuevoPaciente = {
    cedula: '',
    nombre: '',
    apellido: '',
    telefono: '',
    estado: true
  };

  pacienteEditando: Paciente | null = null;
  errorPacientes = '';

  medicos: Medico[] = [];

  nuevoMedico: NuevoMedico = {
    cedula: '',
    nombre: '',
    apellido: '',
    cargo: '',
    especialidad: ''
  };

  medicoEditando: Medico | null = null;

  citas: Cita[] = [];
  errorCitas = '';

  nuevaCita: NuevaCita = {
    idPaciente: 0,
    idMedico: 0,
    fecha: '',
    hora: '',
    motivo: '',
    tratamiento: '',
    estado: true
  };

  citaEditando: Cita | null = null;

  citaDetalle: Cita | null = null;
  climaDetalle: ClimaResultado | null = null;
  cargandoClimaDetalle = false;
  errorClimaDetalle = '';

  clima: ClimaResultado | null = null;
  cargandoClima = false;
  errorClima = '';

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private citaService: CitaService,
    private climaService: ClimaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarMedicos();
    this.cargarCitas();
  }

  cargarPacientes(): void {
    this.errorPacientes = '';

    this.pacienteService
      .obtenerPacientes()
      .subscribe({
        next: (datos: Paciente[]) => {
          this.pacientes = datos;
          this.cdr.detectChanges();
        },

        error: (error: unknown) => {
          console.error(
            'Error al obtener pacientes :',
            error
          );

          this.errorPacientes =
            'No se pudieron consultar los pacientes .';

          this.cdr.detectChanges();
        }
      });
  }

  agregarPaciente(): void {
    this.nuevoPaciente.cedula =
      this.nuevoPaciente.cedula.trim();

    this.nuevoPaciente.nombre =
      this.nuevoPaciente.nombre.trim();

    this.nuevoPaciente.apellido =
      this.nuevoPaciente.apellido.trim();

    this.nuevoPaciente.telefono =
      this.nuevoPaciente.telefono.trim();

    if (!this.nuevoPaciente.cedula) {
      alert('Ingresa la cédula del paciente');
      return;
    }

    if (!/^\d{10}$/.test(this.nuevoPaciente.cedula)) {
      alert(
        'La cédula del paciente debe tener exactamente 10 dígitos'
      );
      return;
    }

    if (!this.nuevoPaciente.nombre) {
      alert('Ingresa el nombre del paciente');
      return;
    }

    if (!this.nuevoPaciente.apellido) {
      alert('Ingresa el apellido del paciente');
      return;
    }

    if (!this.nuevoPaciente.telefono) {
      alert('Ingresa el teléfono del paciente');
      return;
    }

    if (!/^\d+$/.test(this.nuevoPaciente.telefono)) {
      alert(
        'El teléfono del paciente debe contener únicamente números'
      );
      return;
    }

    this.pacienteService
      .agregarPaciente(this.nuevoPaciente)
      .subscribe({
        next: () => {
          alert(
            'Paciente registrado correctamente '
          );

          this.nuevoPaciente = {
            cedula: '',
            nombre: '',
            apellido: '',
            telefono: '',
            estado: true
          };

          this.cargarPacientes();
        },

        error: (error: unknown) => {
          console.error(
            'Error al registrar paciente :',
            error
          );

          alert(
            'No se pudo registrar el paciente'
          );
        }
      });
  }

  editarPaciente(
    paciente: Paciente
  ): void {

    this.pacienteEditando = {
      ...paciente
    };
  }

  guardarCambiosPaciente(): void {
    if (!this.pacienteEditando) {
      return;
    }

    this.pacienteEditando.cedula =
      this.pacienteEditando.cedula.trim();

    this.pacienteEditando.nombre =
      this.pacienteEditando.nombre.trim();

    this.pacienteEditando.apellido =
      this.pacienteEditando.apellido.trim();

    this.pacienteEditando.telefono =
      this.pacienteEditando.telefono.trim();

    if (!this.pacienteEditando.cedula) {
      alert('Ingresa la cédula del paciente');
      return;
    }

    if (!/^\d{10}$/.test(this.pacienteEditando.cedula)) {
      alert(
        'La cédula del paciente debe tener exactamente 10 dígitos'
      );
      return;
    }

    if (!this.pacienteEditando.nombre) {
      alert('Ingresa el nombre del paciente');
      return;
    }

    if (!this.pacienteEditando.apellido) {
      alert('Ingresa el apellido del paciente');
      return;
    }

    if (!this.pacienteEditando.telefono) {
      alert('Ingresa el teléfono del paciente');
      return;
    }

    if (!/^\d+$/.test(this.pacienteEditando.telefono)) {
      alert(
        'El teléfono del paciente debe contener únicamente números'
      );
      return;
    }

    this.pacienteService
      .actualizarPaciente(
        this.pacienteEditando
      )
      .subscribe({
        next: () => {
          alert(
            'Paciente actualizado correctamente mediante '
          );

          this.pacienteEditando = null;
          this.cargarPacientes();
        },

        error: (error: unknown) => {
          console.error(
            'Error al actualizar paciente:',
            error
          );

          alert(
            'No se pudo actualizar el paciente'
          );
        }
      });
  }

  cancelarEdicionPaciente(): void {
    this.pacienteEditando = null;
  }

  eliminarPaciente(
    id: number
  ): void {

    const confirmar = confirm(
      '¿Seguro que deseas eliminar este paciente?'
    );

    if (!confirmar) {
      return;
    }

    this.pacienteService
      .eliminarPaciente(id)
      .subscribe({
        next: () => {
          alert(
            'Paciente eliminado correctamente '
          );

          if (
            this.pacienteEditando &&
            this.pacienteEditando.idPaciente === id
          ) {
            this.pacienteEditando = null;
          }

          this.cargarPacientes();
        },

        error: (error: unknown) => {
          console.error(
            'Error al eliminar paciente:',
            error
          );

          alert(
            'No se pudo eliminar el paciente. Puede estar relacionado con una cita.'
          );
        }
      });
  }

  cargarMedicos(): void {
    this.medicoService
      .obtenerMedicos()
      .subscribe({
        next: (datos: Medico[]) => {
          this.medicos = datos;
          this.cdr.detectChanges();
        },

        error: (error: unknown) => {
          console.error(
            'Error al obtener médicos:',
            error
          );
        }
      });
  }

  agregarMedico(): void {
    this.nuevoMedico.cedula =
      this.nuevoMedico.cedula.trim();

    this.nuevoMedico.nombre =
      this.nuevoMedico.nombre.trim();

    this.nuevoMedico.apellido =
      this.nuevoMedico.apellido.trim();

    this.nuevoMedico.cargo =
      this.nuevoMedico.cargo.trim();

    this.nuevoMedico.especialidad =
      this.nuevoMedico.especialidad.trim();

    if (!this.nuevoMedico.cedula) {
      alert('Ingresa la cédula del médico');
      return;
    }

    if (!/^\d{10}$/.test(this.nuevoMedico.cedula)) {
      alert(
        'La cédula del médico debe tener exactamente 10 dígitos'
      );
      return;
    }

    if (!this.nuevoMedico.nombre) {
      alert('Ingresa el nombre del médico');
      return;
    }

    if (!this.nuevoMedico.apellido) {
      alert('Ingresa el apellido del médico');
      return;
    }

    if (!this.nuevoMedico.cargo) {
      alert('Ingresa el cargo del médico');
      return;
    }

    if (!this.nuevoMedico.especialidad) {
      alert('Ingresa la especialidad del médico');
      return;
    }

    this.medicoService
      .agregarMedico(
        this.nuevoMedico
      )
      .subscribe({
        next: () => {
          alert(
            'Médico registrado correctamente'
          );

          this.nuevoMedico = {
            cedula: '',
            nombre: '',
            apellido: '',
            cargo: '',
            especialidad: ''
          };

          this.cargarMedicos();
        },

        error: (error: unknown) => {
          console.error(
            'Error al registrar médico:',
            error
          );

          alert(
            'No se pudo registrar el médico'
          );
        }
      });
  }

  editarMedico(
    medico: Medico
  ): void {

    this.medicoEditando = {
      ...medico
    };
  }

  guardarCambios(): void {
    if (!this.medicoEditando) {
      return;
    }

    this.medicoEditando.cedula =
      this.medicoEditando.cedula.trim();

    this.medicoEditando.nombre =
      this.medicoEditando.nombre.trim();

    this.medicoEditando.apellido =
      this.medicoEditando.apellido.trim();

    this.medicoEditando.cargo =
      this.medicoEditando.cargo.trim();

    this.medicoEditando.especialidad =
      this.medicoEditando.especialidad.trim();

    if (!this.medicoEditando.cedula) {
      alert('Ingresa la cédula del médico');
      return;
    }

    if (!/^\d{10}$/.test(this.medicoEditando.cedula)) {
      alert(
        'La cédula del médico debe tener exactamente 10 dígitos'
      );
      return;
    }

    if (!this.medicoEditando.nombre) {
      alert('Ingresa el nombre del médico');
      return;
    }

    if (!this.medicoEditando.apellido) {
      alert('Ingresa el apellido del médico');
      return;
    }

    if (!this.medicoEditando.cargo) {
      alert('Ingresa el cargo del médico');
      return;
    }

    if (!this.medicoEditando.especialidad) {
      alert('Ingresa la especialidad del médico');
      return;
    }

    this.medicoService
      .actualizarMedico(
        this.medicoEditando.idMedico,
        this.medicoEditando
      )
      .subscribe({
        next: () => {
          alert(
            'Médico actualizado correctamente'
          );

          this.medicoEditando = null;
          this.cargarMedicos();
        },

        error: (error: unknown) => {
          console.error(
            'Error al actualizar médico:',
            error
          );

          alert(
            'No se pudo actualizar el médico'
          );
        }
      });
  }

  cancelarEdicion(): void {
    this.medicoEditando = null;
  }

  eliminarMedico(
    id: number
  ): void {

    const confirmar = confirm(
      '¿Seguro que deseas eliminar este médico?'
    );

    if (!confirmar) {
      return;
    }

    this.medicoService
      .eliminarMedico(id)
      .subscribe({
        next: () => {
          alert(
            'Médico eliminado correctamente'
          );

          if (
            this.medicoEditando &&
            this.medicoEditando.idMedico === id
          ) {
            this.medicoEditando = null;
          }

          this.cargarMedicos();
        },

        error: (error: unknown) => {
          console.error(
            'Error al eliminar médico:',
            error
          );

          alert(
            'No se pudo eliminar el médico'
          );
        }
      });
  }

  cargarCitas(): void {
    this.errorCitas = '';

    this.citaService
      .obtenerCitas()
      .subscribe({
        next: (datos: Cita[]) => {
          this.citas = datos;
          this.cdr.detectChanges();
        },

        error: (error: unknown) => {
          console.error(
            'Error al obtener citas :',
            error
          );

          this.errorCitas =
            'No se pudieron consultar las citas ';

          this.cdr.detectChanges();
        }
      });
  }

  agregarCita(): void {
    if (this.nuevaCita.idPaciente === 0) {
      alert('Selecciona un paciente');
      return;
    }

    if (this.nuevaCita.idMedico === 0) {
      alert('Selecciona un médico');
      return;
    }

    if (!this.nuevaCita.fecha) {
      alert('Selecciona una fecha');
      return;
    }

    if (!this.nuevaCita.hora) {
      alert('Selecciona una hora');
      return;
    }

    this.nuevaCita.motivo =
      this.nuevaCita.motivo.trim();

    this.nuevaCita.tratamiento =
      this.nuevaCita.tratamiento.trim();

    if (!this.nuevaCita.motivo) {
      alert('Ingresa el motivo de la cita');
      return;
    }

    if (!this.nuevaCita.tratamiento) {
      alert('Ingresa el tratamiento de la cita');
      return;
    }

    const fechaCita =
      this.nuevaCita.fecha;

    this.citaService
      .agregarCita(
        this.nuevaCita
      )
      .subscribe({
        next: () => {
          alert(
            'Cita registrada correctamente '
          );

          this.cargarCitas();

          this.consultarClima(
            fechaCita
          );

          this.nuevaCita = {
            idPaciente: 0,
            idMedico: 0,
            fecha: '',
            hora: '',
            motivo: '',
            tratamiento: '',
            estado: true
          };
        },

        error: (error: unknown) => {
          console.error(
            'Error al registrar cita :',
            error
          );

          alert(
            'No se pudo registrar la cita'
          );
        }
      });
  }

  editarCita(
    cita: Cita
  ): void {

    this.citaEditando = {
      ...cita,

      fecha:
        this.fechaParaInput(
          cita.fecha
        ),

      hora:
        this.horaParaInput(
          cita.hora
        )
    };
  }

  guardarCambiosCita(): void {
    if (!this.citaEditando) {
      return;
    }

    if (this.citaEditando.idPaciente === 0) {
      alert('Selecciona un paciente');
      return;
    }

    if (this.citaEditando.idMedico === 0) {
      alert('Selecciona un médico');
      return;
    }

    if (!this.citaEditando.fecha) {
      alert('Selecciona una fecha');
      return;
    }

    if (!this.citaEditando.hora) {
      alert('Selecciona una hora');
      return;
    }

    this.citaEditando.motivo =
      this.citaEditando.motivo.trim();

    this.citaEditando.tratamiento =
      this.citaEditando.tratamiento.trim();

    if (!this.citaEditando.motivo) {
      alert('Ingresa el motivo de la cita');
      return;
    }

    if (!this.citaEditando.tratamiento) {
      alert('Ingresa el tratamiento de la cita');
      return;
    }

    this.citaService
      .actualizarCita(
        this.citaEditando
      )
      .subscribe({
        next: () => {
          alert(
            'Cita actualizada correctamente '
          );

          this.citaEditando = null;
          this.cargarCitas();
        },

        error: (error: unknown) => {
          console.error(
            'Error al actualizar cita :',
            error
          );

          alert(
            'No se pudo actualizar la cita'
          );
        }
      });
  }

  cancelarEdicionCita(): void {
    this.citaEditando = null;
  }

  eliminarCita(
    id: number
  ): void {

    const confirmar = confirm(
      `¿Seguro que deseas eliminar la cita ${id}?`
    );

    if (!confirmar) {
      return;
    }

    this.citaService
      .eliminarCita(id)
      .subscribe({
        next: () => {
          alert(
            'Cita eliminada correctamente '
          );

          if (
            this.citaEditando &&
            this.citaEditando.idCita === id
          ) {
            this.citaEditando = null;
          }

          this.cargarCitas();
        },

        error: (error: unknown) => {
          console.error(
            'Error al eliminar cita :',
            error
          );

          alert(
            'No se pudo eliminar la cita'
          );
        }
      });
  }

  verDetalleCita(
    cita: Cita
  ): void {
    this.citaDetalle = cita;
    this.climaDetalle = null;
    this.errorClimaDetalle = '';
    this.cargandoClimaDetalle = true;

    const fecha =
      this.fechaParaInput(cita.fecha);

    this.climaService
      .obtenerClima(fecha)
      .subscribe({
        next: (datos: ClimaResultado) => {
          this.climaDetalle = datos;
          this.cargandoClimaDetalle = false;
          this.cdr.detectChanges();
        },

        error: (error: unknown) => {
          console.error(
            'Error al consultar el clima del detalle:',
            error
          );

          this.errorClimaDetalle =
            'No se pudo consultar el clima para esta cita.';

          this.cargandoClimaDetalle = false;
          this.cdr.detectChanges();
        }
      });
  }

  cerrarDetalleCita(): void {
    this.citaDetalle = null;
    this.climaDetalle = null;
    this.errorClimaDetalle = '';
    this.cargandoClimaDetalle = false;
  }

  obtenerEspecialidadMedico(
    idMedico: number
  ): string {
    const medico =
      this.medicos.find(
        m =>
          m.idMedico ===
          idMedico
      );

    return medico?.especialidad || 'No especificada';
  }

  consultarClima(
    fecha?: string
  ): void {

    const fechaConsulta =
      fecha ||
      this.nuevaCita.fecha;

    if (!fechaConsulta) {
      alert(
        'Primero selecciona una fecha para la cita'
      );

      return;
    }

    this.cargandoClima = true;
    this.errorClima = '';
    this.clima = null;

    this.climaService
      .obtenerClima(
        fechaConsulta
      )
      .subscribe({
        next: (datos: ClimaResultado) => {
          this.clima = datos;
          this.cargandoClima = false;
          this.cdr.detectChanges();
        },

        error: (error: unknown) => {
          console.error(
            'Error al consultar API del clima:',
            error
          );

          this.errorClima =
            'No se pudo consultar el servicio externo del clima.';

          this.cargandoClima = false;
          this.cdr.detectChanges();
        }
      });
  }

  fechaParaInput(
    fecha: string
  ): string {

    if (!fecha) {
      return '';
    }

    return fecha.substring(
      0,
      10
    );
  }

  horaParaInput(
    hora: string
  ): string {

    if (!hora) {
      return '';
    }

    if (!hora.startsWith('PT')) {
      return hora.substring(
        0,
        5
      );
    }

    const resultado =
      hora.match(
        /PT(\d+)H(\d+)M/
      );

    if (!resultado) {
      return '';
    }

    const horas =
      resultado[1].padStart(
        2,
        '0'
      );

    const minutos =
      resultado[2].padStart(
        2,
        '0'
      );

    return `${horas}:${minutos}`;
  }

  obtenerNombrePaciente(
    idPaciente: number
  ): string {

    const paciente =
      this.pacientes.find(
        p =>
          p.idPaciente ===
          idPaciente
      );

    if (!paciente) {
      return `Paciente ${idPaciente}`;
    }

    return `${paciente.nombre} ${paciente.apellido}`;
  }

  obtenerNombreMedico(
    idMedico: number
  ): string {

    const medico =
      this.medicos.find(
        m =>
          m.idMedico ===
          idMedico
      );

    if (!medico) {
      return `Médico ${idMedico}`;
    }

    return `${medico.nombre} ${medico.apellido}`;
  }
}