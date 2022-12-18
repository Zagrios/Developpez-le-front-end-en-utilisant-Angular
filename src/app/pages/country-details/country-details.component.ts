import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Observable } from "rxjs"
import { map, last } from "rxjs/operators"
import { Color, DataItem, LineChartComponent, ScaleType } from '@swimlane/ngx-charts';
import { LineChartData } from 'src/app/core/models/line-chart-data.interface';

@Component({
  selector: 'country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

    public details$: Observable<{
        coutryName: string,
        totalMedals: number,
        totalAthletes: number,
        totalEntries: number
    }>

    public chartData$: Observable<LineChartData[]>

    constructor(
        private olympicService: OlympicService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        const coutryId = this.route.snapshot.paramMap.get("id");

        const coutryDetails = this.olympicService.getOlympicById(+coutryId);

        this.chartData$ = coutryDetails.pipe(last(), map(olympic => [{
            name: olympic.country,
            series: olympic.participations.map(participation => ({
                name: `${participation.year}`,
                value: participation.medalsCount
            }))
        }]))

        this.details$ = coutryDetails.pipe(last(), map(olympic => ({
            coutryName: olympic.country,
            totalEntries: olympic.participations.length,

            ...olympic.participations.reduce((acc, current) => {
                return {
                    totalMedals: acc.totalMedals + current.medalsCount,
                    totalAthletes: acc.totalAthletes + current.athleteCount
                }
            }, {totalAthletes: 0, totalMedals: 0})

        })));

        

    }

}
