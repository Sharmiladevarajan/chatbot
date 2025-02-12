import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import { Chatbot } from "./Components/ChatBot";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatbot />}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
