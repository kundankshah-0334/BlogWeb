import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Navbar from "./component/Navbar/Navbar";
import Post from "./component/post/Post";
import {Routes , Route} from "react-router-dom"
import CreatePost from "./component/CreatePost/CreatePost";

function App() {
  return (
     <>
      <Routes>
      <Route index element={
        <main>
          <Navbar />
          <Post />
          <Post />
          <Post />
        </main>
      }
      />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/create"} element={<CreatePost />} />
      </Routes>

     </>
  );
}

export default App;