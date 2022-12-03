
import { Tab, Tabs} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import React from "react";

import Books from "./Book/Books";
import Header from "./Header/header";

const Home = () => {
    const [value, setValue] = useState();
  return (
    <div className="container">
        <Header/>
        <div classNmae="title">
            <h1>Books List</h1>
            <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add new book" />
            
          </Tabs>
        </div>
        <div className="add">

        </div>
      <Books/>
    </div>
    
  );
};

export default Home;