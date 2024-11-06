import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      image: "",
      age: "",
      dob: "",
      agegrp: "",
      sex: "",
      ph: "",
      category: "",
      categoryCertificate: "",
      religion: "",
      otherReligion: "",
      address1: "",
      address2: "",
      city: "",
      stateName: "Assam",
      zipcode: "",
      aadharNo: "",
      id1: "",
      voterNo: "",
      id2: "",
      errors: {}, // New state for tracking errors
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: false },
    });
  };

  dobChanges = (e) => {
    const dob = e.target.value;
    this.setState({ dob }, () => {
      if (!dob) return;

      const date = new Date(dob);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dob);
        return;
      }

      const presentDate = new Date();
      let printAge = presentDate.getFullYear() - date.getFullYear();
      const monthDiff = presentDate.getMonth() - date.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && presentDate.getDate() < date.getDate())
      ) {
        printAge--;
      }

      let grp = "";
      if (printAge < 14) {
        grp = "Child";
      } else if (printAge < 18) {
        grp = "Teen";
      } else if (printAge < 60) {
        grp = "Adult";
      } else {
        grp = "Senior Citizen";
      }

      console.log(printAge);
      this.setState({ age: printAge, agegrp: grp });
    });
  };

  submit = async (event) => {
    event.preventDefault();
    const { fname, lname, zipcode } = this.state;
    let errors = {};

    // Validate required fields
    if (!fname) errors.fname = true;
    if (!lname) errors.lname = true;
    if (!zipcode) errors.zipcode = true;

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      alert("Please fill in all required fields");
      return;
    }

    var checkBox = document.getElementById("chbox");
    if (checkBox.checked === false) {
      alert("Please accept the Terms and Conditions");
      return;
    }

    // Form submission logic
    const formData = new FormData();
    formData.append("fname", this.state.fname);
    formData.append("lname", this.state.lname);
    formData.append("image", this.state.image);
    formData.append("age", this.state.age);
    formData.append("dob", this.state.dob);
    formData.append("agegrp", this.state.agegrp);
    formData.append("sex", this.state.sex);
    formData.append("ph", this.state.ph);
    formData.append("category", this.state.category);
    formData.append("categoryCertificate", this.state.categoryCertificate);
    formData.append("religion", this.state.religion);
    formData.append("otherReligion", this.state.otherReligion);
    formData.append("address1", this.state.address1);
    formData.append("address2", this.state.address2);
    formData.append("city", this.state.city);
    formData.append("stateName", this.state.stateName);
    formData.append("zipcode", this.state.zipcode);
    formData.append("aadharNo", this.state.aadharNo);
    formData.append("id1", this.state.id1);
    formData.append("voterNo", this.state.voterNo);
    formData.append("id2", this.state.id2);

    try {
      const resp = await fetch(
        "https://fdd01cb5-3dd9-435a-9d7d-f40e1493d698.mock.pstmn.io/submit",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await resp.json();
      console.log("SUCCESS", result);
      alert("Success");
    } catch (error) {
      alert("Error");
    }
  };

  render() {
    const { fname, lname, zipcode, errors } = this.state;

    return (
      <Container className="cont">
        <h1>Welcome to ASSAM DIDS</h1>
        <form>
          <h5>Registration Form</h5>
          <Container className="form pb-4">
            <h5 className="pt-3">Personal Details</h5>
            <hr />
            <Row className="form-filled">
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="fname">First Name<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.fname ? "error" : ""}`}
                    name="fname"
                    value={fname}
                    onChange={this.handleInputChange}
                    placeholder="First Name"
                  />
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.lname ? "error" : ""}`}
                    name="lname"
                    value={lname}
                    onChange={this.handleInputChange}
                    placeholder="Last Name"
                  />
                </div>
              </Col>
              {/* Add remaining fields similarly */}
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="zip">PIN</label>
                  <input
                    type="number"
                    className={`form-control ${errors.zipcode ? "error" : ""}`}
                    name="zipcode"
                    value={zipcode}
                    onChange={this.handleInputChange}
                    placeholder="Pin Code"
                  />
                </div>
              </Col>
            </Row>
          </Container>

          <div className="ch">
            <input type="checkbox" id="chbox" required />
            <label>
              I agree to the{" "}
              <a href="/" onClick={this.showtc}>
                Terms and Conditions
              </a>
            </label>
          </div>
          <div className="foot" style={{ marginTop: "5px", marginBottom: "15px" }}>
            <button className="btn btn-primary mr-5" type="reset" style={{ background: "gold", color: "black" }}>
              Reset
            </button>{" "}
            <button className="btn btn-primary" style={{ background: "green" }} onClick={this.submit}>
              Submit
            </button>
          </div>
        </form>
      </Container>
    );
  }
}

export default Test;
