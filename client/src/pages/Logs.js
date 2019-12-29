import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import EditBtn from "../components/EditBtn";

class Logs extends Component {
  state = {
    logs: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadLogs();
  }

  loadLogs = () => {
    API.getLogs()
      .then(res =>
        this.setState({ logs: res.data, ticket: "", hours: "", details: "" })
      )
      .catch(err => console.log(err));
  };

  putLog = id => {
    API.putLog(id)
      .then(res => this.loadLogs())
      .catch(err => console.log(err));
  };


  deleteLog = id => {
    API.deleteLog(id)
      .then(res => this.loadLogs())
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
        details: this.state.details,
        date: this.state.date
      })
        .then(res => this.loadLogs())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
        <Col size="md-2">
            <Link to="/logs">Logbook</Link>
          </Col>
          <Col size="md-4">
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
          <Col size="md-4 sm-12">
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
                      Date: {log.date}
                      </strong>
                    </Link>
                    <EditBtn onClick={() => this.putLog(log._id)} />
                    <DeleteBtn onClick={() => this.deleteLog(log._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Logs;
