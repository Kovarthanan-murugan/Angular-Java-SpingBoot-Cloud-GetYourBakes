import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ConfirmCode} from './registration/confirmcode.component';
import { AuthGuard } from '../app/login-registration-service/authguard.service';
import { CartComponent } from './cart/cart.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
      
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details',
      canActivate: [AuthGuard]
    },
    {
      path:'login',
      component:LoginComponent,
      title:"Login"
    },
    {
      path:'registration',
      component:RegistrationComponent,
      title:'Registration'
    },
    {
      path:'confirmcode',
      component:ConfirmCode,
      title:'confirmcode'
    },
    {
      path:'cart',
      component:CartComponent,
      title:'confirmcode',
      canActivate: [AuthGuard]
    }

  ];
  
  export default routeConfig;