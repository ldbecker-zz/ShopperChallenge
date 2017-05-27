const React = require('react');

class Confirm extends React.Component {
	constructor(props) {
    super(props);

    if(!localStorage.getItem("application")) {
      window.location = "/";
      return;
    }

    this.state = {

    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!document.getElementById("bgcheck").checked) return;

    var application = JSON.parse(localStorage.getItem("application"));
    console.log(application);
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            To proceed with the interview, you must consent to a background check. Check the box, and press the button below to submit your application. <br/>
            I consent to a background check: <input id="bgcheck" type="checkbox"></input><br/>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      );
  }
}

module.exports = Confirm;