import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "src/app/@share/constants/api-url.enum";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    private API_ENDPOINT_SERVICES = environment.apiUrl + API_URL.SERVICES;
    private updateUrl(req: string) {
        return this.API_ENDPOINT_SERVICES + req;
    }

    constructor(private http: HttpClient) { }

    get(url: string, options?: any): Observable<any> {
        url = this.updateUrl(url);
        if (options && options.params) {
            options.params = this.modifySearchParams(options.params);
        }
        return this.http.get(url, options);
    }

    post(url: string, body: any = null, options?: any): Observable<any> {
        url = this.updateUrl(url);
        return this.http.post(url, body, options);
    }

    put(url: string, body: any = null, options?: any): Observable<any> {
        url = this.updateUrl(url);
        return this.http.put(url, body, options);
    }

    delete(url: string, body: any = null, options?: any): Observable<any> {
        url = this.updateUrl(url);
        return this.http.delete(url);
      }

    public modifySearchParams(params: any) {
        if (!params.filter) {
            return params;
        } else {
            for (const prop of Object.keys(params.filter)) {
                if (
                    params.filter[prop] !== null &&
                    typeof params.filter[prop] !== 'undefined'
                ) {
                    Object.assign(params, { [prop]: params.filter[prop] });
                }
            }
            delete params.filter;
            return params;
        }
    }
}