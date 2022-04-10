import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Container from "@material-ui/core/Container";
import Header from "./Components/Header.js";
import Homepage from "./Pages/Homepage.js";
import { create, getAll, remove, search, update } from "./services/api"
import AddPage from "./Pages/SearchPage.js";
import NotFound from "./Pages/NotFound.js";

//TODO: Add pagination
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      courses: [],
      query: "",
      queryResponse : {}
    };
  }
  
  
  async componentDidMount(){
    const { courses } = this.state
    const response = await getAll();
    console.log(response);
    response.forEach(courseObj => courses.push(courseObj));
    this.setState({ courses }); 
  }
  //TODO:Figure out bug that causes the 
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
    
  async updateQuery(query){
    this.setState({ query }, () => this.searchForQuery());
  };

  async searchForQuery(){
    const response = await search(this.state.query);
    this.setState({queryResponse: response});
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
            <AddPage 
            courses = {this.state.courses}
            query = {this.state.query} 
            updateQuery = {this.updateQuery.bind(this)}
            removeCourse = {this.removeCourse.bind(this)}
            updateCourse = {this.updateCourse.bind(this)}
            queryResponse = {this.state.queryResponse}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>

      </Container>
    );
  }
  
}

export default App;
