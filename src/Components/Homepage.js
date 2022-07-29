import React, { useState } from 'react'
import population_data from '../Data'
import './SearchStyle.css'


function Homepage() {
    const [search, setSearch] = useState('');
     const [rendered,setRendered]=useState(population_data.data);

    
    const searchData=()=>{
        if(search === '') {
            setRendered(population_data);
            } else { 
            
            let temp = population_data.data.filter(x => x.Year === search);
            console.log(search);
            setRendered(temp);
     }
            
    }
  return (
    <>
        <div className='search-bar-menue'>
        <input value={search} onChange={e => setSearch(e.target.value)} type='text' />
        <button type="Submit" onClick={searchData}>Submit</button>
        </div>
        {rendered.map((state,i) =>{
            return (
                <ul key={i}>
                    <li>{state['ID State']}</li>
                    <li>{state.State}</li>
                    <li>{state['ID Year']}</li>
                    <li>{state.Year}</li>
                    <li>{state.Population}</li>
                    <li>{state['Slug State']}</li>
                </ul>
            )
        })}
    </>
  )
}

export default Homepage
