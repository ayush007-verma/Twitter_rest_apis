// import './App.css';
// import Auth from './components/Auth';
// import Cookies from 'universal-cookie';
// import PasswordReset from './components/PasswordReset';

// const cookies = new Cookies();

// const authToken = cookies.get("authToken");


// const App = () => {
  
//   if (!authToken) {
//     return <Auth />
//   }

//   return (
//     <div className="App">
//       <PasswordReset />
//     </div>
//   );
// }

// export default App;

import './App.css';

import Home from "./components/Home/Home"

function App() {
  return (
    <div className="App">
      <Home/> 
    </div>
  );
}

export default App;