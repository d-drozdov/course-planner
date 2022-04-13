import SearchBar from "material-ui-search-bar";
import CourseCard from "../Components/CourseCard";
import Grid from "@material-ui/core/Grid";
import PageController from "../Components/PageController";

function SearchPage(props){
  const{courses, query, updateQuery, searchForQuery, removeCourse, updateCourse, queryResponse, currentPage, setCurrPage} = props;
  
  function compareAndUpdateCourseObj(courseObj){
    let course = courseObj;
    courses.forEach(c => {
      if(c.term === courseObj.term &&
        c.number === courseObj.number){
           course = c;
        }
    });
    if(!course._id) course.status = "none";
    return course;
  }


  return(
    <>
      <SearchBar 
        value={query} 
        onChange={(newValue) => updateQuery(newValue, () => searchForQuery(1, true))} 
        onCancelSearch={() => updateQuery("", () => searchForQuery(1, true))} 
      />
      <PageController
      queryResponse = {queryResponse}
      currentPage = {currentPage}
      setCurrPage = {setCurrPage}
      searchForQuery = {searchForQuery}
      />
      
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >       
            {(queryResponse.data || []).map(courseObj => {
              courseObj = compareAndUpdateCourseObj(courseObj);
              return (
                <Grid item> 
                  <CourseCard 
                    courseObj = {courseObj}
                    removeCourse = {removeCourse}
                    updateCourse = {updateCourse}
                    /> 
                </Grid>
              );   
            })}
        </Grid>
     
    </>
  );
}

export default SearchPage;