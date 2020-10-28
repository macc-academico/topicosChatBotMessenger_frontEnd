import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { MainComponent } from './pages/main/main.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { ReclamosComponent } from './pages/reclamos/reclamos.component';

@NgModule({
  declarations: [
    AppComponent,
    ReporteComponent,
    MainComponent,
    NopagefoundComponent,
    LoadingComponent,
    ReclamosComponent,
  ],
  imports: [BrowserModule, APP_ROUTES, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
