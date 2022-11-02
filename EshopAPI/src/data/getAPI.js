import React from 'react'

export default async function getAPI() {
  const getApiData = async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    let jsonData = await response.json();
    return jsonData;
  }
  
  return (await getApiData());   
}