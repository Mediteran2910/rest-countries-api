const nativeName = document.getElementById('nativeName')
const population = document.getElementById('population')
const region = document.getElementById('region')
const domain = document.getElementById('domain')
const subRegion = document.getElementById('subRegion')
const capital = document.getElementById('capital')
const currencies = document.getElementById('currencies')
const languages = document.getElementById('languages')
const h2 = document.querySelector('h2')
const h3 = document.querySelector('h3')
const img = document.getElementById('country-flag')
const backArrow = document.getElementById('back-arrow')



const params = new URLSearchParams(window.location.search); //using build in js object to extract the string, in this case name, from another file and targeting that string with code in parenteses 
const countryName = params.get('name'); //getting the string of the name query 

// in the fuction bellow I'm making API call with url depanding on the country name(user click) from another file
const countriesDetails = async() => {
    if (countryName){
    const urlDetails = `https://restcountries.com/v3.1/name/${countryName}`
    console.log(countryName)
    const response = await axios.get(urlDetails)
    const data = response.data
    console.log(data)
    displayData(data) // after the api call, displaying the data 

    
} else{
    console.log( error, "I'm details error,")
}

}

// just a function of the dom manipulation, itterating over the response data from API call
const displayData = (data) => {
data.forEach((item) => {
    img.src = item.flags.png || item.flags.svg
    img.alt = item.flags.alt;
    h2.textContent = item.name.common;
    nativeName.textContent = item.name.official;
    population.textContent = item.population;
    region.textContent = item.region;
    subRegion.textContent = item.subregion;
    capital.textContent = item.capital;
    domain.textContent = item.tld;
    currencies.textContent =extractValues(item.currencies); //i will explain extract values bellow
    languages.textContent =extractValues(item.languages);

    createBorders(item); // calling function to create anchors links for borders
 
});
}



const createBorders = (item)=> {

    const oldBordersContainer = document.querySelector('.borders-container'); // saving container to variable because of easier check 

    if (oldBordersContainer) { 
        oldBordersContainer.remove();  // removing the old container of border countries if he already exist, so with this there is no duplication
    }

    let bordersContainer = document.createElement('div'); // making a div container for borders link, because of easier tracking and styling
    bordersContainer.classList.add('borders-container'); // adding the class for the same reasons 
    h3.insertAdjacentElement('afterend', bordersContainer)

    // in the block bellow I just iterate over each border and making the element for it, and adding event listener(borderDetails)
    if(item.borders) { 
    item.borders.forEach(border => { 
        let borderCountries = document.createElement('a')
        bordersContainer.append(borderCountries);
        borderCountries.textContent = border
        bordersDetails(borderCountries, border)
       
        
})



} else {  //in case there is no borders displaying the message
    const noBorders = document.createElement('p');
    h3.insertAdjacentElement('afterend', noBorders)
    noBorders.textContent = 'There is no border Countries!'
}
}

const bordersDetails = (borderCountries, border) => { 
    
    borderCountries.addEventListener('click', async() => {

    

    const urlBordersDetails = `https://restcountries.com/v3.1/alpha/${border}` //making an api call using the country code(in this case border)
    console.log(border)
    const response = await axios.get(urlBordersDetails)
    const data = response.data
    console.log(data)
    displayData(data) // displaying the new data on every click on the border link, with corresponding data of the border
    console.log(border)
})
}




const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value); // checking if it is plain object, because typeofnull returns object, and arrays are also object so i need to make sure it's plain object
    };

    const extractValues = (element) => {
    if (isObject(element)) {
    return Object.values(element).map(value => value.name || value).join(', '); //checking the element is object and extracting the values from it and adding comma

    } else if (Array.isArray(element)) { // checking if the element is array and extracting the value 
    return element.join(', ');
    }

    
    return ''; // returning epmty string if it is neither
    };


    backArrow.addEventListener('click', () => {
        window.location.href = "index.html"
    })

 
    

countriesDetails()