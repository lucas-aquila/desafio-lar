import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from '../models/person';
import { RequestPerson } from '../models/request-person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:5276/api/Person';

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getById(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  create(person: RequestPerson): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  update(id: number, data: RequestPerson): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}