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

    /**
     * Handle api errors
     * @param {HttpErrorResponse} err 
     * @returns {void}
     */
    private handleError(err: HttpErrorResponse){
        this.errorHandler.handle(err);
        return throwError(() => new Error("Something bad happened :( Please retry later."));
    }

    /**
     * Load olymics data from api
     * @returns {Observable<Olympic[]>}
     */
    private loadInitialData(): Observable<Olympic[]> {

        // If data have been already loaded, return the data
        if(!!this.olympics$){ return this.olympics$; }

        // Load data from api
        this.olympics$ = this.http.get<Olympic[]>(this.olympicUrl).pipe(
            // Catch errors with the error handler
            catchError(err => this.handleError(err))
        );

        return this.olympics$;
    }

    /**
     * Return all coutry Olympics
     * @returns {Observable<Olympic[]>}
     */
    public getOlympics(): Observable<Olympic[]> {
        return this.loadInitialData();
    }

    /**
     * Return coutry olymics details from its id
     * @param {number} id coutry id
     * @return {Observable<Olympic>}
     */
    public getOlympicById(id: number): Observable<Olympic>{
        return this.getOlympics().pipe(map(olympics => (
            olympics.find(olympic => olympic.id === id)
        )));
    }
}
