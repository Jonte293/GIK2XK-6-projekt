import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to='/'>Webshop X-treme</Link>
        </li>
        <li>
          <Link to="/products/new">Skapa produkt</Link>
        </li>
      </ul>
    </>
  );
}

export default App;
