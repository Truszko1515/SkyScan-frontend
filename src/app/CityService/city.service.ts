import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  id?: number;
  name: string;
  positionLat?: number;
  positionLng?: number;
  country?: string;
  state?: string;
  postalCode?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private getAllLocationUrl = 'https://localhost:7046/api/Location/GetAll'; 
  private deleteLocationUrl = 'https://localhost:7046/api/Location/Delete'; 
  private addLocationUrl = 'https://localhost:7046/api/Location/Add'; 

  flights: any[] = [];
  selectedCityName: string = '';
  showFlightsView: boolean = false;

  constructor(private http: HttpClient) {}

  getCities(limit: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.getAllLocationUrl}`);
  }

  addCity(cityName: string): Observable<City> {
    return this.http.post<City>(this.addLocationUrl, JSON.stringify(cityName), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  deleteCity(cityName: string): Observable<string> {
    return this.http.post<string>(this.deleteLocationUrl, JSON.stringify(cityName), {
      headers: { 'Content-Type': 'application/json' }, 
      responseType: 'text' as 'json' // Dodajemy responseType jako 'text'
    });
  }

  getFlights(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

}
