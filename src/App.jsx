import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import SharedContextProvider from './context/SharedContext';
function App() {
  let routes = createHashRouter(
    [
      {path:"/",element:<Layout/>
      
      }
    ]
  )
  return (
    <SharedContextProvider>

<RouterProvider router={routes}></RouterProvider>

    </SharedContextProvider>
    
  )
}

export default App;
