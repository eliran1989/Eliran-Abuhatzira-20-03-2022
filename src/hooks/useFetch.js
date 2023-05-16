import { useEffect, useState } from "react";


export const useFetch = (url , {isText=false , method="GET"}={}) =>{

    const [data, setData] = useState();
    const [error, setError] = useState();
    


    useEffect(() => {
    
        const controller = new AbortController();
        const signal = controller.signal;

        (
            async ()=>{
                try {
                   
                    const res =  await fetch(url ,{signal , method});
                    const parsed = await (res.json)();
                    setData(parsed);
                } catch (err) {
                    if(err.name!=="AbortError"){
                        console.error(err);
                        setError(err);
                    }

                }
            }
        )()
    
      return () => {
            controller.abort();
      };
    }, [url , isText , method]);
    


    return {data , error};

}