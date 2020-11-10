//fetching data from external json file and sending it to local storage.
//will only fetch if local storage is not already defined!
if (!localStorage.getItem("full_event")) {
    fetch('../scripts/events.json')
    .then(response=>response.json())
    .then(data=>{
    // stringify the json and sending data to local storage.
    localStorage.setItem('full_event',JSON.stringify(data));
    });
}
