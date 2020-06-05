import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterCredential } from './registration/registration.model';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  //
  // ─── REGISTRATION ───────────────────────────────────────────────────────────────
  //
  API_REGISTER(body: RegisterCredential): Observable<Object> {
    return this.http.post('/api/authorization', body);
  }
  // ────────────────────────────────────────────────────────────────────────────────
}
