import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './router.service';
import { ToastService } from './toast.service';
import { EventTypes } from '../models/event-types';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private routerSrvice: RouterService, private toastService: ToastService,) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("salakaimmouser") != null) {
      return true
    }
    this.routerSrvice.route("accueil")
    this.toastService.showToast(EventTypes.Warning, "Connexion requise", "Veuillez vous connecter pour accéder à cette page.")
    return false
  }
}
