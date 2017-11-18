import React, { Component } from "react";
import "./App.css";
import Step from "./Step";
import PersonalForm from "./PersonalForm";
import CardForm from "./CardForm";

const stepTitles = ["Personal information", "Card information", "Finish"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      email: "",
      cardNumber: "",
      isTimeOver: false
    };
    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleClickNextForm = this.handleClickNextForm.bind(this);
    this.handleChangeTimeOver = this.handleChangeTimeOver.bind(this);
    this.isFormCommitable = this.isFormCommitable.bind(this);
    this.renderForm = this.renderForm.bind(this);
  } //constructor

  handleTabClick(number) {
    this.setState({
      step: number
    });
  } //handleTabClick

  handleChangeForm(name, value) {
    this.setState({ [name]: value });
  } //handleChangeForm

  handleClickNextForm() {
    if (this.state.step === 3) return;
    let thisStep = this.state.step;
    this.setState({
      step: ++thisStep
    });
  } //handleClickNextForm

  handleChangeTimeOver(bool) {
    let timeOverStatus = this.state.isTimeOver;
    if (bool) this.setState({ isTimeOver: !timeOverStatus });
  } //handleChangeTimeOver

  isFormCommitable() {
    switch (this.state.step) {
      case 1:
        return (
          this.state.firstName !== "" &&
          this.state.lastName !== "" &&
          this.state.email !== "" &&
          this.state.email.includes("@")
        );
      case 2:
        return this.state.cardNumber.length === 16;
      default:
        return false;
    }
  } //isFormCommitable

  renderForm() {
    switch (this.state.step) {
      case 1:
        return (
          <PersonalForm
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            onChangeForm={this.handleChangeForm}
          />
        );
      case 2:
        return (
          <CardForm
            cardNumber={this.state.cardNumber}
            onChangeForm={this.handleChangeForm}
            onChangeTimeOver={this.handleChangeTimeOver}
          />
        );
      case 3:
        return "Поздравляем!";
      default:
        return false;
    }
  } //renderForm

  render() {
    return (
      <div>
        <div className="container">
          <div className="tab-panel">
            {stepTitles.map((title, index) => (
              <Step
                key={title}
                number={index + 1}
                onClick={this.handleTabClick}
                isSelected={this.state.step - 1 === index}
                isClickable={
                  index !== this.state.step - 1 && index < this.state.step
                }
              >
                {title}
              </Step>
            ))}
          </div>
          <div className="form-content">{this.renderForm()}</div>
          <div className="button-panel">
            <button
              disabled={!this.isFormCommitable() || this.state.isTimeOver}
              className="button-next"
              onClick={this.handleClickNextForm}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
