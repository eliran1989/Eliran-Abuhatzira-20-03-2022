import React, { useState }  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import classes from './SearchInput.module.css'
import { Skeleton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { forecastActions } from '../../store/forecast-slice';

export default function SearchInput() {

    const dispatch = useDispatch();


    let inputTimeout;

    const [options, setOptions] = useState([])


    const searchHandler = (e) =>{

        if(inputTimeout){
            clearTimeout(inputTimeout)
        }
        

        inputTimeout = setTimeout(() => {


            fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${e.target.value}&apikey=rgdNsquM1veb1u98AAjf473E1xAxM0Ad`).then(res=>res.json()).then(response=>{
               


                if(!response.length){
                    setOptions([])
                    return;
                }


                const searchResults = [];

                response.forEach(res => {
                    
                    searchResults.push({
                        code:res.Key,
                        city:res.LocalizedName,
                        country:res.Country.LocalizedName
                    })

                });

    
                

                setOptions(searchResults)
                
            
            }).catch(error=>{

            })


        }, 500);


    }


    const selectHandler = (value) =>{

         
         if(value.code){
             
                         dispatch(
                         forecastActions.changeCity({
                             key:value.code,
                             cityName:`${value.city} (${value.country})`
                         })
                     ) 

         }

    }



  return (
    <Autocomplete
      id="search-input"
      className={classes.Input}
      freeSolo
      options={options}
      autoHighlight
      onChange={(event, newValue)=>selectHandler(newValue)}
      getOptionLabel={(option) => (option.city) ? `${option.city} (${option.country})`:option}
      renderOption={(props, option) => (
        <Box  component="li" {...props} key={option.code}>
          {option.city} ({option.country})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          onChange={(e)=>searchHandler(e)}
          onFocus={(e)=>{if(!e.target.value.length) setOptions([])}}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

