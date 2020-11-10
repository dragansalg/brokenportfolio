document.addEventListener("DOMContentLoaded",function(){    
    //collecting stored data from local storage and parse it.
    let event_list=JSON.parse(localStorage.getItem("full_event"));
    console.log(event_list);
    //Object of total list of events created.
    let all_events=new AllEvents(event_list);
    })
    class AllEvents{
        constructor(event_list){
            this.all_events=event_list;
            this.showAll(event_list);//shows all events when the page loads
            console.log(this.all_events);
            this.filter();//method to filter events according to category
            this.sort_date=document.getElementById("select");//a property for select
            this.sort_date.addEventListener("change",()=>{//click event runs the method to compare date of the event and sort according to it
                if (this.sort_date.options[this.sort_date.selectedIndex].text === "Date") {
                    this.sortDate(this.all_events); }
                if (this.sort_date.options[this.sort_date.selectedIndex].text === "Id") {
                    this.sortId(this.all_events); 
                }
            });
        }
        //methods to show events
        showAll(events){
            let main=document.getElementById("main");
            let all_events=document.createElement("div");
            all_events.setAttribute("id","events");
            for(let i=0;i<events.length;i++){
                 let event_list=document.createElement("div");
                event_list.className="event_list";
                let heading=document.createElement("h3");
                heading.textContent=events[i].name;
                console.log(events[i].name);
                let image=document.createElement("img");
                image.setAttribute("src",events[i].imageLocation);
                event_list.appendChild(heading);
                event_list.appendChild(image);
                all_events.appendChild(event_list)
            }
            main.appendChild(all_events);
        }
        //filters event accorging to category
        filter(){
            let event_filter=document.getElementsByClassName("event_filter");
            console.log(event_filter);
            for(let i=0;i<event_filter.length;i++){
            event_filter[i].addEventListener("click",(e)=>{
                document.getElementById("events").remove();
               
                if(e.target.innerHTML=="ALL")this.showAll(this.all_events);
                if(e.target.innerHTML=="CONFERENCE"){
                    let conference=this.all_events.filter(value=> value.category==="Conference");
                    this.showAll(conference);
                }   
                if(e.target.innerHTML=="MUSIC/SHOW"){
                    let show=this.all_events.filter(value=> value.category==="Music/Show");
                    this.showAll(show);
                }
                if(e.target.innerHTML=="SPORTS"){ 
                    let sports=this.all_events.filter(value=> value.category==="Sports");
                    this.showAll(sports);
                }
                if(e.target.innerHTML=="WEDDING"){
                    let wedding=this.all_events.filter(value=> value.category==="Wedding")
                    this.showAll(wedding);
                }
            })
            }
          
        }
        //sort according to date
        sortDate(event_list) {
            let sorted = event_list.sort(function (a, b) {
                let date1=a.date.slice(0,10);
                let date2=b.date.slice(0,10);
                return new Date(date1) - new Date(date2);
            })
            document.getElementById("events").remove();
            this.showAll(sorted);
        }
        //sort according to Id
        sortId(event_list){
            let sorted=event_list.sort((a,b)=>{
                return a.id-b.id
            })
            document.getElementById("events").remove();
            this.showAll(sorted);
        }
        }