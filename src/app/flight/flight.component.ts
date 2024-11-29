import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  @Input() cityName!: string; // Nazwa miasta przekazana z CityComponent
  @Input() latitude!: number; // Szerokość geograficzna miasta
  @Input() longitude!: number; // Długość geograficzna miasta

  flights: any[] = []; // Lista lotów
  errorMessage: string = ''; // Komunikat błędu

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights(): void {
    const url = `https://localhost:7046/api/Flights/Info/InCityRadius/${this.latitude},${this.longitude}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        this.errorMessage = 'Nie udało się załadować lotów.';
        console.error(error);
      }
    );
  }
}
