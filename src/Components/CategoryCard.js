import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CourseCard from "./CourseCard"
import PropTypes from "prop-types";


function CategoryCard(props){
  const { status, courses, removeCourse, updateCourse} = props;


  return(
    <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
        <Box py={2}>
            <Typography variant="h6">{status}</Typography>
        </Box>
        </AccordionSummary>
        <AccordionDetails>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >      
            {courses.map((courseObj,key) => {
              return (
                <Grid item key={key}> 
                  <CourseCard 
                    courseObj = {courseObj}
                    removeCourse = {removeCourse}
                    updateCourse = {updateCourse}
                    /> 
                </Grid>
              );   
            })}
        </Grid>
        </AccordionDetails>
    </Accordion>
  ); 
  
}

export default CategoryCard;

CategoryCard.propTypes = {
  status: PropTypes.string.isRequired, 
  courses: PropTypes.array.isRequired, 
  removeCourse: PropTypes.func.isRequired, 
  updateCourse: PropTypes.func.isRequired
}