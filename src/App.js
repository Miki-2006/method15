import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Main from "./pages/Main.jsx";
import SignUp from "./pages/SignUp.jsx";
import AppBar from "./pages/AppBar.jsx";
import Profile from "./pages/Profile.jsx";
import Test from "./pages/TestPages/Test.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
      <AppBar/>
    </div>
  );
}

export default App;
