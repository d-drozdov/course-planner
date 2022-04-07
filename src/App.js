import React, { Component } from "react";
import Add from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Header from "./Components/Header.js";
import CategoryCard from "./Components/CategoryCard.js";

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
// TODO: Need to create components for the following:
// Class Cards
// Categories

// TODO: Create Page for adding classes


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      cardMap : {
        taken: [{title : "Data Sturctures", number: "601.226", term: "Fall 2019", status: "taken"}],
        interested: [{title : "Object-Oriented Software Engineering", number: "601.421", term: "Spring 2021", status: "interested"}],
        enrolled: [{title : "Full Stack JS", number: "601.280", term: "Fall 2021", status: "enrolled"}]
      },
    };
  }

  render(){
    return (

      <Container>
        
        <Header />

        <CategoryCard 
          status = "Currently Enrolled"
          classes = {this.state.cardMap.enrolled} 
        />

        <CategoryCard 
          status = "Want to Take"
          classes = {this.state.cardMap.interested} 
        />

        <CategoryCard 
          status = "Already Took"
          classes = {this.state.cardMap.taken} 
        />
        
        <Fab style={styles.fab} color="primary">
          <Add />
        </Fab>
      </Container>
    );
  }
  
}

export default App;
