import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STAGENAME from '@salesforce/schema/Opportunity.StageName';

export default class CustomPicklist extends LightningElement {
    @track value;

    @wire(getObjectInfo, {objectApiName: OPPORTUNITY_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {recordTypeId: '$objectInfo.data.defaultRecordTypeId',fieldApiName: STAGENAME})
    StagePicklistValues;

    handleChange(event){
        console.log(event);
    }
}