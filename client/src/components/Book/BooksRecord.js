import React from 'react'
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "react"


const BooksRecord = (props) => {
    const navigate = useNavigate();
    const { _id, name, author, description, price, image } = props.book;
    const deleteHandler = async () => {
        await axios
          .delete(`http://localhost:3002/books/${_id}`)
          .then((res) => res.data)
          .then(() => navigate("/home"))
          .then(() => navigate("/books"));
      };
  return (
    <div className='container'>
        <div className='card'>
           <h1>Book's Record</h1>
           <h3>view books Info</h3>
           <table>
           <tr>
    <td>1</td>
    <td>title</td>
    <td>{name}</td>
  </tr>
  <tr>
    <td>2</td>
    <td>author</td>
    <td>{author}</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Description</td>
    <td>{description}</td>
  </tr>
  <tr>
    <td>4</td>
    <td>price</td>
    <td>{price}</td>
  </tr>
  <tr>
    <td>5</td>
    <td>image</td>
    <td>{image}</td>
  </tr>
  
</table>
        </div>
        <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
    </div>
  )
}

export default BooksRecord