import SearchBar from "material-ui-search-bar";
import { Pagination } from "@material-ui/lab";
import CourseCard from "../Components/CourseCard";
import Grid from "@material-ui/core/Grid";


function SearchPage(props){
  const{courses, query, updateQuery, searchForQuery, removeCourse, updateCourse, queryResponse, currentPage, setCurrPage} = props;

  const styles ={
    Pagination : {
      display: "flex",
      justifyContent: "center",
    }
  }

  function compareCourse(courseObj){
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

  const changePage = (event, value) => {
    setCurrPage(value);
    searchForQuery(value);
  };

  //TODO: update pagination to fix errors
  return(
    <>
      <SearchBar 
        value={query} 
        onChange={(newValue) => updateQuery(newValue, () => searchForQuery(1, true))} 
        onCancelSearch={() => updateQuery("", () => searchForQuery(1, true))} 
      />
      <Pagination 
      count={(queryResponse.pagination && queryResponse.pagination.last)  ? queryResponse.pagination.last : 0} 
      style={styles.Pagination} 
      onChange={changePage}
      page={currentPage} 
      />
      
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >       
            {(queryResponse.data || []).map(courseObj => {
              courseObj = compareCourse(courseObj);
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