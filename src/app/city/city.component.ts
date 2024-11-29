import { Component, OnInit } from '@angular/core';
import { CityService } from '../CityService/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  cities: any[] = [];
  cityName: string = '';
  limit: number = 5;
  errorMessage: string = '';
  displayCities: boolean = false;
  showFlightView: boolean = false; 
  selectedCity: any = null; 

  constructor(private cityService: CityService) {}

  ngOnInit(): void {}

  loadCities(): void {
    this.cityService.getCities(this.limit).subscribe(
      (data) => {
        this.cities = data;
        this.displayCities = true;
      },
      (error) => {
        this.errorMessage = 'Nie udało się załadować miast.';
        console.error(error);
      }
    );
  }

  addCity(): void {
    if (!this.cityName.trim()) {
      this.errorMessage = 'Nazwa miasta nie może być pusta.';
      return;
    }

    this.cityService.addCity(this.cityName).subscribe(
      (response) => {
        this.errorMessage = '';
        const newCity = response;
        this.cities.push(newCity);
        this.cityName = '';
      },
      (error) => {
        this.errorMessage = error.error?.Message || 'Nie udało się dodać miasta.';
        console.error(error);
      }
    );
  }

  deleteCity(cityName: string): void {
    this.cityService.deleteCity(cityName).subscribe(
      (response) => {
        if (response === 'City removed correctly.') {
          this.cities = this.cities.filter((city) => city.name !== cityName);
          this.displayCities = true;
        } else {
          this.errorMessage = 'Nie udało się usunąć miasta.';
        }
      },
      (error) => {
        this.errorMessage = error.error?.Message || 'Nie udało się usunąć miasta.';
        console.error(error);
      }
    );
  }

  showFlights(city: any): void {
    this.selectedCity = city;
    this.showFlightView = true;
  }
}
