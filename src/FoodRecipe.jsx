import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "./FoodRecipe.css"


export default function FoodRecipe() {
  let  [itemlist, setItemlist] = useState([]);
  let  [query, setQuery] = useState("");
  let [loading,setloading] = useState(false);
  
  useEffect(()=>
        {
        foodrecipe()

        },[])
  

  let  foodrecipe = async () => {
    try {
      let {data:{hits}} = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=07529db8&app_key=76c7aa4031af6c704beba411aa6b603e`);

      setItemlist(hits)
      setloading(true)
      

      
    } catch (error) {
    //   setloading(false)
       alert("Please Enter Correct api key")

    } finally{
        setloading(false)
    }
  };

  return (
    <>
      <div className='recipe'>
      <h1> Food Recipe Search</h1>
      <input type="text" placeholder="Enter your recipe..." value={query} onChange={({ target: { value } }) => {
          setQuery(value);
        }}
      />
      <button onClick={foodrecipe}>Search</button>
      </div>
      
      { loading? (
        <div className="loading-message"><span class="loader"></span></div>
      ) : (
        <div className='item'>
          {itemlist.map((item) => (
            <div key={item.recipe.label} className='img'>
              <img src={item.recipe.image} alt="" />
              <h3>{item.recipe.label}</h3>
              
              <div className='type'>
              {item.recipe.cuisineType.map((cuisineType)=>(
                <h2>{cuisineType}</h2>
              ))}
              </div>
              

              <div className='card-content'>
              <ul>
              {item.recipe.ingredientLines.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        
        </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
