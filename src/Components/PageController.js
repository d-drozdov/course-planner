import React from "react";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";

function PageController(props){
  const {queryResponse, currentPage, setCurrPage, searchForQuery } = props;
  const styles = {
    Pagination : {
      display: "flex",
      justifyContent: "center",
    }
  }

  const changePage = (event, value) => {
    setCurrPage(value);
    searchForQuery(value);
  };

  return(
    <>
      <Pagination 
      count={(queryResponse.pagination && queryResponse.pagination.last)  ? queryResponse.pagination.last : 0} 
      style={styles.Pagination} 
      onChange={changePage}
      page={currentPage} 
      />
    </>
  );
}

export default PageController;

PageController.propTypes = { 
  searchForQuery: PropTypes.func.isRequired, 
  queryResponse: PropTypes.object.isRequired, 
  currentPage: PropTypes.number.isRequired, 
  setCurrPage: PropTypes.func.isRequired
}