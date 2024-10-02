// const img = document.getElementById("image")
// const countryName = document.getElementById("country-name")
// const population = document.getElementById("population")
// const region = document.getElementById("region")
// const capital = document.getElementById("capital")
const section = document.querySelector('section')
const userInput = document.querySelector("input")
const form = document.querySelector('form')
const regionFilter = document.getElementById('region-filter')
const regionsUl = document.querySelector('ul')
const regionsLi = document.querySelectorAll('li')
const africa = document.getElementById('africa')
const america = document.getElementById('america')
const asia = document.getElementById('asia')
const europe = document.getElementById('europe')
const oceania = document.getElementById('oceania')
const searchBar = document.getElementById('searching-bar')
const filterLabel = document.querySelector('label')
const body = document.querySelector('body')



















    // DISPLAY BY REGIONS 

    const urlSearchBar = 'https://restcountries.com/v3.1/all?fields=name,region'

    const urlDetails = 'https://restcountries.com/v3.1/name/{name}'

    let searchBarData = []; 
    //declaring the data array of objects globaly, because i dont want to make an API call everytime when user types

   
    const getDataNamesOnly  = async() => {
        const response = await axios.get(urlSearchBar);
        const data = response.data;
        
        searchBarData = data.map((element) => {
            if(element.name || element.region) 
                return {
                    commonName: element.name.common || "Unknown",
                    officialName: element.name.official || "Unknown",
                    region: element.region
                }
                return null;
            
    }).filter((item) => item !== null)


    
    console.log(searchBarData.length, "Total countries fetched");
    console.log(data.length, "Total countries from API");
console.log(searchBarData.length, "Total countries after filtering");
    console.log(searchBarData, "I'm search bar object")
    return searchBarData

}

// in this function im saving the data to the global array, filtering the null values if they exist, and mapping over the fetched data from API and returning the object



const initilaizeObject = async() => {
    await getDataNamesOnly()
}

initilaizeObject(); // whit this i make sure that I save data on page loading


// function bellow is the input listener, he tracks every click of the user 
// userInput.addEventListener('input', (e) => {
//     const userValue = e.target.value.toLowerCase();
//     console.log(userValue);
    

   
// })

let clicker = 0;
const searchResultsDiv = document.createElement('div');
searchBar.insertAdjacentElement('afterend', searchResultsDiv);
searchResultsDiv.classList = "search-output";
searchResultsDiv.style.display = 'none'

searchBar.addEventListener('click', () => {
    clicker += 1;
  
    
    if(clicker === 1) {
        console.log(clicker, "numbers of clicks")
        searchResultsDiv.style.display = 'flex'
       

        

        getAll(searchResultsDiv) 

      
        
        
    } else {
        console.log(clicker)
        searchResultsDiv.style.display = 'none'
        clicker = 0;
    }
})

let searchResultLinks;

 const getAll = (searchResultsDiv) => {

    searchResultsDiv.innerHTML = '';

    searchBarData.forEach((item) => {
    searchResultLinks = document.createElement('a');
    searchResultsDiv.append(searchResultLinks);
    searchResultLinks.classList = "search-links"
    searchResultLinks.textContent = `${item.commonName}, ${item.region}`
    searchResultLinks.id = item.commonName
    searchResultLinks.href = `details.html?name=${item.commonName}`

    
}
)}



// searchResultLinks.addEventListener('click', () => {
//         click += 1
//         console.log('its clicked')
//     }) 





   




// const searchElemet = (searchResultsDiv) => {
//     const searchResultLinks = document.createElement('a');
//     searchResultsDiv.append(searchResultLinks);
//     searchResultLinks.classList = "search-links"

//     return searchResultLinks
    


// }


// const matchSearch = (userValue, searchResultLinks) => {
   
//     searchElemet(searchResultLinks); 
//     searchBarData.filter((item) => {
//     if (item.commonName.toLowerCase().startsWith(userValue) || 
//         item.officialName.toLowerCase().startsWith(userValue)) 
//     { 

//         searchResultLinks.innerHTML = item.commonName
//         console.log(item.commonName, item.region)

//     } 
    
// })}

// const divOfSearching = (searchResultLinks) => {
//     const searchResultsDiv = document.createElement('div');
//     searchBar.insertAdjacentElement('afterend', searchResultsDiv);
//     searchResultsDiv.classList = "search-output"

//     return searchResultsDiv
// }

// const searchBarElements = (item, searchResultsDiv) => {


// const searchResultLinks = document.createElement('a');
// searchResultsDiv.append(searchResultLinks);
// searchResultLinks.classList = "search-links"
// searchResultLinks.textContent = item.commonName


//   } 



 
    




    










