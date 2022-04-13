import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";


function CourseCard(props) {
  const { courseObj, removeCourse, updateCourse } = props;
  const { title, number, term, status } = courseObj;
  
  let color = "#808080"; //for none 
  if (status === "enrolled"){
    color = "info.main";
  } else if ( status === "interested"){
    color = "warning.main";
  } else if (status ===  "taken") {
    color = "success.main";
  }
    


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

  function changeCourseStatus(desiredStatus){
    if(desiredStatus === "none"){
        removeCourse(courseObj);
    } else {
      updateCourse(courseObj, desiredStatus);
    }
  }


  return(
    <Card style={styles.card}>
      <Box bgcolor={color}>
        <CardContent style={styles.cardContent}>
          <Typography color="textSecondary" gutterBottom>
            {number}
          </Typography>
          <Typography variant="h5">{title}</Typography>
        </CardContent>
      </Box>
      <CardActions style={styles.cardActions}>
        <Button disabled>{term}</Button>
        <IconButton style={styles.iconButton}>
          <ExpandMore style={styles.expandMore} />
          <Select style={styles.select} value={status}>
            <MenuItem value="move" disabled>
              <Typography variant="body1">Move to...</Typography>
            </MenuItem>
            <MenuItem value="enrolled" onClick={() => changeCourseStatus("enrolled")} >
              <Typography variant="body1">
                Currently Enrolled
              </Typography>
            </MenuItem>
            <MenuItem value="interested" onClick={() => changeCourseStatus("interested")}>
              <Typography variant="body1">Want to Take</Typography>
            </MenuItem>
            <MenuItem value="taken" onClick={() => changeCourseStatus("taken")}>
              <Typography variant="body1">Already Took</Typography>
            </MenuItem>
            <MenuItem value="none" onClick={() => changeCourseStatus("none")}>
              <Box fontStyle="italic">
                <Typography variant="body1">None</Typography>
              </Box>
            </MenuItem>
          </Select>
        </IconButton>
      </CardActions>
    </Card>
  );

}

export default CourseCard;

CourseCard.propTypes = {
  courseObj: PropTypes.object.isRequired, 
  removeCourse: PropTypes.func.isRequired, 
  updateCourse: PropTypes.func.isRequired
}