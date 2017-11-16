import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { Provider } from './provider';

@Injectable()
export class ProviderService {
    url = environment.apiUrl;
    
    
	constructor(private http:Http) { }

    getProviderAfterFilter(state: string, max_discharges: string,
                        min_discharges: string, max_average_covered_charges: string,
                        min_average_covered_charges: string, min_average_medicare_payments: string,
                        max_average_medicare_payments: string, columns: string): Observable<Provider[]> {
		let myHeaders = new Headers();
		myHeaders.set('Content-Type', 'application/json');   
		let myParams = new URLSearchParams();
            myParams.set('state', state);
            myParams.set('max_discharges', max_discharges);
            myParams.set('min_discharges', min_discharges);
            myParams.set('max_average_covered_charges', max_average_covered_charges);
            myParams.set('min_average_covered_charges', min_average_covered_charges);
            myParams.set('min_average_medicare_payments', min_average_medicare_payments);
            myParams.set('max_average_medicare_payments', max_average_medicare_payments);		
            myParams.set('columns', columns);	
        let options = new RequestOptions({ headers: myHeaders, params: myParams });
        return this.http.get(this.url, options)
		        .map(this.extractData)
		        .catch(this.handleError);
    }
	private extractData(res: Response) {
		return res.json();
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
    }
}