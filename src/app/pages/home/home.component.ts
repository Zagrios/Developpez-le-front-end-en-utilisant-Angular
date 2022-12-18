import { Component, OnInit } from '@angular/core';
import { Observable, map, last } from 'rxjs';
import { CountryChartData } from 'src/app/core/models/country-chart-data.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    public chartData$: Observable<CountryChartData>;
    public numberOfJOs$: Observable<number>;

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {

        const olympicsData = this.olympicService.getOlympics();

        this.chartData$ = olympicsData.pipe(map(olympics => {
            return olympics.map(olympic =>({
                    id: olympic.id,
                    name: olympic.country,
                    value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)
            }));
        }));

        this.numberOfJOs$ = olympicsData.pipe(last(), map(olympics => {
            const joYears = olympics.map(olympic => olympic.participations.map(participation => participation.year));
            return (new Set(...joYears)).size;
        }));

    }
}
