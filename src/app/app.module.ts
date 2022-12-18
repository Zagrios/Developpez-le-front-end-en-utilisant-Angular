import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PageTitleComponent } from './core/components/shared/page-title/page-title.component';
import { DataCardComponent } from './core/components/shared/data-card/data-card.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        HeaderComponent,
        PageTitleComponent,
        DataCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxChartsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
