import { useState, useEffect } from 'react';


const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

      fetch(url)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('Could Not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        // console.log(data,url);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, loading, error };
}
 
export default useFetch;