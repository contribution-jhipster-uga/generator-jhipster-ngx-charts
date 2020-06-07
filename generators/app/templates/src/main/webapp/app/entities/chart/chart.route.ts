import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { IChart, Chart } from 'app/shared/model/chart-model';
import { ChartService } from './chart.service';

import { ChartComponent } from './chart.component';

@Injectable({ providedIn: 'root' })
export class ChartResolve implements Resolve<IChart> {
  constructor(private service: ChartService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chart: HttpResponse<Chart>) => {
          if (chart.body) {
            return of(chart.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chart());
  }
}

export const chartRoute: Routes = [
  {
    path: ':id',
    component: ChartComponent,
    resolve: {
      chart: ChartResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'chartApp.chart.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
