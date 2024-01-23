import "./App.css";
import MyLayout from "./components/Layout/MyLayout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <MyLayout />
      </Router>
    </>
  );
}

export default App;
