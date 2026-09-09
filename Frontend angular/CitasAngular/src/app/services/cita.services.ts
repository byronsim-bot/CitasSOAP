import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import {
  Cita,
  NuevaCita
} from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private readonly soapUrl =
    'http://localhost:5237/CitaService.svc';

  constructor(
    private http: HttpClient
  ) {}

  private crearHeaders(
    accion: string
  ): HttpHeaders {

    return new HttpHeaders({
      'Content-Type':
        'text/xml; charset=utf-8',

      'SOAPAction':
        `"http://tempuri.org/ICitaService/${accion}"`
    });
  }

  obtenerCitas(): Observable<Cita[]> {

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:ObtenerCitas>' +
          '</tem:ObtenerCitas>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders('ObtenerCitas'),

        responseType:
          'text'
      }
    ).pipe(

      map(
        (
          respuesta: string
        ): Cita[] => {

          const parser =
            new DOMParser();

          const documento =
            parser.parseFromString(
              respuesta,
              'text/xml'
            );

          const elementosCita =
            Array.from(
              documento
                .getElementsByTagNameNS(
                  '*',
                  'Cita'
                )
            );

          return elementosCita.map(
            (
              cita: Element
            ): Cita => {

              const obtenerValor = (
                nombre: string
              ): string => {

                const elemento =
                  cita
                    .getElementsByTagNameNS(
                      '*',
                      nombre
                    )[0];

                return (
                  elemento?.textContent ||
                  ''
                );
              };

              return {
                idCita:
                  Number(
                    obtenerValor(
                      'IdCita'
                    )
                  ),

                idPaciente:
                  Number(
                    obtenerValor(
                      'IdPaciente'
                    )
                  ),

                idMedico:
                  Number(
                    obtenerValor(
                      'IdMedico'
                    )
                  ),

                fecha:
                  obtenerValor(
                    'Fecha'
                  ),

                hora:
                  obtenerValor(
                    'Hora'
                  ),

                motivo:
                  obtenerValor(
                    'Motivo'
                  ),

                tratamiento:
                  obtenerValor(
                    'Tratamiento'
                  ),

                estado:
                  obtenerValor(
                    'Estado'
                  ).toLowerCase() ===
                  'true'
              };
            }
          );
        }
      )
    );
  }

  agregarCita(
    cita: NuevaCita
  ): Observable<string> {

    const fechaSoap =
      this.convertirFechaASoap(
        cita.fecha
      );

    const horaSoap =
      this.convertirHoraASoap(
        cita.hora
      );

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/" ' +
      'xmlns:a="http://schemas.datacontract.org/2004/07/CitasSOAP.Model">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:AgregarCita>' +
            '<tem:cita>' +
              '<a:Estado>' +
                cita.estado +
              '</a:Estado>' +
              '<a:Fecha>' +
                fechaSoap +
              '</a:Fecha>' +
              '<a:Hora>' +
                horaSoap +
              '</a:Hora>' +
              '<a:IdCita>0</a:IdCita>' +
              '<a:IdMedico>' +
                cita.idMedico +
              '</a:IdMedico>' +
              '<a:IdPaciente>' +
                cita.idPaciente +
              '</a:IdPaciente>' +
              '<a:Motivo>' +
                this.escaparXml(
                  cita.motivo
                ) +
              '</a:Motivo>' +
              '<a:Tratamiento>' +
                this.escaparXml(
                  cita.tratamiento
                ) +
              '</a:Tratamiento>' +
            '</tem:cita>' +
          '</tem:AgregarCita>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders(
            'AgregarCita'
          ),

        responseType:
          'text'
      }
    );
  }

  actualizarCita(
    cita: Cita
  ): Observable<string> {

    const fechaSoap =
      this.convertirFechaASoap(
        cita.fecha
      );

    const horaSoap =
      this.convertirHoraASoap(
        cita.hora
      );

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/" ' +
      'xmlns:a="http://schemas.datacontract.org/2004/07/CitasSOAP.Model">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:ActualizarCita>' +
            '<tem:cita>' +
              '<a:Estado>' +
                cita.estado +
              '</a:Estado>' +
              '<a:Fecha>' +
                fechaSoap +
              '</a:Fecha>' +
              '<a:Hora>' +
                horaSoap +
              '</a:Hora>' +
              '<a:IdCita>' +
                cita.idCita +
              '</a:IdCita>' +
              '<a:IdMedico>' +
                cita.idMedico +
              '</a:IdMedico>' +
              '<a:IdPaciente>' +
                cita.idPaciente +
              '</a:IdPaciente>' +
              '<a:Motivo>' +
                this.escaparXml(
                  cita.motivo
                ) +
              '</a:Motivo>' +
              '<a:Tratamiento>' +
                this.escaparXml(
                  cita.tratamiento
                ) +
              '</a:Tratamiento>' +
            '</tem:cita>' +
          '</tem:ActualizarCita>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders(
            'ActualizarCita'
          ),

        responseType:
          'text'
      }
    );
  }

  eliminarCita(
    id: number
  ): Observable<string> {

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:EliminarCita>' +
            '<tem:id>' +
              id +
            '</tem:id>' +
          '</tem:EliminarCita>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders(
            'EliminarCita'
          ),

        responseType:
          'text'
      }
    );
  }

  private convertirFechaASoap(
    fecha: string
  ): string {

    if (fecha.includes('T')) {
      return fecha;
    }

    return (
      fecha +
      'T00:00:00'
    );
  }

  private convertirHoraASoap(
    hora: string
  ): string {

    if (
      hora.startsWith('PT')
    ) {
      return hora;
    }

    const partes =
      hora.split(':');

    const horas =
      Number(
        partes[0]
      );

    const minutos =
      Number(
        partes[1]
      );

    return (
      `PT${horas}H${minutos}M`
    );
  }

  private escaparXml(
    texto: string
  ): string {

    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}