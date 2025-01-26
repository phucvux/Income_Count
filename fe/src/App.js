import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePage from './page/EmployeePage';
import ProductPage from './page/ProductPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='employee' element={<EmployeePage/>}/>
        <Route path='product' element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
