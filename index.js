
const section = document.querySelector('section')
const userInput = document.querySelector("input")
const form = document.querySelector('form')
const searchBar = document.getElementById('searching-bar')
const filterLabel = document.querySelector('label')
const body = document.querySelector('body')


    const urlSearchBar = 'https://restcountries.com/v3.1/all?fields=name,region'

    const urlDetails = 'https://restcountries.com/v3.1/name/{name}'

    let searchBarData = []; 
    //declaring the data array of objects globaly, because i dont want to make an API call everytime on user type 

   
    const getDataNamesOnly  = async() => {
        const response = await axios.get(urlSearchBar);
        const data = response.data;
        
        searchBarData = data.map((element) => {   //iterating over data 
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



const searchResultsDiv = document.createElement('div');
searchBar.insertAdjacentElement('afterend', searchResultsDiv);
searchResultsDiv.classList = "search-output";
searchResultsDiv.style.display = 'none'


const changeHeight = (arr) => {
    const viewportWidth = document.documentElement.clientWidth;
    if(viewportWidth > 800){
        if(arr.length < 2 || arr.length === 0) {
            searchResultsDiv.classList.remove('search-output-ThreeResultWide', 'search-output-AllResultWide');
            searchResultsDiv.classList.add('search-output-OneResultWide')
        } 
        else if(arr.length < 4) {
           
            searchResultsDiv.classList.add('search-output-ThreeResultWide')
        }
        else{
            searchResultsDiv.classList.remove('search-output-ThreeResultWide', 'search-output-OneResultWide');
           
        }
    
    
} else if(viewportWidth < 800){
    if(arr.length < 2 || arr.length === 0) {
        countriesWrapper.style.marginTop = '55px'
    } else {
        countriesWrapper.style.marginTop = '0px'
    }
}
}
// in the function above im fix bug of overlaping elements while searching by typing

let clicker = 0;
searchBar.addEventListener('click', () => {
    const viewportWidth = document.documentElement.clientWidth;
    clicker += 1;
    
    
    if(clicker === 1) {
        console.log(clicker, "numbers of clicks")
        searchResultsDiv.style.display = 'flex'
        CountriesList(searchResultsDiv) 
        if(viewportWidth < 800) {
            regionFilter.style.opacity = '0'
        }

    } else {
        console.log(clicker)
        searchResultsDiv.style.display = 'none'
        regionFilter.style.opacity = "1"
        clicker = 0;
    }
})
// function which counts clicks to toggle display of the div

let searchResultLinks;

const makeAnchorsElements = (item) => {
    searchResultLinks = document.createElement('a');
    searchResultsDiv.append(searchResultLinks);
    searchResultLinks.classList = "search-links"
    searchResultLinks.textContent = `${item.commonName}, ${item.region}`
    searchResultLinks.id = item.commonName
    searchResultLinks.href = `details.html?name=${item.commonName}`
} // reusable function for displaying results of searching



 const CountriesList = () => {
    searchBarData.forEach((item) => {
        makeAnchorsElements(item);   
}
)} // displaying scrolable list of all countries



userInput.addEventListener('input', (event) => {
    const userSearch = event.target.value.toLowerCase(); //tracking every value of user input 
    
    const filteredResults = searchBarData.filter(country => {
        const hasCommonName = typeof country.commonName === 'string' && country.commonName.toLowerCase().startsWith(userSearch);
        const hasOfficialName = typeof country.officialName === 'string' && country.officialName.toLowerCase().startsWith(userSearch); // checking if the data from arr is string and making it lower cased if it is
        
        return hasCommonName || hasOfficialName; // Filter by either common or official name
    }); 
    

    console.log(filteredResults)
    console.log(filteredResults.length)
    console.log( searchResultsDiv.style.marginTop)
    changeHeight(filteredResults) // just calling the function to change margins
    
    searchResultsDiv.innerHTML = ''; //clearing the div of results after every change of input value, because of repetition 
    


    if (filteredResults.length === 0){
        
        searchResultLinks = document.createElement('p');
        searchResultsDiv.append(searchResultLinks);
        searchResultLinks.textContent = 'Nothing was found'
        // handaling the case if there is no results to show


    }else{
         filteredResults.forEach((item) => {
            
            makeAnchorsElements(item)
            // showing the results
            
        });
}
    })

         




 
    




    










