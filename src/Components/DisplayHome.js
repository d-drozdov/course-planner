import React from "react";
import Add from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CategoryCard from "./CategoryCard";

function DisplayHome(props){
  const {courses, removeCourse, updateCourse} = props;

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

  return(
    <>
      <CategoryCard 
        status = "Currently Enrolled"
        courses = {courses.filter(currCourse => currCourse.status === "enrolled")} 
        removeCourse = {removeCourse}
        updateCourse = {updateCourse}
      />

      <CategoryCard 
        status = "Want to Take"
        courses = {courses.filter(currCourse => currCourse.status === "interested")} 
        removeCourse = {removeCourse}
        updateCourse = {updateCourse}
      />

      <CategoryCard 
        status = "Already Took"
        courses = {courses.filter(currCourse => currCourse.status === "taken")}
        removeCourse = {removeCourse}
        updateCourse = {updateCourse}
      />

      <Fab style={styles.fab} color="primary">
        <Add />
      </Fab>
    </>
  );
}

export default DisplayHome;