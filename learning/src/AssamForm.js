import React from "react";
// import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Modal from "react-bootstrap/Modal";
// import getStaticText from "../../../config"
// import keys from '../../../common/keys'
// import storage from "../../../utility/encryptData";
// import { getSiteContentAction } from '../../../store/actions/getSiteContentAction'
// import history from "../../../history"
import "./App.css";
// import NavbarTop from '../Navbar/topNavbar';
// import NavbarHome from '../Navbar/navbarHome';
// import Navbar from '../Navbar';
// import FooterWebHome from '../Footer/footerHomeWeb';
// import "../HomeFirstTimeUser/homePage.css"
// import { event } from "jquery";
// import { result } from "lodash-es";

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
    };
  }
  firstName = (e) => {
    this.setState({ fname: e.target.value });
  };
  lastName = (e) => {
    this.setState({ lname: e.target.value });
  };
  setImage = (e) => {
    this.setState({ image: e.target.value });
  };
  dobChanges = (e) => {
    const dob = e.target.value;
    this.setState({ dob }, () => {
      if (!dob) return; // Check if dob is empty

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

  gender = (e) => {
    this.setState({ sex: e.target.value });
  };
  phone = (e) => {
    let val = e.target.value;

    if (val.length <= 10) this.setState({ ph: val });
  };
  getCertificate = (e) => {
    let cat = document.getElementById("category");
    // console.log(cat.value);
    if (cat.value === "gen")
      document.getElementById("categoryCertificate").disabled = true;
    else document.getElementById("categoryCertificate").disabled = false;

    this.setState({ category: e.target.value });
    // console.log(this.state.category);
  };
  certificate = (e) => {
    this.setState({ categoryCertificate: e.target.value });
  };
  religionChange = (event) => {
    this.setState({ religion: event.target.value, otherReligion: "" });
  };
  otherReligion = (e) => {
    this.setState({ otherReligion: e.target.value });
  };
  add1 = (e) => {
    this.setState({ address1: e.target.value });
  };
  add2 = (e) => {
    this.setState({ address2: e.target.value });
  };
  setCity = (e) => {
    this.setState({ city: e.target.value });
  };
  showtc = (event) => {
    alert("Terms And Conditions");
  };
  aadhar = (event) => {
    const aNo = event.target.value;
    if (aNo.length <= 12) this.setState({ aadharNo: aNo });
  };
  voter = (event) => {
    const vNo = event.target.value;
    if (vNo.length <= 10) this.setState({ voterNo: vNo });
  };
  pin = (event) => {
    const zipCode = event.target.value;
    if (zipCode.length <= 6) this.setState({ zipcode: zipCode });
  };
  aadharCard = (e) => {
    this.setState({ id1: e.target.value });
  };
  voterCard = (e) => {
    this.setState({ id2: e.target.value });
  };
  submit = async (event) => {
    event.preventDefault();
    var checkBox = document.getElementById("chbox");
    if (checkBox.checked === false)
      alert("Please accept the Terms and Conditions");
    else {
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
        // if (resp.ok) {
          const result = await resp.json();
          console.log("SUCCESS", result);
          alert("Success");
        
      } catch (error) {
        alert("Error");
      }
    }
    console.log(this.state);
  };
  render() {
    return (
      <Container className="cont">
        <h1>Welcome to ASSAM DIDS</h1>
        <form>
          {/* <form className="was-validated"> */}
          <h5>Registration Form</h5>
          <Container className="form pb-4">
            <h5 className="pt-3">Personal Details</h5>
            <hr></hr>
            <p className="star">(*) Marked fields are mandatory</p>
            <Row className="form-filled">
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="name">First Name<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.firstName}
                    value={this.state.fname}
                    id="fname"
                    placeholder="First Name"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="name">Last Name<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.lastName}
                    value={this.state.lname}
                    id="lname"
                    placeholder="Last Name"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="photo">Image<span style={{color: "red"}}>*</span></label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={this.setImage}
                    value={this.state.image}
                    id="image"
                    accept=".png, .jpg, .jpeg"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth<span style={{color: "red"}}>*</span></label>
                  <input
                    type="date"
                    id="dob"
                    className="form-control"
                    onChange={this.dobChanges}
                    value={this.state.dob}
                    max={new Date().toISOString().split("T")[0]}
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    placeholder="Age"
                    value={this.state.age}
                    disabled
                  ></input>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="age-grp">Age Group</label>
                  <input
                    type="text"
                    className="form-control"
                    id="age-grp"
                    value={this.state.agegrp}
                    placeholder="Age Group"
                    disabled
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="sex">Gender<span style={{color: "red"}}>*</span></label>
                  <select
                    id="sex"
                    className="form-control"
                    onChange={this.gender}
                    value={this.state.sex}
                    placeholder="gender"
                  >
                    <option selected value="" disabled>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="fmale">Female</option>
                    <option value="rnc">Rather not say</option>
                  </select>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="ph">Phone Number<span style={{color: "red"}}>*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter a valid 10 digit phone number"
                    onChange={this.phone}
                    value={this.state.ph}
                    id="ph"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="category">Select Category<span style={{color: "red"}}>*</span></label>
                  <select
                    className="form-control"
                    onChange={this.getCertificate}
                    value={this.state.category}
                    id="category"
                  >
                    <option selected value="" disabled>
                      Category
                    </option>
                    <option value="gen">General</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                    <option value="obc">OBC</option>
                    <option value="oth">Other</option>
                  </select>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="certf">Provide Category Certificate<span style={{color: "red"}}>*</span></label>
                  <input
                    type="file"
                    className="form-control"
                    id="categoryCertificate"
                    onChange={this.certificate}
                    value={this.state.categoryCertificate}
                    accept=".pdf, .jpg, .png, .jpeg"
                    disabled
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="religion">Religion<span style={{color: "red"}}>*</span></label>
                  <select
                    className="form-control"
                    placeholder="religion"
                    id="religion"
                    onChange={this.religionChange}
                    value={this.state.religion}
                  >
                    <option selected value="" disabled>
                      Religion
                    </option>
                    <option value="r1">Hindu</option>
                    <option value="r2">Muslim</option>
                    <option value="r3">Jain</option>
                    <option value="r4">Sikh</option>
                    <option value="r5">Buddhist</option>
                    <option value="r6">Christian</option>
                    <option value="r7">Parsi</option>
                    <option value="oth">Other</option>
                  </select>
                </div>
              </Col>
              <Col xs={12} md={4}>
                {this.state.religion === "oth" && (
                  <div className="form-group">
                    <label htmlFor="otherReligion">
                      Please Specify Religion<span style={{color: "red"}}>*</span>
                    </label>
                    <input
                      type="text"
                      onChange={this.otherReligion}
                      value={this.state.otherReligion}
                      className="form-control"
                      id="oth-rel"
                    ></input>
                  </div>
                )}
              </Col>
            </Row>
            <hr></hr>
            <h5>Address Details</h5>
            <Row>
              <Col xs={12} md={12}>
                <div className="form-group">
                  <label htmlFor="inputAddress">Address<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Street Number, District... "
                    onChange={this.add1}
                    value={this.state.address1}
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={12}>
                <div className="form-group">
                  <label htmlFor="inputAddress2">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, floor, locality... "
                    onChange={this.add2}
                    value={this.state.address2}
                  ></input>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="city">City/Village<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="Enter City/Village Name"
                    onChange={this.setCity}
                    value={this.state.city}
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="state">State<span style={{color: "red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputState"
                    value={this.state.stateName}
                    disabled
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="form-group">
                  <label htmlFor="zip">PIN<span style={{color: "red"}}>*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="zip"
                    onChange={this.pin}
                    value={this.state.zipcode}
                    placeholder="Pin Code"
                  ></input>
                </div>
              </Col>
            </Row>
            <hr></hr>
            <h5>Documents</h5>
            <Row className="documents">
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="aadhar">AADHAR Number<span style={{color: "red"}}>*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="aadhar"
                    onChange={this.aadhar}
                    value={this.state.aadharNo}
                    placeholder="Enter 12 digit Valid AADHAR Number"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="aadhar">AADHAR Card<span style={{color: "red"}}>*</span></label>
                  <input
                    type="file"
                    className="form-control"
                    id="aadhar-card"
                    onChange={this.aadharCard}
                    value={this.state.id1}
                    accept=".pdf,.jpeg,.jpg,.png"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="voter">Voter Card Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="voter"
                    onChange={this.voter}
                    value={this.state.voterNo}
                    placeholder="Enter Valid 10-digit Voter Card Number"
                  ></input>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label htmlFor="aadhar">Voter Card</label>
                  <input
                    type="file"
                    className="form-control"
                    id="voter-card"
                    onChange={this.voterCard}
                    value={this.state.id2}
                    accept=".pdf,.jpeg,.jpg,.png"
                  ></input>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="ch">
            <input type="checkbox" id="chbox" required></input>
            <label>
              I agree to the{" "}
              <a href="/" onClick={this.showtc}>
                Terms and Conditions
              </a>
            </label>
            <div className="feedback" style={{color:"red"}}>
              Click on the checkbox to agree to the Terms and Conditions
            </div>
          </div>
          <div
            className="foot"
            style={{ marginTop: "5px", marginBottom: "15px" }}
          >
            <button
              className="btn btn-primary mr-5"
              type="reset"
              style={{ background: "gold", color: "black" }}
            >
              Reset
            </button>{" "}
            <button
              className="btn btn-primary"
              // type="submit"
              style={{ background: "green" }}
              onClick={this.submit}
            >
              Submit
            </button>
          </div>
        </form>
      </Container>
    );
  }
}
export default Test;
