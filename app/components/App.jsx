import { Router, Route, browserHistory } from 'react-router';
const React = require('react');
const ReactDOM = require('react-dom');
const Confirm = require('./Confirm.jsx');
const axios = require('axios');

class App extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      registerVisible: false,
      days: ["01","02","03","04","05","06","07","08","09",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      phoneTypes: ['iPhone 6/6 Plus', 'iPhone 6s/6s Plus', 'iPhone 5/5S', 'iPhone 4/4S', 'iPhone 3G/3GS', 'Android 4.0+ (less than 2 years old)', 'Android 2.2/2.3 (over 2 years old)', 'Windows Phone', 'Blackberry', 'Other'],
      regions: ['San Francisco Bay Area', 'Chicago', 'Boston', 'NYC', 'Toronto', 'Berlin', 'Delhi'],
      workflowStates: ['applied', 'quiz_started', 'quiz_completed', 'onboarding_requested', 'onboarding_completed', 'hired', 'rejected']
    };

    this.showApplication = this.showApplication.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
    this.makeApplications = this.makeApplications.bind(this);
    this.funnel = this.funnel.bind(this);
  }

  makeApplications(e) {
    e.preventDefault();

    var curApp = JSON.parse("{\"first_name\":\"Random\",\"last_name\":\"Applicant\",\"phone\":\"\",\"email\":\"\",\"source\":\"\",\"over_21\":false,\"reason\":\"\",\"region\":\"San Francisco Bay Area\",\"phone_type\":\"iPhone 6/6 Plus\",\"workflow_state\":\"applied\",\"date\":\"2014-12-01\"}");
  
    document.getElementById("status").innerHTML = "Making Application...";
    var workflowIndex = Math.floor(Math.random() * this.state.workflowStates.length);
    var dayIndex = Math.floor(Math.random() * 31);
    curApp.workflow_state = this.state.workflowStates[workflowIndex];
    curApp.date = "2014-12-" + this.state.days[dayIndex];
    axios.post("/newApplication", {
      application: curApp
    }).then(function(resp) {
      document.getElementById("status").innerHTML = "Made.";
      console.log(resp);
    });
  
    

  }

  submitApplication(e) {
    e.preventDefault();
    var application = {};
    var formElem = document.getElementById("registerForm");
    var inputs = formElem.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].id === "over_21") application[inputs[i].id] = inputs[i].checked;
      else application[inputs[i].id] = inputs[i].value;
    }
    var selects = formElem.getElementsByTagName("select");
    console.log(selects);
    for(var i = 0; i < selects.length; i++) {
      application[selects[i].id] = selects[i].value;
    }
    console.log(application);
    localStorage.setItem("application", JSON.stringify(application));
    window.location = "/confirm";
  }

  showApplication(e) {
    e.preventDefault();
    this.setState({registerVisible: true});
  }

  dayFromDate(date) {
    return parseInt(date.split("-")[2]);
  }

  dateFromDay(day) {
    if(day < 10) return "2014-12-0" + day;
    return "2014-12-" + day;
  }

  weekFromDate(date) {
    var day = this.dayFromDate(date);
    var week = Math.floor(day / 7);
    return week;
  }

  filter(applications) {
    var sorted = applications.sort(function(a, b) {
      if(a.date === b.date) return 0;
      if(a.date > b.date) return 1;
      return -1;
    });
    //mondays = 1, 8, 15, 22, 29
    var weeks = [{start: "2014-12-01", end: "2014-12-07"}, {start: "2014-12-08", end: "2014-12-14"}, {start: "2014-12-15", end: "2014-12-21"}, {start: "2014-12-22", end: "2014-12-28"}, {start: "2014-12-29", end: "2014-12-31"}];
    for(var i = 0; i < sorted.length; i++) {
      var week = this.weekFromDate(sorted[i].date);
      var workflowState = sorted[i].workflow_state;
      if(!weeks[week][workflowState]) weeks[week][workflowState] = 0;
      weeks[week][workflowState] += 1;
      if(workflowState === "quiz_completed") {
        if(!weeks[week]["quiz_started"]) weeks[week]["quiz_started"] = 0;
        weeks[week]["quiz_started"] += 1;
        if(!weeks[week]["applied"]) weeks[week]["applied"] = 0;
        weeks[week]["applied"] += 1;
      } else if (workflowState === "onboarding_completed") {
        if(!weeks[week]["onboarding_requested"]) weeks[week]["onboarding_requested"] = 0;
        weeks[week]["onboarding_requested"] += 1;
        if(!weeks[week]["applied"]) weeks[week]["applied"] = 0;
        weeks[week]["applied"] += 1;
      } else if (workflowState !== "applied") {
        if(!weeks[week]["applied"]) weeks[week]["applied"] = 0;
        weeks[week]["applied"] += 1;
      }
    }
    var startWeek = this.weekFromDate(sorted[0].date);
    var endWeek = this.weekFromDate(sorted[sorted.length - 1].date);
    var goodWeeks = weeks.slice(startWeek, endWeek + 1);
    console.log(goodWeeks);
    document.getElementById("funnelDisplay").innerHTML = JSON.stringify(goodWeeks);
  }

  funnel(e) {
    e.preventDefault();
    if(document.getElementById("startDate").value >= document.getElementById("endDate").value) {
      alert("Not a valid date range.");
      return;
    }
    var context = this;
    axios.post('/funnel', {startDate: document.getElementById("startDate").value, endDate: document.getElementById("endDate").value})
    .then(function(resp) {
      console.log(resp);
      var filtered = context.filter(resp.data);
      console.log(filtered);
    });
  }

  render() {
    return (
        <div>
          Hello!!!
          {this.state.registerVisible ? 
            <form id="registerForm" onSubmit={this.submitApplication}>
              First Name: <input id="first_name" type="text"></input><br/>
              Last Name: <input id="last_name" type="text"></input><br/>
              Region: <select id="region">
                {this.state.regions.map(function(region) {
                  return (<option value={region}>{region}</option>);
                })}
              </select><br/>
              Phone: <input id="phone" type="text"></input><br/>
              Phone Type: <select id="phone_type">
                {this.state.phoneTypes.map(function(phoneType) {
                  return (<option value={phoneType}>{phoneType}</option>);
                })}
              </select><br/>
              Email: <input id="email" type="text"></input><br/>
              Source: <input id="source" type="text"></input><br/>
              Are you over 21? <input id="over_21" type="checkbox"></input><br/>
              Reason: <input id="reason" type="text"></input><br/>
              Workflow State: <select id="workflow_state">
                {this.state.workflowStates.map(function(workflowState) {
                  return (<option value={workflowState}>{workflowState}</option>);
                })}
              </select><br/>
              Date: (December X 2014) <select id="date">
                {this.state.days.map(function(day) {
                  return (<option value={"2014-12-" + day}>{day}</option>);
                })}
              </select><br/>
              <button type="submit">Submit Application</button>
            </form> 
            : 
            <form onSubmit={this.showApplication}>
              <button type="submit">Submit New Application</button>
            </form>
          }<br/><br/>
          <form id="makeForm" onSubmit={this.makeApplications}>
            Populate the DB With Random Applications: <br/>
            <button type="submit" id="makeApplications">Make Random Application</button>
            <div id="status">Status: Idle</div>
          </form><br/><br/>
          <form id="funnelForm" onSubmit={this.funnel}>
            Start Date: (December X 2014) : <select id="startDate">{this.state.days.map(function(day) {
              return (<option value={"2014-12-" + day}>{day}</option>);
            })}</select><br/>
            End Date: (December X 2014) : <select id="endDate">{this.state.days.map(function(day) {
              return (<option value={"2014-12-" + day}>{day}</option>);
            })}</select><br/>
            <button type="submit">Get Application Data for Range</button>
            <div id="funnelDisplay"></div>
          </form>
        </div>
      );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/confirm" component={Confirm}></Route>
  </Router>
), document.getElementById('app'));