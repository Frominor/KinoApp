import React from "react";
import "./styles/Reset.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { useAppDispatch } from "./store";
import {
  FindTopRatedTv,
  GetNowPlayingFilms,
  GetPopularFilms,
} from "./store/FilmsSlice";
import { Footer } from "./components/Footer/Footer";

function App() {
  console.log(process.env.REACT_APP_API_FILMS_KEY);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetPopularFilms());
    dispatch(GetNowPlayingFilms());
    dispatch(FindTopRatedTv());
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
