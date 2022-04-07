import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from "@material-ui/core/Box";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ClassCard from "./ClassCard"

function CategoryCard(props){
  const { status, classes } = props;

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
            {classes.map((classObj) => {
              return (
              <Grid item> 
                <ClassCard classObj = {classObj}/> 
              </Grid>);   
            })}

        </Grid>
        </AccordionDetails>
    </Accordion>
  );
}

export default CategoryCard;