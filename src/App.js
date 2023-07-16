import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { CharactersList } from "./Characters/CharactersList";
import { Home } from "./Features/Home/Home";
import { MainContainer } from "./Components/MainContainer/MainContainer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainContainer>
              <Home />
            </MainContainer>
          }
        />
        <Route
          path="/:id"
          element={
            <MainContainer>
              <Home />
            </MainContainer>
          }
        />
      </Routes>
      {/* <CharactersList /> */}
    </div>
  );
}

export default App;
