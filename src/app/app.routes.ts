import { Routes } from '@angular/router';
import { LoginComponent  } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent  } from './dashboard/dashboard.component';
import { AuthGuard } from './../../auth.check';
import { ContractorDashboardComponent } from './contractor-dashboard/contractor-dashboard.component';
import { EntityManagementComponent } from './entity-management/entity-management.component';
import { WorkOrderComponent  } from './work-order/work-order.component';
import { BillsManagementComponent } from './bills-management/bills-management.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'contractors', component: ContractorDashboardComponent , canActivate: [AuthGuard] },
    { path: 'entity-management', component: EntityManagementComponent, canActivate: [AuthGuard]  },
    { path: 'work-order' , component: WorkOrderComponent, canActivate: [AuthGuard] },
    { path: 'bills-management' , component: BillsManagementComponent, canActivate: [AuthGuard]  }
];
