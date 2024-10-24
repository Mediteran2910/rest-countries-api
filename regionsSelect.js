const regionFilter = document.getElementById('region-filter')
const regionsUl = document.querySelector('ul')
const regionsLi = document.querySelectorAll('li')
const africa = document.getElementById('africa')
const america = document.getElementById('america')
const asia = document.getElementById('asia')
const europe = document.getElementById('europe')
const oceania = document.getElementById('oceania')


    let isVisible = true; // variable for tracking is the select div visible

    const toggleRegionsVisibility = (e) => { // toogling display of list of regions
        if(!isVisible) {
            regionsUl.style.display = 'none'
            console.log('selections of regions is hidden'); 
        } else {
            regionsUl.style.display = 'grid'
            console.log('selection of regions is displayed')
        }
           isVisible = !isVisible
           e.stopPropagation() // stopping the event bubbling
        }

    

    regionFilter.addEventListener('click', (e) => {  // adding event listener fot displayin the regions manually, because working with html select element is PAIN
       toggleRegionsVisibility(e)
    })

    regionFilter.addEventListener('keydown', (e) => { // handling display for list of regions using keyboard 
        if(e.key === 'Enter' || e.key === ' ') {
            toggleRegionsVisibility(e)
        }
    })

    

    const regions = [africa, america, asia, europe, oceania];  
    const regionsStr = ["Africa", "America", "Asia", "Europe", "Oceania"];  
    // making two arrays of the same length, first one regions which includes elements so I can add a listeners on them,
    // and other one filled with strings so I can use them to get the data


    // now for each region I'm adding a event listener, using forEach array function with second parametar idx which will help me to make an API call,
    // this works because the regions arr and regionsStr arr are the same length, if there is some changes in the arr it will be terrible to update this,
    // but I hope there is not going to be another continent on the Earth, so it should be fine

    let clickCounter = 0;

    // regions.forEach((region, idx) => {
    //     region.addEventListener('click' , () => { 

    //     regionsUl.style.display = 'none' // here im just hidding the select div, and toggling again in the line bellow
    //     isVisible = !isVisible
            
    //     const urlRegion = `https://restcountries.com/v3.1/region/${regionsStr[idx]}`
    //     const getDataByRegion = async() => {

    //         try {
    //             const response = await axios.get(urlRegion); // here nothing special, just doing the promise and getting the data
    //             const data = response.data;

                

    //             console.log(data, "I'm promise data, of the selected region");
    //             return data;
    //         } catch (error) {
    //             console.error("I'm promise error, of the selected region");
    //         }
        
    //     }
    //     const displayDataRegion = async () => {
    //         const data = await getDataByRegion();
            
    //             removePreviousDivs(idx)
    //             makeElemet(data)
    //             console.log(`succesful display of region: ${regionsStr[idx]}`)
                
    //         }   
        
    //         displayDataRegion()
    //         console.log(`region name is targeted and displayed, ${regionsStr[idx]}`)
       
    //     })
    // })

    const fetchAndDisplayRegionData = async (idx) => {
        const urlRegion = `https://restcountries.com/v3.1/region/${regionsStr[idx]}`;
        
        try {
            const response = await axios.get(urlRegion);
            const data = response.data;
            removePreviousDivs(idx);
            makeElemet(data);
            console.log(`Successful display of region: ${regionsStr[idx]}`);
        } catch (error) {
            console.error("Error fetching data for the selected region");
        }
    };
    
    
    // Handling click and keyboard events for each region
    regions.forEach((region, idx) => {
        // Function to handle region selection
        const handleRegionSelection = () => {
            regionsUl.style.display = 'none'; // Hide the options
            isVisible = !isVisible;
    
            // Fetch and display data for the selected region
            fetchAndDisplayRegionData(idx);
        };
    
        // Click event for selecting a region
        region.addEventListener('click', handleRegionSelection);
    
        // Keyboard interaction for selecting a region
        region.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleRegionSelection(); // Call the same function on keyboard interaction
            }
        });
    });

    regions.forEach((region, idx) => {
        region.setAttribute('tabindex', '0'); // Make it focusable
    
        region.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                const nextRegion = regions[idx + 1] || regions[0]; // Wrap to the first if at the end
                nextRegion.focus(); // Move focus to the next region
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                const prevRegion = regions[idx - 1] || regions[regions.length - 1]; // Wrap to the last if at the start
                prevRegion.focus(); // Move focus to the previous region
                e.preventDefault();
            } else if (e.key === 'Enter' || e.key === ' ') {
                // Trigger the region selection
                regionsUl.style.display = 'none'; // Hide the options
                isVisible = !isVisible;
                fetchAndDisplayRegionData(idx);
                e.preventDefault();
            }
        });
    });

const removePreviousDivs = (idx) => {
    filterLabel.textContent = regionsStr[idx]
    const div = document.querySelectorAll('.country-list')
    div.forEach(element => element.remove())
}
// this is a function in which I remove the previous divs of regions which are selected
// and changing the text of label element of selected region