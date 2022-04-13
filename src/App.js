import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Container from "@material-ui/core/Container";
import Header from "./Components/Header.js";
import Homepage from "./Pages/Homepage.js";
import {create, getAll, remove, search, update } from "./services/api"
import SearchPage from "./Pages/SearchPage.js";
import { Link } from "react-router-dom";

//TODO: Add pagination
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      courses: [],
      query: "",
      queryResponse : {},
      currentPage: 1,
    };
  }
  
  
  async componentDidMount(){
    const { courses } = this.state
    const response = await getAll();
    response.forEach(courseObj => courses.push(courseObj));
    this.setState({ courses }); 
  }
  
  async updateCourse(courseObj, desiredStatus){
    const { courses } = this.state;
    if(courseObj._id){
      courses.find(c => c._id === courseObj._id).status = desiredStatus;
      await update(courseObj, desiredStatus);
    } else {
      courseObj.status = desiredStatus;
      courses.push(await create(courseObj));
    }
    this.setState({ courses });
  }


  async removeCourse(toRemove){
    const { courses } = this.state;
    if(toRemove._id){
      const c = courses.filter( currCourse => {
        return toRemove._id !== currCourse._id;
      });
    await remove(toRemove);
    this.setState({ courses : c });
    }
  }
    
  async updateQuery(query, callback){
    this.setState({ query }, callback);
  };

  async searchForQuery(page = 1, changeCurrPage = false){
    const response = await search(this.state.query, page);
    this.setState({queryResponse: response});
    if(changeCurrPage) this.setCurrPage(1);
  }

  setCurrPage(desiredValue){
    this.setState({ currentPage : desiredValue });
  }


  render(){
    return (

      <Container>

        <Switch>

          <Route exact path="/">
            <Header />
            <Homepage 
              courses = {this.state.courses}
              removeCourse = {this.removeCourse.bind(this)}
              updateCourse = {this.updateCourse.bind(this)}
            /> 
          </Route>

          <Route path="/search">
            <SearchPage 
            courses = {this.state.courses}
            query = {this.state.query} 
            updateQuery = {this.updateQuery.bind(this)}
            searchForQuery = {this.searchForQuery.bind(this)}
            removeCourse = {this.removeCourse.bind(this)}
            updateCourse = {this.updateCourse.bind(this)}
            queryResponse = {this.state.queryResponse}
            currentPage = {this.state.currentPage}
            setCurrPage = {this.setCurrPage.bind(this)}
            />
          </Route>

          <Route>
            <div>404 Not Found</div>
            <Link to= "/">Go to Homepage!</Link>
          </Route>

        </Switch>

      </Container>
    );
  }
  
}

export default App;
