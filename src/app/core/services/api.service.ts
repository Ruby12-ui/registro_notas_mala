import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly baseUrl = 'http://localhost:8081/api';
}
