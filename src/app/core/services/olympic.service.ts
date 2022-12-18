import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Olympic } from '../models/olympic.interface';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private readonly olympicUrl = './assets/mock/olympic.json';

  private olympics$: Observable<Olympic[]>;

    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {}

    private handleError(err: HttpErrorResponse){
        this.errorHandler.handle(err);

        return throwError(() => new Error("Something bad happened :( Please retry later."));
    }

    private loadInitialData(): Observable<Olympic[]> {

        if(!!this.olympics$){ return this.olympics$; }

        this.olympics$ = this.http.get<Olympic[]>(this.olympicUrl).pipe(
            catchError(err => this.handleError(err))
        );

        return this.olympics$;
    }

    public getOlympics(): Observable<Olympic[]> {

        return this.loadInitialData();
    }

    public getOlympicById(id: number): Observable<Olympic>{
        return this.getOlympics().pipe(map(olympics => (
            olympics.find(olympic => olympic.id === id)
        )));
    }
}
