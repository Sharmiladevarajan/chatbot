import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import { Chatbot } from "./Components/ChatBot";
import Content from "./Components/addFile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chatbot />}></Route>
          <Route path="/f" element={<Content />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
