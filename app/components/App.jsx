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
    //this.setState({registerVisible: false});
  }

  showApplication(e) {
    e.preventDefault();
    this.setState({registerVisible: true});
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
          }
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