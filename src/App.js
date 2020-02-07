import React, { useState, useEffect } from 'react';
import './App.css';
import { Suspense } from 'react';
const LazyLoaded = React.lazy(() => import('./List/List'))

function App() {
  // const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [comp, setComp] = useState('')

  const lazyLoad = (page) => {
    return (
      <Suspense fallback={<div style={{ color: '#fff' }}>...loading component.....</div>}>
        <div>
          <LazyLoaded pageNo={page}/>
          <button onClick={showMore} className="showMore">Show more</button>
        </div>
      </Suspense>
    )
  }

  const showMore = () => {
        setPage(page + 1);
        // setLoading(true);
    }


  useEffect(() => {
    setComp(lazyLoad(page))
  }, [page])

  return (
    <div className="wrapper">
        {comp}
    </div>
  );
}

export default App;
