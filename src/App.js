import React, { Component } from "react";
import Add from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Header from "./Components/Header.js";
import CategoryCard from "./Components/CategoryCard.js";
import { create, getAll, remove, update } from "./services/api"
//TODO: Create 

const styles = {
  fab: {
    position: "fixed",
    bottom: "3rem",
    right: "3rem",
  },
  card: {
    margin: "1rem",
    width: "16rem",
  },
  cardContent: {
    minHeight: "8rem",
  },
  cardActions: {
    height: "3rem",
  },
  iconButton: {
    marginLeft: "auto",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
  },
  expandMore: {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    padding: "0.5rem",
  },
  select: {
    width: "100%",
    height: "100%",
    opacity: "0",
    cursor: "pointer",
  },
};



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      courses: [],
      cardMap : {
        enrolled: [],
        interested: [],
        taken: []
      },
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
    response.forEach(classObj => courses.push(classObj));
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

        <CategoryCard 
          status = "Currently Enrolled"
          classes = {this.state.courses.filter(currCourse => currCourse.status === "enrolled")} 
          removeCourse = {this.removeCourse.bind(this)}
          updateCourse = {this.updateCourse.bind(this)}
        />

        <CategoryCard 
          status = "Want to Take"
          classes = { this.state.courses.filter(currCourse => currCourse.status === "interested")} 
          removeCourse = {this.removeCourse.bind(this)}
          updateCourse = {this.updateCourse.bind(this)}
        />

        <CategoryCard 
          status = "Already Took"
          classes = {this.state.courses.filter(currCourse => currCourse.status === "taken")}
          removeCourse = {this.removeCourse.bind(this)}
          updateCourse = {this.updateCourse.bind(this)}
        />
        
        <Fab style={styles.fab} color="primary" onClick={this.changePage}>
          <Add />
        </Fab>
      </Container>
    );
  }
  
}

export default App;
