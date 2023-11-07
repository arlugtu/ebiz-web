import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TokenService } from "./token.service";
import { Observable, tap } from "rxjs";

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private tokenService: TokenService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
        // const accessToken = this.tokenService.getToken();
        // if (request.url.indexOf("/token") > -1) {
        //     return next.handle(request);
        // } else {
        //     if (accessToken) {
        //         const isExpired = this.tokenService.isTokenExpired();
        //         if (!isExpired) {
        //             request = request.clone({
        //                 setHeaders: {
        //                     Authorization: `Bearer ${accessToken}`
        //                 }
        //             });
        //             return next.handle(request).pipe(tap(() => { }, (err: any) => {
        //                 if (err instanceof HttpErrorResponse) {
        //                     if (err.status !== 401) {
        //                         return;
        //                     }
        //                     this.tokenService.removeToken();
        //                     this.router.navigateByUrl("/authentication/login");
        //                 }
        //             }));;
        //         } else {
        //             this.tokenService.removeToken();
        //             this.router.navigateByUrl("/authentication/login");
        //             return next.handle(request);
        //         }
        //     } else {
        //         this.router.navigateByUrl("/authentication/login");
        //         return next.handle(request);
        //     }
        // }
    }
}