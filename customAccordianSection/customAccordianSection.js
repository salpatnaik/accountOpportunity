import { LightningElement, track, api,wire } from 'lwc';
import getAccounts from '@salesforce/apex/accordianLWCController.getAccounts';
 
export default class CustomAccordianSection extends LightningElement {
    @track data = [];
    @api accountList;

    /*@wire(getAccounts) 
    wiredResult({ error, data}) {
        if(data) {
            let mydata = [];
            data.forEach((acc) => {
                let accData = new Object();
                accData.Account = acc;
                accData.isExpanded = false;
                mydata.push(accData);
            });           
            this.data = mydata;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.data = undefined;
        }
        
    }*/
    
    connectedCallback(){
        this.setAccountData(this.accountList)
    }

    @api
    setAccountData(accList){
        console.log('child---'+JSON.stringify(accList));
        if(accList) {
            let mydata = [];
            accList.forEach((acc) => {
                let accData = new Object();
                accData.Account = acc;
                accData.isExpanded = acc.isExpanded;
                mydata.push(accData);
            });           
            this.data = mydata;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.data = undefined;
        }
        console.log('api'+accList);
        console.log('track'+this.data);
    }

    handleClick(event) {
        console.log('Id:'+event.target.dataset.targetId);
        let mydata = [];
        this.data.forEach((acc) => {
            let accData = new Object();
            accData.Account = acc.Account;
            if(acc.Account.Id === event.target.dataset.targetId){
                accData.isExpanded = !acc.isExpanded;
            }
            else{
                accData.isExpanded = acc.isExpanded;
            }
            mydata.push(accData);
        });
        this.data=mydata; 
    }
}