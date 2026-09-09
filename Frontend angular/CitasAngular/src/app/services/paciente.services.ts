import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private readonly soapUrl =
    'http://localhost:5237/CitaService.svc';

  constructor(
    private http: HttpClient
  ) {}

  private crearHeaders(
    accion: string
  ): HttpHeaders {

    return new HttpHeaders({
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction':
        `"http://tempuri.org/ICitaService/${accion}"`
    });
  }

  obtenerPacientes(): Observable<Paciente[]> {

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:ObtenerPacientes>' +
          '</tem:ObtenerPacientes>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders('ObtenerPacientes'),
        responseType: 'text'
      }
    ).pipe(

      map((respuesta: string): Paciente[] => {

        const parser =
          new DOMParser();

        const documento =
          parser.parseFromString(
            respuesta,
            'text/xml'
          );

        const elementosPaciente =
          Array.from(
            documento.getElementsByTagNameNS(
              '*',
              'Paciente'
            )
          );

        return elementosPaciente.map(
          (paciente: Element): Paciente => {

            const obtenerValor = (
              nombre: string
            ): string => {

              const elemento =
                paciente.getElementsByTagNameNS(
                  '*',
                  nombre
                )[0];

              return elemento?.textContent || '';
            };

            return {
              idPaciente:
                Number(
                  obtenerValor('IdPaciente')
                ),

              cedula:
                obtenerValor('Cedula'),

              nombre:
                obtenerValor('Nombre'),

              apellido:
                obtenerValor('Apellido'),

              telefono:
                obtenerValor('Telefono'),

              estado:
                obtenerValor('Estado')
                  .toLowerCase() === 'true'
            };
          }
        );
      })
    );
  }

  agregarPaciente(
    paciente: Omit<Paciente, 'idPaciente'>
  ): Observable<string> {

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/" ' +
      'xmlns:a="http://schemas.datacontract.org/2004/07/CitasSOAP.Model">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:AgregarPaciente>' +
            '<tem:paciente>' +
              '<a:Apellido>' +
                this.escaparXml(paciente.apellido) +
              '</a:Apellido>' +
              '<a:Cedula>' +
                this.escaparXml(paciente.cedula) +
              '</a:Cedula>' +
              '<a:Estado>' +
                paciente.estado +
              '</a:Estado>' +
              '<a:IdPaciente>0</a:IdPaciente>' +
              '<a:Nombre>' +
                this.escaparXml(paciente.nombre) +
              '</a:Nombre>' +
              '<a:Telefono>' +
                this.escaparXml(paciente.telefono) +
              '</a:Telefono>' +
            '</tem:paciente>' +
          '</tem:AgregarPaciente>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders('AgregarPaciente'),
        responseType: 'text'
      }
    );
  }

  actualizarPaciente(
    paciente: Paciente
  ): Observable<string> {

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/" ' +
      'xmlns:a="http://schemas.datacontract.org/2004/07/CitasSOAP.Model">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:ActualizarPaciente>' +
            '<tem:paciente>' +
              '<a:Apellido>' +
                this.escaparXml(paciente.apellido) +
              '</a:Apellido>' +
              '<a:Cedula>' +
                this.escaparXml(paciente.cedula) +
              '</a:Cedula>' +
              '<a:Estado>' +
                paciente.estado +
              '</a:Estado>' +
              '<a:IdPaciente>' +
                paciente.idPaciente +
              '</a:IdPaciente>' +
              '<a:Nombre>' +
                this.escaparXml(paciente.nombre) +
              '</a:Nombre>' +
              '<a:Telefono>' +
                this.escaparXml(paciente.telefono) +
              '</a:Telefono>' +
            '</tem:paciente>' +
          '</tem:ActualizarPaciente>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders('ActualizarPaciente'),
        responseType: 'text'
      }
    );
  }

  eliminarPaciente(
    id: number
  ): Observable<string> {

    const xml =
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope ' +
      'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' +
      'xmlns:tem="http://tempuri.org/">' +
        '<soap:Header/>' +
        '<soap:Body>' +
          '<tem:EliminarPaciente>' +
            '<tem:id>' +
              id +
            '</tem:id>' +
          '</tem:EliminarPaciente>' +
        '</soap:Body>' +
      '</soap:Envelope>';

    return this.http.post(
      this.soapUrl,
      xml,
      {
        headers:
          this.crearHeaders('EliminarPaciente'),
        responseType: 'text'
      }
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