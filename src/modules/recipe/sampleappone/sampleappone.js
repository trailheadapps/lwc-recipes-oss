import{ LightningElement, track } from 'lwc';
export default class Paginator extends LightningElement {
@track responsedata;

@track conversionFrom;
@track conversionTo;


 handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
    }

    
connectedCallback(){
fetch('https://api.exchangeratesapi.io/latest', // End point URL
{
// Request type
method:"GET",
headers:{
// content type
"Content-Type": "application/json",
// adding your access token
"Authorization": "Bearer ",
"Access-Control-Allow-Origin": '*'
}
})
.then((response) => {
return response.json(); // returning the response in the form of JSON
})
.then((jsonResponse) => {
console.log('jsonResponse ===> '+JSON.stringify(jsonResponse));
})
.catch(error => {
console.log('callout error ===> '+JSON.stringify(error));
})
}
}