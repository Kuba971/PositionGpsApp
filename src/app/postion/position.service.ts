import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from './position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
    private apiUrl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    fetchPositions(): Observable<Position[]> {
        return this.http.get<Position[]>(this.apiUrl+'fetch');
    }

    createPosition(position: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl+'create', position, { headers });
    }

    deletePosition(positionId: String): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl+'delete/'}${positionId}`);
    }

    evaluateDistancePosition(positionId1: any, positionId2: any): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl+'fetchDistance', {positionId1, positionId2}, { headers });
    }
}