import "./App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      ph : '',
    };
  }
  name = (event) => {
    this.setState({ fname: event.target.value });
    console.log(this.state.fname);
  };
  phone = (event) => {
    const value = event.target.value;

    if (value.length <= 10) {
      this.setState({ ph: value });
    }
    console.log(this.state.ph);
  };
  check = () => {
    if (this.state.fname.length === 0)
      alert("Name Required");
    else if(this.state.ph.length !== 10)
      alert("Ph Incorrect");
    else
      console.log(this.state.fname,this.state.ph);
  };
  
  render() {
    return (
      <Container>
        <h1>ASSAM DIDS</h1>
        <form>
          <Row>
            <Col xs={12} md={4}>
              <label>First Name</label>
              <input type="text" id="fname" onChange={this.name}></input>
            </Col>
            <p></p>
            <Col xs={12} md={4}>
              <label>Phone Number</label>
              <input type="number" id="ph" onChange={this.phone} value={this.state.ph}></input>
            </Col>
          </Row>
          <button type="submit" onClick={this.check}>
            Submit
          </button>
        </form>
      </Container>
    );
  }
}

export default App;