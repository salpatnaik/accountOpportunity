import { LightningElement, api, track } from 'lwc';
 
export default class CustomTableSection extends LightningElement {
    @track data;
    @api allOpportunities;
    @track page = 1; 
    @track startingRecord = 1; 
    @track endingRecord = 0; 
    @track pageSize = 5; 
    @track totalRecountCount = 0; 
    @track totalPage = 0;
    @track showPagination = true;

    connectedCallback(){
        if(this.allOpportunities){
            this.totalRecountCount = this.allOpportunities.length;
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
            if(this.totalPage===1){
                this.showPagination = false;
            }
            this.data = this.allOpportunities.slice(0,this.pageSize);
            this.endingRecord = this.pageSize;
        }
    }

    displayRecordPerPage(page) {
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount) ? this.totalRecountCount : this.endingRecord; 
        this.data = this.allOpportunities.slice(this.startingRecord, this.endingRecord);
        this.template.querySelector('c-opportunity-table').setOppotunityData(this.data,this.startingRecord);
        this.startingRecord = this.startingRecord + 1;
    }

    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);            
        }             
    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        }
    }
}