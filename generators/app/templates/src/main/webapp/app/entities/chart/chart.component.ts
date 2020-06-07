/* eslint-disable no-console */
import { Component, OnInit, OnDestroy } from '@angular/core';

// import { * } from '/chart-model';

import { IChart } from 'app/shared/model/chart-model';
import { ActivatedRoute } from '@angular/router';

import { colorSets } from '@swimlane/ngx-charts';
import { formatLabel, escapeLabel } from '@swimlane/ngx-charts';

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

function multiFormat(value: any): string {
  if (value < 1000) return `${value.toFixed(2)}ms`;
  value /= 1000;
  if (value < 60) return `${value.toFixed(2)}s`;
  value /= 60;
  if (value < 60) return `${value.toFixed(2)}mins`;
  value /= 60;
  return `${value.toFixed(2)}hrs`;
}

// A voir l'exemple https://github.com/swimlane/ngx-charts/blob/master/src/app/app.component.ts

@Component({
  selector: 'jhi-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  chart!: IChart;

  view: any[] = [1000, 500];
  width = 1000;
  height = 500;
  fitContainer = true;

  selectedColorScheme!: string;
  colorSets: any;
  colorScheme: any;

  theme = 'light';

  chartType!: string;
  chartGroups!: any[];
  realTimeData = false;
  countries!: any[];
  fiscalYearReport!: any[];
  dateData!: any[];
  dateDataWithRange!: any[];
  calendarData!: any[];
  statusData!: any[];
  sparklineData!: any[];
  timelineFilterBarData!: any[];
  graph!: { links: any[]; nodes: any[] };
  bubble: any;
  linearScale = false;
  range = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = 'right';
  showXAxisLabel = true;
  tooltipDisabled = false;
  showText = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Price Total';
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 40;
  minRadius = 5;
  showSeriesOnHover = true;
  roundEdges = true;
  animations = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin!: number;
  yScaleMax!: number;
  showDataLabel = false;
  noBarWhenZero = true;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  rotateXAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 16;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;

  // line, area
  autoScale = true;
  timeline = false;

  // margin
  margin = false;
  marginTop = 40;
  marginRight = 40;
  marginBottom = 40;
  marginLeft = 40;

  // gauge
  gaugeMin = 0;
  gaugeMax = 100;
  gaugeLargeSegments = 10;
  gaugeSmallSegments = 5;
  gaugeTextValue = '';
  gaugeUnits = 'alerts';
  gaugeAngleSpan = 240;
  gaugeStartAngle = -120;
  gaugeShowAxis = true;
  gaugeValue = 50; // linear gauge value
  gaugePreviousValue = 70;

  // heatmap
  heatmapMin = 0;
  heatmapMax = 50000;

  // bubble
  xLabelBubble = 'Year ';
  yLabelBubble = 'Price Total';

  constructor(protected activatedRoute: ActivatedRoute) {
    this.colorSets = colorSets;
    this.setColorScheme('cool');

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chart }) => {
      this.chart = chart;
    });
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }

  previousState(): void  {
    window.history.back();
  }

  select(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  activate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  setColorScheme(name: any): void {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find((s: any) => s.name === name);
  }

  applyDimensions(): void {
    this.view = [this.width, this.height];
  }

  onLegendLabelClick(entry: any): void {
    console.log('Legend clicked', entry);
  }

  getCalendarData(): any[] {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const calendarData = [];
    const getDate = (d: any) => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + week * 7;
      const monday = getDate(mondayDay);

      // one week
      const series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        const date = getDate(mondayDay - 1 + dayOfWeek);

        // skip future dates
        if (date > now) {
          continue;
        }

        // value
        const value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;

        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      calendarData.push({
        name: monday.toString(),
        series
      });
    }

    return calendarData;
  }

  calendarAxisTickFormatting(mondayString: string): string {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c: any): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
  }

  pieTooltipText({data}:{ data: any}) : string {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }

  dollarValueFormat(c: any): string {
    return `${c.value.toLocaleString()}`;
  }
}
