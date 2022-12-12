import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Olympics } from '../models/olympic.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private readonly olympicUrl = './assets/mock/olympic.json';

  private olympics$: Observable<Olympics[]>;

    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {}

    private handleError(err: HttpErrorResponse){
        this.errorHandler.handle(err);

        return throwError(() => new Error("Something bad happened :( Please retry later."));
    }

    public loadInitialData(): Observable<Olympics[]> {

        this.olympics$ = this.http.get<Olympics[]>(this.olympicUrl).pipe(
            catchError(err => this.handleError(err))
        );

        return this.olympics$;
    }

    public getOlympics(): Observable<Olympics[]> {
        return this.olympics$;
    }
}
