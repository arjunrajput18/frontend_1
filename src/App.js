import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { CharactersList } from "./Characters/CharactersList";
import { Home } from "./Features/Home/Home";
import { MainContainer } from "./Components/MainContainer/MainContainer";
import WorkInProgress from "../src/Assets/WorkInProgress.jpg"

function App() {
  return (
    <div className="App">


      <Routes>
        {/* <Route
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
        /> */}

        <Route path="*" element={<img src={WorkInProgress} alt="Work in Progress" style={{  maxHeight: '100vh',
    maxWidth: '100%'}}/>}/>
      </Routes>
      {/* <CharactersList /> */}
    </div>
  );
}

export default App;
