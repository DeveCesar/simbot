// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatTableModule } from '@angular/material';
import * as global from './config/globals';

// Main Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './components/panel/panel.component';
import { FloatSubMenuComponent } from './components/float-sub-menu/float-sub-menu.component';


// Component Module
import { AgmCoreModule } from '@agm/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TrendModule } from 'ngx-trend';
import { HighlightJsModule } from 'ngx-highlight-js';
import { CountdownModule } from 'ngx-countdown';
import { ChartsModule } from 'ng4-charts/ng4-charts';
import { TagInputModule } from 'ngx-chips';
import { Ng2TableModule } from 'ngx-datatable/ng2-table';
import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// Pages
import { DashboardV1Page } from './pages/dashboard/v1/dashboard-v1';
import { DashboardV2Page } from './pages/dashboard/v2/dashboard-v2';
import { DashboardV3Page } from './pages/dashboard/v3/dashboard-v3';

// Calendar
import { CalendarPage } from './pages/calendar/calendar';

// User Login / Register
import { LoginV1Page } from './pages/login/login-v1/login-v1';
import { RegisterV3Page } from './pages/register/register-v3/register-v3';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

//Tabla
import { TableBasicPage }  from './pages/tables/table-basic/table-basic';
import { TableDataPage }  from './pages/tables/table-data/table-data'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    FloatSubMenuComponent,
    DashboardV1Page,
    DashboardV2Page,
    DashboardV3Page,
    CalendarPage,
    LoginV1Page,
    RegisterV3Page,
    RegisterUserComponent,
    TableBasicPage,
    TableDataPage
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountdownModule,
    ChartsModule,
    FullCalendarModule,
    FormsModule,
    HighlightJsModule,
    LoadingBarRouterModule,
    MatSortModule,
    MatTableModule,
    NgbModule,
    NvD3Module,
    NgxChartsModule,
    NgxDatatableModule,
    Ng2TableModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    TagInputModule,
    TrendModule
  ],
  providers: [Title, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = 'Simbot | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
