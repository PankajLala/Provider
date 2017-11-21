import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

import { Provider } from '../../model/provider';
import { ProviderService } from '../../services/provider.service';

@Component({
   selector: 'app-provider',
   templateUrl: './provider.component.html',
   styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit { 
    optionList: boolean = false;
    provider: Provider;
    filteredListOfProvider: Provider[];
    form:any;
    errorMessage: String;
    dataAvailableAfterFilter;
    submitted = false;
pageIndex: number =1;
totalCount:number;
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

   constructor(private providerService: ProviderService) { }
   
   ngOnInit(): void {
	   this.optionList = false;
   }

   getProviderAfterFilter(state: string, max_discharges: string,
                        min_discharges: string, max_average_covered_charges: string,
                        min_average_covered_charges: string, min_average_medicare_payments: string,
                        max_average_medicare_payments: string, columns: string) {
            this.dataAvailableAfterFilter= true;
            this.filteredListOfProvider = null;
            this.submitted = !this.submitted;
            this.providerService.getProviderAfterFilter(state, max_discharges,
            min_discharges, max_average_covered_charges,
            min_average_covered_charges, min_average_medicare_payments,
            max_average_medicare_payments, columns, this.pageIndex, 10)
		  .subscribe(
            data => {  
				    if(data["providerModel"].length > 0) {
                        this.filteredListOfProvider = data["providerModel"]; 
                        this.totalCount = data["totalCount"];
                        this.errorMessage='';
                        this.submitted = !this.submitted;
                        //this.setPage(1);
                                } else {
                                this.dataAvailableAfterFilter= false; 
                                 this.submitted = !this.submitted;
                                 this.totalCount = 0;
                                }	
			        },
            error =>  {
                this.errorMessage = <any>error;
                this.submitted = !this.submitted;
            }
               
		   );    
   }



   filterProvider(filterProviderForm: NgForm) {
       this.pageIndex = 1;
       this.prepareFilter(filterProviderForm)  ;
   }

   prepareFilter(filterProviderForm: NgForm){
     this.form = filterProviderForm ;
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
        return this.filteredListOfProvider[0][item]
   }

   toggleOption=()=>{
       this.optionList = !this.optionList;
   }

   prev=()=>{
       if(this.pageIndex>1){
        this.pageIndex = this.pageIndex - 1;
        this.prepareFilter(this.form);
       }
   }

 next=()=>{
     var count = this.pageIndex * 10;
     if( count <= this.totalCount){
       this.pageIndex = this.pageIndex+1;
       this.prepareFilter(this.form);
     }     
   }


}
    