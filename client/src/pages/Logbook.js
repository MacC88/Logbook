import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import EditBtn from "../components/EditBtn";


class Logbook extends Component {
  state = {
    logs: [],
    ticket: "",
    hours: "",
    vin: "",
    details: ""
  };

  componentDidMount() {
    this.loadLogbook();
  }

  loadLogbook = () => {
    API.getLogbook()
      .then(res =>
        this.setState({ logs: res.data, ticket: "", hours: "", vin: "", details: "" })
      )
      .catch(err => console.log(err));
  };

  putLog = id => {
    API.getLog(id)
      .then(res => this.loadLogbook())
      .catch(err => console.log(err));
  };


  deleteLog = id => {
    API.deleteLog(id)
      .then(res => this.loadLogbook())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.ticket && this.state.hours) {
      API.saveLog({
        ticket: this.state.ticket,
        hours: this.state.hours,
        vin: this.state.vin,
        details: this.state.details,
        date: this.state.date
      })
        .then(res => this.loadLogbook())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-2">
          <div className="sidebarMenu">
            <br></br>
            <br></br> 
            <a href="/" class="btn btn-secondary btn-block font-weight-bold" role="button">Home</a>
            <br></br>
            <br></br>  
            <a href="/search" class="btn btn-secondary btn-block font-weight-bold" role="button">Search</a>
            <br></br>
            <br></br>
            <a href="/logbook" class="btn btn-secondary btn-block font-weight-bold active" role="button">Logbook</a>
            <br></br>
            <br></br>
            <a href="/warranty" class="btn btn-secondary btn-block font-weight-bold" role="button">Warranty</a>
            <br></br>
            <br></br>
            <a href="/tsb" class="btn btn-secondary btn-block font-weight-bold" role="button">TSB</a>
            <br></br>
            <br></br>
            <a href="/diagnostic" class="btn btn-secondary btn-block font-weight-bold" role="button">Diagnostic</a>
            <br></br>
            <br></br>
            <a href="/repair" class="btn btn-secondary btn-block font-weight-bold" role="button">Repair</a>
           </div> 
          </Col>
          <Col size="md-5">
            <form style={{marginTop: 50}}>
              <Input
                value={this.state.ticket}
                onChange={this.handleInputChange}
                name="ticket"
                placeholder="Ticket # (required)"
              />
              <Input
                value={this.state.hours}
                onChange={this.handleInputChange}
                name="hours"
                placeholder="Hours (required)"
              />
              <Input
                value={this.state.vin}
                onChange={this.handleInputChange}
                name="vin"
                placeholder="Vin # (Optional)"
              />
              <TextArea
                value={this.state.details}
                onChange={this.handleInputChange}
                name="details"
                placeholder="Details (Optional)"
              />
              <FormBtn
                disabled={!(this.state.hours && this.state.ticket)}
                onClick={this.handleFormSubmit}
              >
                Submit Log
              </FormBtn>
            </form>
          </Col>
          <Col size="md-5 sm-12">
            {this.state.logs.length ? (
              <List>
                {this.state.logs.map(log => (
                  <ListItem key={log._id}>
                    <Link to={"/logs/" + log._id}>
                      <strong>
                      Ticket #: {log.ticket}
                      <br></br>
                      Hours: {log.hours}
                      <br></br>
                      Vin: {log.vin}
                      <br></br>
                      Date: {log.date}
                      </strong>
                    </Link>
                    <EditBtn onClick={() => this.putLog(log._id)} />
                    <DeleteBtn onClick={() => this.deleteLog(log._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3 style={{marginTop: 50}}>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Logbook;
