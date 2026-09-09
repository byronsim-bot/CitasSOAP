import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private readonly apiUrl =
    'https://localhost:7074/api/Medico';

  constructor(
    private http: HttpClient
  ) {}

  obtenerMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(
      this.apiUrl
    );
  }

  agregarMedico(
    medico: Omit<Medico, 'idMedico'>
  ): Observable<Medico> {

    return this.http.post<Medico>(
      this.apiUrl,
      medico
    );
  }

  actualizarMedico(
    id: number,
    medico: Medico
  ): Observable<Medico> {

    return this.http.put<Medico>(
      `${this.apiUrl}/${id}`,
      medico
    );
  }

  eliminarMedico(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}