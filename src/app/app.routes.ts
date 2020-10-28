import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ReclamosComponent } from './pages/reclamos/reclamos.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  { path: 'reporte', component: ReporteComponent },
  { path: 'reclamos', component: ReclamosComponent },
  { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
  useHash: true,
  preloadingStrategy: PreloadAllModules,
});
