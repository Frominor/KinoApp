import React from "react";
import "./styles/Reset.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store";
import { FindBasicFilmsAndSerialsCategories } from "./store/FilmsSlice";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { Serials } from "./pages/Serials/Serials";
import { Films } from "./pages/Films/Films";
import { Main } from "./pages/Main/Main";
import { FilmOrSerial } from "./pages/FilmOrSerial/FilmOrSerial";
import { SkeletonTheme } from "react-loading-skeleton";
const Case1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>}></Route>
      <Route path="/films" element={<Films></Films>}></Route>
      <Route path="/tv" element={<Serials></Serials>}></Route>
      <Route path="/films/:id" element={<FilmOrSerial></FilmOrSerial>}></Route>
      <Route path="/serials/:id"></Route>
    </Routes>
  );
};
function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(FindBasicFilmsAndSerialsCategories());
    navigate("/");
  }, []);
  return (
    <div className="App">
      <SkeletonTheme>
        <Header></Header>
        <Case1></Case1>
        <Footer></Footer>
      </SkeletonTheme>
    </div>
  );
}

export default App;
