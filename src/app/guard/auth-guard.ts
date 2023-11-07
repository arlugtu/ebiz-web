import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenService: TokenService
    ) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
        // if (this.tokenService.isTokenExpired()) {
        //     this.router.navigate(['/authentication/login']);
        //     return false;
        // } else {
        //     return true;
        // }
        return true;
    }
}