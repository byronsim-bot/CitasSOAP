import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface RespuestaOpenMeteo {
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

export interface ClimaResultado {
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

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private readonly latitud = -0.1807;
  private readonly longitud = -78.4678;

  constructor(
    private http: HttpClient
  ) {}

  obtenerClima(
    fecha: string
  ): Observable<ClimaResultado> {

    const url =
      'https://api.open-meteo.com/v1/forecast' +
      `?latitude=${this.latitud}` +
      `&longitude=${this.longitud}` +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=America%2FGuayaquil' +
      '&forecast_days=16';

    return this.http
      .get<RespuestaOpenMeteo>(url)
      .pipe(
        map(
          (
            respuesta: RespuestaOpenMeteo
          ): ClimaResultado => {

            const posicion =
              respuesta.daily.time.indexOf(
                fecha
              );

            if (posicion === -1) {
              return {
                disponible: false,
                mensaje:
                  'Todavía no existe un pronóstico disponible para esta fecha.'
              };
            }

            const temperaturaMax =
              respuesta.daily
                .temperature_2m_max[posicion];

            const temperaturaMin =
              respuesta.daily
                .temperature_2m_min[posicion];

            const lluvia =
              respuesta.daily
                .precipitation_probability_max[posicion];

            const codigo =
              respuesta.daily
                .weather_code[posicion];

            return {
              disponible: true,
              fecha: fecha,
              temperaturaMax:
                temperaturaMax,
              temperaturaMin:
                temperaturaMin,
              probabilidadLluvia:
                lluvia,
              codigo: codigo,
              descripcion:
                this.obtenerDescripcion(
                  codigo
                ),
              recomendacion:
                this.obtenerRecomendacion(
                  temperaturaMin,
                  lluvia
                )
            };
          }
        )
      );
  }

  private obtenerDescripcion(
    codigo: number
  ): string {

    if (codigo === 0) {
      return 'Despejado';
    }

    if (
      codigo === 1 ||
      codigo === 2 ||
      codigo === 3
    ) {
      return 'Parcialmente nublado';
    }

    if (
      codigo === 45 ||
      codigo === 48
    ) {
      return 'Niebla';
    }

    if (
      codigo === 51 ||
      codigo === 53 ||
      codigo === 55
    ) {
      return 'Llovizna';
    }

    if (
      codigo === 61 ||
      codigo === 63 ||
      codigo === 65
    ) {
      return 'Lluvia';
    }

    if (
      codigo === 71 ||
      codigo === 73 ||
      codigo === 75
    ) {
      return 'Nieve';
    }

    if (
      codigo === 80 ||
      codigo === 81 ||
      codigo === 82
    ) {
      return 'Chubascos';
    }

    if (
      codigo === 95 ||
      codigo === 96 ||
      codigo === 99
    ) {
      return 'Tormenta';
    }

    return 'Condición variable';
  }

  private obtenerRecomendacion(
    temperaturaMin: number,
    lluvia: number
  ): string {

    if (lluvia >= 60) {
      return 'Existe alta probabilidad de lluvia. Se recomienda llevar paraguas y salir con anticipación para la cita.';
    }

    if (lluvia >= 30) {
      return 'Existe posibilidad de lluvia. Se recomienda tomar precauciones al trasladarse a la cita.';
    }

    if (temperaturaMin <= 10) {
      return 'Se espera una temperatura baja. Se recomienda llevar ropa abrigada para asistir a la cita.';
    }

    return 'Las condiciones climáticas son favorables para asistir a la cita.';
  }
}