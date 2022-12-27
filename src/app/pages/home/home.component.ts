import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, last } from 'rxjs';
import { CountryDataItem } from 'src/app/core/models/country-data-item.interface';
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

        // Start load Olympics data
        const olympicsData = this.olympicService.getOlympics();

        // When data finished loading, map data to valid chart data
        this.chartData$ = olympicsData.pipe(last(), map(olympics => {
            return olympics.map(olympic =>({
                    name: olympic.country,
                    value: olympic.participations.reduce((acc, participation) => acc + participation.medalsCount, 0),
                    extra: {id: olympic.id}
            }) as CountryDataItem);
        }));

        // When data finished loading, map data to total number of JOs
        this.numberOfJOs$ = olympicsData.pipe(last(), map(olympics => {
            const joYears = olympics.map(olympic => olympic.participations.map(participation => participation.year));
            return (new Set(...joYears)).size;
        }));

    }


    /**
     * Handle coutry selection (navigate to the selected coutry in our case)
     * @param {CountryDataItem} selectedItem 
     */
    public onCountrySelected(selectedItem: CountryDataItem){
        
        // Get coutry selected id from extra data
        const countryId = selectedItem.extra.id;

        // Navigate to the selected coutry
        this.router.navigateByUrl(`country/${countryId}`);

    }
}
