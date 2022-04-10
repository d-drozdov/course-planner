import { Link } from "react-router-dom";

function NotFound(){
  return(
    <>
      <div>404 Not Found</div>
      <Link to= "/"> Go to Homepage! </Link>
    </>
  );
}

export default NotFound();