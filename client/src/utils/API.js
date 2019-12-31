import axios from "axios";

export default {
  // Gets all books
  getLogs: function() {
    return axios.get("/api/logs");
  },
  // Gets the book with the given id
  getLog: function(id) {
    return axios.get("/api/logs/" + id);
  },
  // Deletes the book with the given id
  deleteLog: function(id) {
    return axios.delete("/api/logs/" + id);
  },

  putLog: function(id) {
    return axios.put("/api/logs/" + id);
  },
  // Saves a book to the database
  saveLog: function(logData) {
    return axios.post("/api/logs", logData);
  }
};
