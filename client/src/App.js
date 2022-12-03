
import Login from './components/login/login';
import Register from './components/register/register';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import BookDetail from "./components/Book/BookDetail";
import BooksRecord from './components/Book/BooksRecord';
import Protected from './components/protected';



// import './App.css';


function App() {
  return (
    
   <div className='app'>
   <BrowserRouter>
   <Routes>
          <Route  path='/' element={<Login/>}></Route>
          <Route  path='/register' element={<Register/>}></Route>
          <Route path="/home" element={<Protected><Home /></Protected>} exact />
          <Route path="/add" element={<Protected><AddBook /></Protected>} exact />
          <Route path="/books" element={<Books />} exact />
          <Route path="/books/:id" element={<BookDetail />} exact />
          <Route path="/BooksRecord" element={<BooksRecord />} exact />

    
  
    </Routes>
   </BrowserRouter>
   
   </div>
  );
}

export default App;
