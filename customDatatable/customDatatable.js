import LightningDatatable from 'lightning/datatable';
import stagePicklist from './stagePicklist.html';
 
export default class CustomDatatable extends LightningDatatable {
    static customTypes = {
        stageCombox: {
            template: stagePicklist
        }
    };
}