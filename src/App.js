import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react";
import Admin from "./components/PrimaryComponents/Admin";
import List from "./components/PrimaryComponents/List";

const HomepageComponent = lazy(() => import('./components/PrimaryComponents/Homepage'))


function App() {

  return (
    <>
      <Routes>
        <Route path='' element={<HomepageComponent />} />
        <Route path='/' element={<HomepageComponent />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/List' element={<List />} />
      </Routes>
    </>
  );
}
export default App;
