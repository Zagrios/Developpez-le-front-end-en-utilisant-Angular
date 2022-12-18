import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItem } from '@swimlane/ngx-charts';
import { Observable, map, last } from 'rxjs';
import { CountryDataItem } from 'src/app/core/models/advanced-data-item.interface';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    public chartData$: Observable<CountryDataItem[]>;
    public numberOfJOs$: Observable<number>;

    constructor(
        private olympicService: OlympicService,
        private router: Router
    ) {}

    ngOnInit(): void {

        const olympicsData = this.olympicService.getOlympics();

        this.chartData$ = olympicsData.pipe(last(), map(olympics => {
            return olympics.map(olympic =>({
                    name: olympic.country,
                    value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0),
                    extra: {id: olympic.id}
            }) as CountryDataItem);
        }));

        this.numberOfJOs$ = olympicsData.pipe(last(), map(olympics => {
            const joYears = olympics.map(olympic => olympic.participations.map(participation => participation.year));
            return (new Set(...joYears)).size;
        }));

    }

    public onCountrySelected(selectedItem: CountryDataItem){
        
        const countryId = selectedItem.extra.id;

        this.router.navigateByUrl(`country/${countryId}`);

    }
}
