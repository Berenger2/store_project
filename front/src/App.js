import "./App.css";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Wrapper from "./components/layout/Wrapper";


 

function App() {
 
  return (
    <BrowserRouter>
     <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
     
  );
}

export default App;