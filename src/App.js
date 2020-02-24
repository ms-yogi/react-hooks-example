import React, { useState } from 'react';
import './App.css';
import { Suspense } from 'react';
import Loader from './Loader/Loader';
const LazyLoadedList = React.lazy(() => import('./List/List'))

function App() {
  const [darktheme, isDarkTheme] = useState(true)

  const darkTheme = {
    backgroundColor: '#282c34',
    color: '#f9f9f9',
  }
  const lightTheme = {
    backgroundColor: '#f9f9f9',
    color: '#282c34',
  }

  return (
    <div className="wrapper" style={darktheme === true ? darkTheme : lightTheme}>
      <h1 className="title">React Hooks Example</h1>
      <p className="gitlink">
        <a
          href="https://github.com/ms-yogi/react-hooks-example"
          style={{color: darktheme === true ? darktheme.color : lightTheme.color}}>Check Code on GitHub</a>
      </p>

      <button onClick={() => isDarkTheme(!darktheme)} className="themeButton" style={darktheme === true ? lightTheme : darkTheme}>Change theme</button>

      <Suspense fallback={<Loader/>}>
        <div>
          <LazyLoadedList/>
        </div>
      </Suspense>
    </div>
  );
}

export default App;