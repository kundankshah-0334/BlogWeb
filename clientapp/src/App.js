import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Navbar from "./component/Navbar/Navbar";
import Post from "./component/post/Post";
import {Routes , Route} from "react-router-dom"
import CreatePost from "./component/CreatePost/CreatePost";
import IndexPage from "./Pages/IndexPage";
import PostPage from "./Pages/PostPage";
import EditPost from "./Pages/EditPost";

function App() {
  return (
     <>
      <Routes>
      <Route index element={
        <main>
          <Navbar />
          <IndexPage />
        </main>
      }
      />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/create"} element={<CreatePost />} />
        <Route path={"/post/:id"} element={<PostPage />} />
        <Route path={"/edit/:id"} element={<EditPost />} />
      </Routes>

     </>
  );
}

export default App;
