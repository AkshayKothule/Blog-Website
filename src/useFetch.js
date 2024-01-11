//custom Hook you can USE used and without USE don't have custom hook

import { useState , useEffect } from "react";

const useFetch=(url)=>{
  const [data, setBlogs] = useState(null);
  const [isPending, setisPending] = useState(true);
  const[error , setError]=useState(null) ;//store the error message

    useEffect(() => {
      //cleanup
      const abortCont=new AbortController();
        //fetch data
        setTimeout(() => {
          fetch(url ,{signal :abortCont.signal}) //"http://localhost:8000/blogs"
            .then((res) => {
              // console.log(res);
              if(!res.ok)
              {
                throw Error('could not fetch the data for that resource');
    
              }
              return res.json();
            })
            .then((data) => {
              setBlogs(data);
              setisPending(false);
              setError(null);
              
            })
            .catch((err) => {
              if(err.name==='AbortError')
              {
                console.log('fetch aborted');
              }else{
                setError(err.message);
                setisPending(false);

              }
              
            });
        }, 1000);

        return ()=>abortCont.abort();
      }, [url]);

      return {data ,isPending ,error}

}
export default useFetch;