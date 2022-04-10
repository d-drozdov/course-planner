import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Header from "./Components/Header.js";
import DisplayHome from "./Components/DisplayHome.js";
import { create, getAll, remove, update } from "./services/api"

//TODO: Create 

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      courses: [],
    };
  }
  
  async createClasses(){
    const data = {
          "data": [
            {
              "status": "taken",
              "title": "Data Structures",
              "number": "601.226",
              "term": "Fall 2029"
            },
            {
              "status": "enrolled",
              "title": "Full-Stack JavaScript",
              "number": "601.280",
              "term": "Fall 2020"
            },
            {
              "status": "interested",
              "title": "Object Oriented Software Engineering",
              "number": "601.421",
              "term": "Fall 2021"
            },
            {
              "status": "taken",
              "title": "Gateway Computing: Java",
              "number": "500.112",
              "term": "Fall 2018"
            }
          ]
        };
    data.data.forEach(course => {
      create(course);
    });
  }
  
  async componentDidMount(){
    
    //this.createClasses();
    const { courses } = this.state
    const response = await getAll();
    console.log(response);
    response.forEach(courseObj => courses.push(courseObj));
    this.setState({ courses }); 
  }

  async updateCourse(course, desiredStatus){
    const { courses } = this.state;
    courses.find(c => c._id === course._id).status = desiredStatus;
    update(course, desiredStatus);
    this.setState({ courses });
  }

  async removeCourse(toRemove){
    const { courses } = this.state;
    const c = courses.filter( currCourse => {
      return toRemove._id !== currCourse._id;
      });
    remove(toRemove);
    this.setState({ courses : c });
  }
    

  render(){
    return (

      <Container>
        
        <Header />
        <DisplayHome 
          courses = {this.state.courses}
          removeCourse = {this.removeCourse.bind(this)}
          updateCourse = {this.updateCourse.bind(this)}
        /> 
        
      </Container>
    );
  }
  
}

export default App;
