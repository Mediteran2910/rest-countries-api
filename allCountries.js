const countriesWrapper = document.getElementById('countries-wrapper')

const urlAllCountries = 'https://restcountries.com/v3.1/all?fields=name,population,continents,capital,flags' 
// In the matter of better performance and faster loading, filtering API call only with values I need, instead of requesting all the data




const getDataAll = async () => {
    try{
        const response = await axios.get(urlAllCountries);
        const data = response.data
        console.log(data, "I'm data of the promise, of all countries");
        return data
    } catch(error) {
        console.log(error, "I'm error of the promise, of all countries")
    }
} // API call 


const makeElemet = (data) => {

    for(let country of data) { // looping over the data and for each object making a div with other HTML elements inside
    const countryAnchor = document.createElement('a');
    const h2 = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const countryImg = document.createElement('img');
    const population = document.createElement('span');
    const region = document.createElement('span');
    const capital = document.createElement('span');

    countriesWrapper.append(countryAnchor);
        countryAnchor.append(countryImg, h2, p1, p2, p3);

        countryAnchor.href = `details.html?name=${country.name.common}` 

        h2.textContent = country.name.common;

        p1.textContent = "Population:";
        p1.append(population)

        p2.textContent = "Region:";
        p2.append(region);
        
        p3.textContent = "Capital:";
        p3.append(capital)

        countryImg.src = country.flags.png || country.flags.svg; // if there is no png display svg
        countryImg.alt = country.flags.alt;
        population.textContent = country.population
        region.textContent = country.continents
        capital.textContent = country.capital 

        countryAnchor.classList = "country-list";
        countryImg.classList = "country-img";
        h2.classList = "country-name";
        
        [p1, p2, p3].forEach((p) => p.classList = "country-description")

        //for the spans I just made styling in css so every time when span occurs browser will catch that styling 

        //adding classes which I made in css, also iterating the paragrafs bacause all of them have same class  
}}


const displayData = async () => {
    const data = await getDataAll();
        makeElemet(data)
        
    }   

// putting everything in the same function and running it as soon as page open    

displayData()

