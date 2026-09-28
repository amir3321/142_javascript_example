import {jobDetailsContentEl,spinnerJobDetailsEl} from '../common.js'
import renderSpinner from './Spinner.js';

const loadHandler=()=>{
const id= window.location.hash.substring(1);
jobDetailsContentEl.innerHTML='';

if(id){
    renderSpinner();

}

}

window.addEventListener('DOMContentLoad',loadHandler);