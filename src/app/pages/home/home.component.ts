import { Component, OnInit } from '@angular/core';
import { DataItem } from '@swimlane/ngx-charts';
import { Observable, map, last } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    public chartData$: Observable<DataItem[]>;
    public numberOfJOs$: Observable<number>;

    constructor(private olympicService: OlympicService) {}

    ngOnInit(): void {

        const olympicsData = this.olympicService.getOlympics();

        this.chartData$ = olympicsData.pipe(map(olympics => {
            return olympics.map(olympic =>({
                    name: olympic.country,
                    value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0)
            }));
        }));

        this.numberOfJOs$ = olympicsData.pipe(last(), map(olympics => {
            const joYears = olympics.map(olympic => olympic.participations.map(participation => participation.year));
            return (new Set(...joYears)).size;
        }));

    }

    public onCountrySelected(a: any){
        console.log(a);
    }
}
