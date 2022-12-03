import { Button } from "@mui/material";
import Header from "../Header/header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";
const Book = (props) => {
  const navigate = useNavigate();
  const { _id, name, author, description, price, image } = props.book;
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3002/books/${_id}`)
      .then((res) => res.data)
      .then(() => navigate("/home"))
      .then(() => navigate("/books"));
  };
  const changeHandler=()=>{
     navigate("/BooksRecord")
  }

  return (
    <div className="container">
        
    <div className="card">
      <img src={image} alt={name} onClick={changeHandler}/>
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>Rs {price}</h3>
      <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
    </div>
    </div>
  );
};

export default Book;