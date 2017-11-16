import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProviderService } from './provider.service';
import { Provider } from './provider';
import * as _ from 'lodash';
import { PagerService } from './pagerservice';

@Component({
   selector: 'app-provider',
   templateUrl: './provider.component.html',
   styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit { 
   optionList: boolean = false;
   provider: Provider;
   filteredListOfProvider: Provider[];
   errorMessage: String;
   dataAvailableAfterFilter;
   states = [ 
                {name:'UT'},
                {name:'NC'},
                {name:'WI'},
                {name:'MA'},
                {name:'MI'},
                {name:'TN'},
                {name:'NH'},
                {name:'AK'},
                {name:'OK'},
                {name:'KY'},
                {name:'CO'},
                {name:'NV'},
                {name:'SD'},
                {name:'PA'},
                {name:'WV'},
                {name:'GA'},
                {name:'RI'},
                {name:'IN'},
                {name:'DC'},
                {name:'MD'},
                {name:'OR'},
                {name:'CT'},
                {name:'AR'},
                {name:'MN'},
                {name:'AL'},
                {name:'ID'},
                {name:'TX'},
                {name:'NM'},
                {name:'ND'},
                {name:'ME'},
                {name:'IL'},
                {name:'MO'},
                {name:'SC'},
                {name:'DE'},
                {name:'FL'},
                {name:'CA'},
                {name:'WY'},
                {name:'HI'},
                {name:'OH'},
                {name:'NE'},
                {name:'VT'},
                {name:'NY'},
                {name:'MS'},
                {name:'NJ'},
                {name:'IA'},
                {name:'KS'},
                {name:'LA'},
                {name:'WA'},
                {name:'AZ'},
                {name:'MT'},
                {name:'VA'},

          ];
   columnOptions = [
       {name:'DRDefinition', selected: false },
       {name:'ProviderId', selected: false },
       {name:'ProviderName', selected: false },
       {name:'ProviderStreetAddress', selected: false },
       {name:'ProviderCity', selected: false },
       {name:'ProviderState', selected: false },
       {name:'ProviderZipCode', selected: false },
       {name:'HospitalReferralRegionDescription', selected: false },
       {name:'TotalDischarges', selected: false },
       {name:'AverageCoveredCharges', selected: false },
       {name:'AverageTotalPayments', selected: false },
       {name:'AverageMedicarePayments', selected: false }
   ];

   selectedOptions: any={};
  pager: any = {};
  pagedItems: any[];

   constructor(private providerService: ProviderService, private pagerService: PagerService) { }
   
   ngOnInit(): void {
	   this.optionList = false;
   }

   getProviderAfterFilter(state: string, max_discharges: string,
                        min_discharges: string, max_average_covered_charges: string,
                        min_average_covered_charges: string, min_average_medicare_payments: string,
                        max_average_medicare_payments: string, columns: string) {
        this.dataAvailableAfterFilter= true;
		    this.filteredListOfProvider = null;
        this.providerService.getProviderAfterFilter(state, max_discharges,
                        min_discharges, max_average_covered_charges,
                        min_average_covered_charges, min_average_medicare_payments,
                        max_average_medicare_payments, columns)
		  .subscribe(
            data => {  
				    if(data.length > 0) {
              this.filteredListOfProvider = data; 
              this.errorMessage='';
              this.setPage(1);
					} else {
					  this.dataAvailableAfterFilter= false; 
					}	
			    },
                error =>  {
                    this.errorMessage = <any>error;
                }
		   );    
   }

setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.filteredListOfProvider.length, page);
 
        // get current page of items
        this.pagedItems = this.filteredListOfProvider.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

   filterProvider(filterProviderForm: NgForm) {
      let state = filterProviderForm.controls['state'].value;
      let max_discharges = filterProviderForm.controls['max_discharges'].value;
      let min_discharges = filterProviderForm.controls['min_discharges'].value;
      let max_average_covered_charges = filterProviderForm.controls['max_average_covered_charges'].value;
      let min_average_covered_charges = filterProviderForm.controls['min_average_covered_charges'].value;
      let min_average_medicare_payments = filterProviderForm.controls['min_average_medicare_payments'].value;
      let max_average_medicare_payments = filterProviderForm.controls['max_average_medicare_payments'].value;
      let columns = _.filter(this.columnOptions, x => x.selected).map(x => x.name).join(",");
    
      this.selectedOptions = _.clone(_.filter(this.columnOptions, x => x.selected));
      this.getProviderAfterFilter(state, max_discharges,
                        min_discharges, max_average_covered_charges,
                        min_average_covered_charges, min_average_medicare_payments,
                        max_average_medicare_payments, columns);
   }

   checkItem(item: string){
        return this.pagedItems[0][item]
   }

   toggleOption=()=>{
       this.optionList = !this.optionList;
   }

}
    