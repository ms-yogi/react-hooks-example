import React, { useState } from 'react';
import './App.css';
import { Suspense } from 'react';
import Loader from './Loader/Loader';
const LazyLoadedList = React.lazy(() => import('./List/List'))

function App() {
  const [page, setPage] = useState(1)

  return (
    <div className="wrapper">

      <h1 className="title">React Hooks Example</h1>
      <p className="gitlink">
        <a href="https://github.com/ms-yogi/react-hooks-example">Check Code on GitHub</a>
      </p>

      <Suspense fallback={<Loader/>}>
        <div>
          <LazyLoadedList pageNo={page}/>
          <button onClick={() => setPage(page + 1)} className="showMore">Show more</button>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
