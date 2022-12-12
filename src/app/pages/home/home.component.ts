import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CountryChartData } from 'src/app/core/models/country-chart-data.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    public chartData$: Observable<CountryChartData>;

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {
        this.chartData$ = this.olympicService.getOlympics().pipe(map(olympics => {
            return olympics.map(olympic =>({
                    id: olympic.id,
                    name: olympic.country,
                    value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)
            }))
        }))
    }
}
