import { LightningElement, track, api } from 'lwc';
import getOpportunities from '@salesforce/apex/accordianLWCController.getOpportunities';

const columns = [
    { label: 'Opportunity', fieldName: 'Name', editable: true },
    { label: 'Account', fieldName: 'AccountName', type: 'text', editable: true },
    { label: 'Stage', fieldName: 'StageName', type: 'text', editable: true },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date', editable: true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', editable: true },
];

export default class OpportunityTable extends LightningElement {
    @track data = [];
    @track columns = columns;
    @track rowOffset = 0;
    @api opportunities;
    @track draftValues = [];

    @api
    setOppotunityData(selectedOpportunities,rowOffsetNumber){
        this.setTableData(selectedOpportunities,rowOffsetNumber);
    }

    connectedCallback(){
        this.setTableData(this.opportunities,0);
    }
    
    setTableData(selectedOpportunities,rowOffsetNumber){
        if(selectedOpportunities) {
            let mydata = [];
            selectedOpportunities.forEach((opp) => {
                let oppData = new Object();
                oppData.Id = opp.Id;
                oppData.Name = opp.Name;
                oppData.AccountName = opp.Account.Name;
                oppData.StageName = opp.StageName;
                oppData.CloseDate = opp.CloseDate;
                oppData.Amount = opp.Amount;
                mydata.push(oppData);
            });
            this.rowOffset = rowOffsetNumber;
            this.draftValues = [];
            this.data = mydata;
        }
    }

    handleSave(){
        
    }
}