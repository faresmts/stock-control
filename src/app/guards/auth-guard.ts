import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  canActivate():
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    if (! this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
      this.messageService.add({
        severity: 'error',
        summary: 'Não autorizado',
        detail: `Acesso negado`,
        life: 2000
      })
      return false;
    }

    return true;
  }

}
