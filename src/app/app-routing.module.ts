import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Authentication

  {
    path: 'login',
    loadChildren: () =>
      import('./Authentication/login/login.module').then((m) => m.LoginModule),
  },

  // Global

  {
    path: 'Global/header',
    loadChildren: () =>
      import('./Global/header/header.module').then((m) => m.HeaderModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./Global/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./Global/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'Global/menu',
    loadChildren: () =>
      import('./Global/menu/menu.module').then((m) => m.MenuModule),
  },

  //  Accounting

  {
    path: 'AccountMapping',
    loadChildren: () =>
      import(
        './Features/Accounting/AccountMapping/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'balancesheet',
    loadChildren: () =>
      import(
        './Features/Accounting/BalanceSheet/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'financialsummary',
    loadChildren: () =>
      import(
        './Features/Accounting/FinancialSummary/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'CITfloorplan',
    loadChildren: () =>
      import(
        './Features/Accounting/FloorplanReconciliation/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'Incomestatement',
    loadChildren: () =>
      import(
        './Features/Accounting/IncomeStatement/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'Cashflow',
    loadChildren: () =>
      import('./Features/Accounting/CashFlow/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'schedules',
    loadChildren: () =>
      import('./Features/Accounting/Schedules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  //  Admin

  {
    path: 'adminmodules',
    loadChildren: () =>
      import('./Features/Admin/admin-modules/admin-modules.module').then(
        (m) => m.AdminModulesModule
      ),
  },
  {
    path: 'jobroles',
    loadChildren: () =>
      import('./Features/Admin/job-roles/job-roles.module').then(
        (m) => m.JobRolesModule
      ),
  },
  {
    path: 'jobititles',
    loadChildren: () =>
      import('./Features/Admin/job-titles/job-titles.module').then(
        (m) => m.JobTitlesModule
      ),
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('./Features/Admin/permissions/permissions.module').then(
        (m) => m.PermissionsModule
      ),
  },
  {
    path: 'adminroles',
    loadChildren: () =>
      import('./Features/Admin/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./Features/Admin/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'stores',
    loadChildren: () =>
      import('./Features/Admin/stores/stores.module').then(
        (m) => m.StoresModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./Features/Admin/report-controls/report-controls.module').then(
        (m) => m.ReportControlsModule
      ),
  },

  //  Sales

  {
    path: 'SalesGross',
    loadChildren: () =>
      import('./Features/Sales/SalesGross/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'salesconversion',
    loadChildren: () =>
      import(
        './Features/Sales/SalesConversion/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'salesreconciliation',
    loadChildren: () =>
      import(
        './Features/Sales/SalesReconciliation/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'Inventory',
    loadChildren: () =>
      import('./Features/Sales/Inventory/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'NightlyReportSales',
    loadChildren: () =>
      import(
        './Features/Sales/NightlySalesSummary/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  //  ServiceandBodyShop

  {
    path: 'ServiceGross',
    loadChildren: () =>
      import(
        './Features/ServiceBodyShop/ServiceGross/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'servicereconciliation',
    loadChildren: () =>
      import(
        './Features/ServiceBodyShop/ServiceReconciliation/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  //  Parts

  {
    path: 'PartsGross',
    loadChildren: () =>
      import('./Features/Parts/PartsGross/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'partsreconciliation',
    loadChildren: () =>
      import(
        './Features/Parts/PartsReconciliation/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  {
    path: 'SimpleFS',
    loadChildren: () =>
      import(
        './Features/Accounting/FinancialStatement/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  {
    path: 'ScheduleView',
    loadChildren: () =>
      import(
        './Features/Accounting/SchedulesView/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  {
    path: 'LoyaltyActivity',
    loadChildren: () =>
      import(
        './Features/Others/LoyaltyActivity/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  {
    path: 'Loyalty',
    loadChildren: () =>
      import('./Features/Others/Loyalty/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: 'SalesPersonRanking',
    loadChildren: () =>
      import(
        './Features/Sales/SalesPersonRanking/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },

  {
    path: 'LoadBalancing',
    loadChildren: () =>
      import(
        './Features/ServiceBodyShop/LoadBalancing/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  //  Popups

  {
    path: 'Features/Sales/NightlySalesSummary/nightlysales-report',
    loadChildren: () =>
      import(
        './Features/Sales/NightlySalesSummary/nightlysales-report/nightlysales-report.module'
      ).then((m) => m.NightlysalesReportModule),
  },
  {
    path: 'Features/Sales/NightlySalesSummary/nightlysales-deals',
    loadChildren: () =>
      import(
        './Features/Sales/NightlySalesSummary/nightlysales-deals/nightlysales-deals.module'
      ).then((m) => m.NightlysalesDealsModule),
  },

  {
    path: 'Features/Accounting/FloorplanReconciliation/cit-reports',
    loadChildren: () =>
      import(
        './Features/Accounting/FloorplanReconciliation/cit-reports/cit-reports.module'
      ).then((m) => m.CitReportsModule),
  },
  {
    path: 'Features/Accounting/FloorplanReconciliation/cit-analyse',
    loadChildren: () =>
      import(
        './Features/Accounting/FloorplanReconciliation/cit-analyse/cit-analyse.module'
      ).then((m) => m.CitAnalyseModule),
  },

  {
    path: 'Features/Sales/SalesGross/salesgross-reports',
    loadChildren: () =>
      import(
        './Features/Sales/SalesGross/salesgross-reports/salesgross-reports.module'
      ).then((m) => m.SalesgrossReportsModule),
  },
  {
    path: 'Features/Sales/SalesGross/salesgross-details',
    loadChildren: () =>
      import(
        './Features/Sales/SalesGross/salesgross-details/salesgross-details.module'
      ).then((m) => m.SalesgrossDetailsModule),
  },

  {
    path: 'Features/ServiceBodyShop/ServiceGross/servicegross-reports',
    loadChildren: () =>
      import(
        './Features/ServiceBodyShop/ServiceGross/servicegross-reports/servicegross-reports.module'
      ).then((m) => m.ServicegrossReportsModule),
  },
  {
    path: 'Features/ServiceBodyShop/ServiceGross/servicegross-details',
    loadChildren: () =>
      import(
        './Features/ServiceBodyShop/ServiceGross/servicegross-details/servicegross-details.module'
      ).then((m) => m.ServicegrossDetailsModule),
  },

  {
    path: 'Features/Parts/PartsGross/partsgross-details',
    loadChildren: () =>
      import(
        './Features/Parts/PartsGross/partsgross-details/partsgross-details.module'
      ).then((m) => m.PartsgrossDetailsModule),
  },
  {
    path: 'Features/Parts/PartsGross/partsgross-reports',
    loadChildren: () =>
      import(
        './Features/Parts/PartsGross/partsgross-reports/partsgross-reports.module'
      ).then((m) => m.PartsgrossReportsModule),
  },

  {
    path: 'Features/Accounting/Schedules/schedule-reports',
    loadChildren: () =>
      import(
        './Features/Accounting/Schedules/schedule-reports/schedule-reports.module'
      ).then((m) => m.ScheduleReportsModule),
  },
  {
    path: 'Features/Accounting/Schedules/schedules-transactions',
    loadChildren: () =>
      import(
        './Features/Accounting/Schedules/schedules-transactions/schedules-transactions.module'
      ).then((m) => m.SchedulesTransactionsModule),
  },
  {
    path: 'Features/Accounting/CashFlow/cashflow-reports',
    loadChildren: () =>
      import(
        './Features/Accounting/CashFlow/cashflow-reports/cashflow-reports.module'
      ).then((m) => m.CashflowReportsModule),
  },
  {
    path: 'Features/Accounting/AccountMapping/accountmapping-report',
    loadChildren: () =>
      import(
        './Features/Accounting/AccountMapping/accountmapping-report/accountmapping-report.module'
      ).then((m) => m.AccountmappingReportModule),
  },
  {
    path: 'Features/Accounting/BalanceSheet/balancesheet-report',
    loadChildren: () =>
      import(
        './Features/Accounting/BalanceSheet/balancesheet-report/balancesheet-report.module'
      ).then((m) => m.BalancesheetReportModule),
  },
  {
    path: 'Features/Accounting/FinancialSummary/financialsummary-details',
    loadChildren: () =>
      import(
        './Features/Accounting/FinancialSummary/financialsummary-details/financialsummary-details.module'
      ).then((m) => m.FinancialsummaryDetailsModule),
  },
  {
    path: 'Features/Accounting/FinancialSummary/financialsummary-report',
    loadChildren: () =>
      import(
        './Features/Accounting/FinancialSummary/financialsummary-report/financialsummary-report.module'
      ).then((m) => m.FinancialsummaryReportModule),
  },
  {
    path: 'Features/Accounting/FloorplanReconciliation/floorplanrecon-details',
    loadChildren: () =>
      import(
        './Features/Accounting/FloorplanReconciliation/floorplanrecon-details/floorplanrecon-details.module'
      ).then((m) => m.FloorplanreconDetailsModule),
  },
  {
    path: 'Features/Accounting/IncomeStatement/incomestatement-report',
    loadChildren: () =>
      import(
        './Features/Accounting/IncomeStatement/incomestatement-report/incomestatement-report.module'
      ).then((m) => m.IncomestatementReportModule),
  },

  {
    path: 'Features/Accounting/FinancialStatement/financialstatement-details',
    loadChildren: () =>
      import(
        './Features/Accounting/FinancialStatement/financialstatement-details/financialstatement-details.module'
      ).then((m) => m.FinancialstatementDetailsModule),
  },
  {
    path: 'Features/Accounting/FinancialStatement/financialstatement-report',
    loadChildren: () =>
      import(
        './Features/Accounting/FinancialStatement/financialstatement-report/financialstatement-report.module'
      ).then((m) => m.FinancialstatementReportModule),
  },

  {
    path: 'Features/Accounting/SchedulesView/schedulesview-report',
    loadChildren: () =>
      import(
        './Features/Accounting/SchedulesView/schedulesview-report/schedulesview-report.module'
      ).then((m) => m.SchedulesviewReportModule),
  },
  {
    path: 'logreport',
    loadChildren: () =>
      import('./Features/Admin/log-reports/log-reports.module').then(
        (m) => m.LogReportsModule
      ),
  },

  {
    path: 'Features/Sales/SalesReconciliation/salesrecon-details',
    loadChildren: () =>
      import(
        './Features/Sales/SalesReconciliation/salesrecon-details/salesrecon-details.module'
      ).then((m) => m.SalesreconDetailsModule),
  },
  {
    path: 'Features/Sales/SalesReconciliation/salesrecon-report',
    loadChildren: () =>
      import(
        './Features/Sales/SalesReconciliation/salesrecon-report/salesrecon-report.module'
      ).then((m) => m.SalesreconReportModule),
  },
  {
    path: 'Features/Others/Loyalty/loyalty-report',
    loadChildren: () =>
      import(
        './Features/Others/Loyalty/loyalty-report/loyalty-report.module'
      ).then((m) => m.LoyaltyReportModule),
  },
  {
    path: 'Features/Others/LoyaltyActivity/loyaltyactivity-details',
    loadChildren: () =>
      import(
        './Features/Others/LoyaltyActivity/loyaltyactivity-details/loyaltyactivity-details.module'
      ).then((m) => m.LoyaltyactivityDetailsModule),
  },
  {
    path: 'Features/Others/LoyaltyActivity/loyaltyactivity-report',
    loadChildren: () =>
      import(
        './Features/Others/LoyaltyActivity/loyaltyactivity-report/loyaltyactivity-report.module'
      ).then((m) => m.LoyaltyactivityReportModule),
  },

  {
    path: 'Features/Sales/SalesPersonRanking/salesperson-details',
    loadChildren: () =>
      import(
        './Features/Sales/SalesPersonRanking/salesperson-details/salesperson-details.module'
      ).then((m) => m.SalespersonDetailsModule),
  },
  {
    path: 'Features/Sales/SalesPersonRanking/salesperson-report',
    loadChildren: () =>
      import(
        './Features/Sales/SalesPersonRanking/salesperson-report/salesperson-report.module'
      ).then((m) => m.SalespersonReportModule),
  },

  {
    path: 'Features/Sales/SalesConversion/salesconv-details',
    loadChildren: () =>
      import(
        './Features/Sales/SalesConversion/salesconv-details/salesconv-details.module'
      ).then((m) => m.SalesconvDetailsModule),
  },
  {
    path: 'Features/Sales/SalesConversion/salesconv-report',
    loadChildren: () =>
      import(
        './Features/Sales/SalesConversion/salesconv-report/salesconv-report.module'
      ).then((m) => m.SalesconvReportModule),
  },
  {
    path: 'Features/Accounting/SchedulesView/schedulesview-details',
    loadChildren: () =>
      import(
        './Features/Accounting/SchedulesView/schedulesview-details/schedulesview-details.module'
      ).then((m) => m.SchedulesviewDetailsModule),
  },
  {
    path: 'messenger',
    loadChildren: () =>
      import('./Global/messenger/messenger.module').then(
        (m) => m.MessengerModule
      ),
  },
  {
    path: 'Profile',
    loadChildren: () =>
      import('./Global/profile/profile.module').then((m) => m.ProfileModule),
  },

  {
    path: '**',
    loadChildren: () =>
      import('./Global/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
