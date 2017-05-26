const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      registerVisible: false,
      phoneTypes: ['iPhone 6/6 Plus', 'iPhone 6s/6s Plus', 'iPhone 5/5S', 'iPhone 4/4S', 'iPhone 3G/3GS', 'Android 4.0+ (less than 2 years old)', 'Android 2.2/2.3 (over 2 years old)', 'Windows Phone', 'Blackberry', 'Other'],
      regions: ['San Francisco Bay Area', 'Chicago', 'Boston', 'NYC', 'Toronto', 'Berlin', 'Delhi'],
      workflowStates: ['applied', 'quiz_started', 'quiz_completed', 'onboarding_requested', 'onboarding_completed', 'hired', 'rejected']
    };

    this.showApplication = this.showApplication.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
  }

  submitApplication(e) {
    e.preventDefault();
    this.setState({registerVisible: false});
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
            <form onSubmit={this.submitApplication}>
              First Name: <input id="firstName" type="text"></input><br/>
              Last Name: <input id="lastName" type="text"></input><br/>
              Region: <select id="region">
                {this.state.regions.map(function(region) {
                  return (<option value={region}>{region}</option>);
                })}
              </select><br/>
              Phone: <input id="phone" type="text"></input><br/>
              Phone Type: <select id="phoneType">
                {this.state.phoneTypes.map(function(phoneType) {
                  return (<option value={phoneType}>{phoneType}</option>);
                })}
              </select><br/>
              Source: <input id="source" type="text"></input><br/>
              Are you over 21? <input id="over21" type="checkbox"></input><br/>
              Reason: <input id="reason" type="text"></input><br/>
              Workflow State: <select id="workflowState">
                {this.state.workflowStates.map(function(workflowState) {
                  return (<option value={workflowState}>{workflowState}</option>);
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

ReactDOM.render(<App/>, document.getElementById('app'));