import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn/SignIn.jsx";
import Main from "./pages/Main/Main.jsx";
import SignUp from "./pages/Auth/SignUp/SignUp.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Test from "./pages/TestPages/Test.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Definition from "./pages/Definition/Definition.jsx";
import Quizzes from "./pages/Quizzes/Quizzes.jsx";
import QuizCard from "./components/QuizCard/QuizCard.jsx";
import TestGenerate from "./pages/TestPages/TestGenerate/TestGenerate.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/dictionary" element={<Definition />}/>
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/quiz/:id" element={<QuizCard />} />
        <Route path="/quizzes/quiz/:id/test" element={<TestGenerate />} />
        <Route path="/quizzes/quiz/:id/test/:method" element={<Test />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
