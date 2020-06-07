import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// <--! import -->

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './chart.component';
import { chartRoute } from './chart.route';

@NgModule({
  // <--! sharedmodule -->
  declarations: [ChartComponent]
})
export class ChartsChartModule {}
