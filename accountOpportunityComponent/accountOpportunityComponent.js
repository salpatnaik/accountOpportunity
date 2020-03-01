import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/accordianLWCController.getAccounts';
 
export default class AccountOpportunityComponent extends LightningElement {
    @track accountList;
    @track error;
    @track showAccordians = false;
    allAccountList;

    connectedCallback(){
        this.getAccountData();
    }

    getAccountData(){
        getAccounts()
            .then(result => {
                console.log('result---'+JSON.stringify(result));
                this.accountList = result;
                this.showAccordians = true;
                this.allAccountList = result;
                });           
            console.log('accountList---'+JSON.stringify(this.accountList));
    }

    handleSearchChange(event){
        const searchText = event.target.value;
        if(searchText){
            this.filterData(searchText.toLocaleLowerCase());
        } else{
            this.clearData();
        }
    }

    filterData(searchText){
        //const searchText = this.template.querySelector('.input_text').value.toLocaleLowerCase();
        console.log('searchText'+searchText);
        this.accountList = this.allAccountList;
        if(this.accountList) {
            let mydata = [];
            this.accountList.forEach((acc) => {
                let toBeAdded = false;
                console.log('toBeAdded'+toBeAdded);
                if(acc.Name.toLocaleLowerCase().includes(searchText)){
                    console.log('Account'+acc.Name.toLocaleLowerCase());
                    toBeAdded = true;
                } else if(acc.Opportunities){
                    acc.Opportunities.forEach((opp) => {
                        if(opp.Name.toLocaleLowerCase().includes(searchText)){
                            toBeAdded = true;
                        }
                    });
                }
                if(toBeAdded == true){
                    mydata.push(acc);
                }
            });           
            this.accountList = mydata;
            console.log('serachVallue'+this.accountList);
            this.template.querySelector('c-custom-accordian-section').setAccountData(this.accountList);
        }
    }

    clearData(){
        console.log('clear');
        this.template.querySelector('.input_text').value = '';        
        this.accountList = this.allAccountList;
        console.log('clearValue'+this.accountList);
        this.template.querySelector('c-custom-accordian-section').setAccountData(this.accountList);
    }
}