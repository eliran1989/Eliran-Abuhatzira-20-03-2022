import React, {  useState }  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import classes from './SearchInput.module.css'
import { useDispatch } from 'react-redux';
import { forecastActions } from '../../../store/forecast-slice'
import { uiActions } from '../../../store/ui-slice'
import {apiKey} from '../../../apiKey'

export default function SearchInput() {

    const [options, setOptions] = useState([])

    const dispatch = useDispatch();

    let inputTimeout;

    const searchHandler = (e) =>{

        if(inputTimeout){
            clearTimeout(inputTimeout)
        }
        

        inputTimeout = setTimeout(() => {

          if(!e.target.value.length){
            return;
          }

          dispatch(
            uiActions.setError({
                errorMsg:false
            })
          )

            fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${e.target.value}&apikey=${apiKey}`).then(res=>res.json()).then(response=>{
               


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

              dispatch(
                uiActions.setError({
                    errorMsg:error.toString()
                })
              )


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
            autoComplete: 'off', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

