import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Provider } from '../model/provider';

@Injectable()
export class ProviderService extends BaseService {
        
    private path = 'api/provider';
	constructor(private http:Http) { 
            super();
    }

    getProviderAfterFilter(state: string, max_discharges: string,
                        min_discharges: string, max_average_covered_charges: string,
                        min_average_covered_charges: string, min_average_medicare_payments: string,
                        max_average_medicare_payments: string, columns: string): Observable<Provider[]> {
        const url = this.getApiUrl() + this.path;
        let myHeaders = new Headers();
        
        myHeaders.append('Authorization', `bearer ${localStorage.getItem('access_token')}`);   
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
        return this.http.get(url, options)
		        .map(this.extractData)
		        .catch(this.handleError);
    }
	private extractData(res: Response) {
		return res.json();
    }

}