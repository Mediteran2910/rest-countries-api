
const section = document.querySelector('section')
const userInput = document.querySelector("input")
const form = document.querySelector('form')
const searchBar = document.getElementById('searching-bar')
const filterLabel = document.querySelector('label')
const body = document.querySelector('body')



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


let clicker = 0;
const searchResultsDiv = document.createElement('div');
searchBar.insertAdjacentElement('afterend', searchResultsDiv);
searchResultsDiv.classList = "search-output";
searchResultsDiv.style.display = 'none'

const changeHeight = (arr) => {
    if ( arr.length <= 3 ) {
        searchResultsDiv.style.marginBottom = '-100px'
    } 
    else if (arr.length <= 1){
        searchResultsDiv.style.marginBottom = '-40px'
        searchResultsDiv.style.marginTop = '-200px'

    }
}

searchBar.addEventListener('click', () => {
    clicker += 1;
  
    
    if(clicker === 1) {
        console.log(clicker, "numbers of clicks")
        searchResultsDiv.style.display = 'flex'
       

        

        CountriesList(searchResultsDiv) 

      
        
        
    } else {
        console.log(clicker)
        searchResultsDiv.style.display = 'none'
        clicker = 0;
    }
})

let searchResultLinks;

const makeAnchorsElements = (item) => {
    searchResultLinks = document.createElement('a');
    searchResultsDiv.append(searchResultLinks);
    searchResultLinks.classList = "search-links"
    searchResultLinks.textContent = `${item.commonName}, ${item.region}`
    searchResultLinks.id = item.commonName
    searchResultLinks.href = `details.html?name=${item.commonName}`
}

 const CountriesList = () => {
    searchBarData.forEach((item) => {
        makeAnchorsElements(item);
   

    
}
)}



userInput.addEventListener('input', (event) => {
    const userSearch = event.target.value.toLowerCase();
    
    const filteredResults = searchBarData.filter(country => {
        const hasCommonName = typeof country.commonName === 'string' && country.commonName.toLowerCase().startsWith(userSearch);
        const hasOfficialName = typeof country.officialName === 'string' && country.officialName.toLowerCase().startsWith(userSearch);

        return hasCommonName || hasOfficialName; // Filter by either common or official name
    });

    console.log(filteredResults)
    searchResultsDiv.innerHTML = '';
    changeHeight(filteredResults)


    if (filteredResults.length === 0){
        searchResultLinks = document.createElement('p');
        searchResultsDiv.append(searchResultLinks);
        searchResultLinks.textContent = 'Nothing was found'


    }else{
         filteredResults.forEach((item) => {
            makeAnchorsElements(item)
            
        });
}
    })

         




 
    




    










