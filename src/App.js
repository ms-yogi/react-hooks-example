import React, { useState, useRef } from 'react';
import './App.css';
import { Suspense } from 'react';
import Loader from './Loader/Loader';
const LazyLoadedList = React.lazy(() => import('./List/List'))

function App() {
  const [darktheme, isDarkTheme] = useState(true)
  const [id, setId] = useState(10000)
  const [count, setCount] = useState(3)
  const idEl = useRef(null);
  const countEl = useRef(null);

  const darkTheme = {
    backgroundColor: '#282c34',
    color: '#f9f9f9',
  }
  const lightTheme = {
    backgroundColor: '#f9f9f9',
    color: '#282c34',
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setId(Number.parseInt(idEl.current.value) || id);
    setCount(Number.parseInt(countEl.current.value) || count);
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

      <form onSubmit={handleSubmit}>
        <label htmlFor="id">From ID: </label>
        <input type="number" name="id" ref={idEl} className="textInput"/>

        <label htmlFor="usersno">No of users: </label>
        <input type="number" name="usersno" ref={countEl} className="textInput"/>  
        
        <button type="submit" className="showButton">Show</button>
      </form>

      <Suspense fallback={<Loader/>}>
        <div>
          <LazyLoadedList id={id} count={count}/>
        </div>
      </Suspense>
    </div>
  );
}

export default App;