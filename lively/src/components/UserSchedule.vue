<template>
  
    <div class="schedulePage">
        <div id="practiceTable">

            <div class="col">{{userSchedule.Monday}} </div>
            <div class="col"> {{userSchedule.Tuesday}} </div>
            <div class="col"> {{userSchedule.Wednesday}} </div>
            <div class="col"> {{userSchedule.Thursday}} </div>
            <div class="col"> {{userSchedule.Friday}} </div>
            <div class="col"> {{userSchedule.Saturday}} </div>
            <div class="col"> {{userSchedule.Sunday}} </div>
            
        
        </div>
        <table>
            <thead class="calendar-days">
            <th class="calendar-header">Monday</th>
            <th class="calendar-header">Tuesday</th>
            <th class="calendar-header">Wednesday</th>
            <th class="calendar-header">Thursday</th>
            <th class="calendar-header">Friday</th>
            <th class="calendar-header">Saturday</th>
            <th class="calendar-header">Sunday</th>
            </thead>
            
        </table>
        <div class="mainCalender">
            <!-- <div class="time-label-table">
                <div class="time-labels">12:00 AM</div>
                <div class="time-labels">1:00 AM</div>
                <div class="time-labels">2:00 AM</div>
                <div class="time-labels">3:00 AM</div>
                <div class="time-labels">4:00 AM</div>
                <div class="time-labels">5:00 AM</div>
                <div class="time-labels">6:00 AM</div>
                <div class="time-labels">7:00 AM</div>
                <div class="time-labels">8:00 AM</div>
                <div class="time-labels">9:00 AM</div>
                <div class="time-labels">10:00 AM</div>
                <div class="time-labels">11:00 AM</div>
                <div class="time-labels">12:00 PM</div>
            </div> -->
            <div id="scheduleGrid" class="grid">

        </div>

        </div>
    
    </div>

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";



export default {
  name: "UserSchedule",
  
  data() {
    return {
        data:[],
        days:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        userSchedule: {}
    };
  },

  created() {
    eventBus.$on('TBD', (data) => {
    //   this.drugs.push(data);
    //   this.drugs.sort();
    });

    eventBus.$on('scheduleIncoming', (data) => {
        console.log("LOOKL:J");
        console.log(data);
        this.userSchedule = data;
    //   this.drugs.push(data);
    //   this.drugs.sort();
    });
  },

  methods: {
    displaySchedule: function() {
        //creating table
        // const table_size = 7;
        // let schedule_table = document.getElementById('schedule').children[1];


        // for(let i=1; i<=24;i++){

        //     let tr = schedule_table.insertRow();

        //     //adding the tds for each day of the week 
        //     for(var j=1;j<=table_size;j++){		
        //         var td = tr.insertCell();
        //         var idName = (i-1) + "-" + (j-1); //row-col
        //         td.setAttribute('id',idName);
        //         td.setAttribute('class', 'td');
		// 	    td.classList.add("calendar-square");

        //         td.setAttribute('value',i)
                
        //     };

        // };

        let parentDiv = document.querySelector(".grid");
        for(let i=0;i<7;i++){
            for(let j=0;j<12;j++){
                let cellDiv = document.createElement("div");
                cellDiv.setAttribute("class", "calendar-square");
                cellDiv.setAttribute("id", i + "-" + j);
                parentDiv.appendChild(cellDiv);
            }
        }




    }
  },
  mounted(){
    this.displaySchedule()
 },
};
</script>
  


<style>

#practiceTable{
    display: flex;
    width: 100%;
    height: 800px;
    justify-content: space-between;
}

.col {
    height: 100%;
    width: 75px;
    background-color: lightblue;
}

.schedulePage{
    margin-top:20px;
    align-self: center;
}
.mainCalendar{
    /* display: flex !important;  */
}
#scheduleGrid{
    display:grid;
    grid-template-rows:repeat(12, 35px);
    grid-template-columns: repeat(7, 100px);
    grid-gap: 13px;
    color:white;
    /* float: right; */

}
.time-label-table{
    /* display: inline; */
    color: white;
}
.time-labels{
    margin-top:10px;
}
.calendar-days{
  
}
.calendar-header{
    width:100px;
    text-align: center;
    color:white;
    padding-left:10px;

}
.calendar-square{
    font-size:14px;
    border: 1px solid;
    height:35px;
    width:100%;
    height:100%;
    background-color:lightgrey;
}

</style>
