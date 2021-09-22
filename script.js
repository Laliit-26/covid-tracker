                // importing all classes 

const total_case = document.querySelector('.cases');
const total_death = document.querySelector('.deaths')
const total_recovered = document.querySelector('.recovers');
const tbody = document.querySelector('.table_body');
const btn_death = document.querySelector('.btn_death');
const btn_cases = document.querySelector('.btn_cases');
const btn_reset = document.querySelector('.btn_reset');
const search_country = document.querySelector('.country')


               // initilizing variables
var count=0 ;
var death=0 ;
var recovered = 0;
var active = 0;
let mp = new Map();


                      //  fetching api data and returning
                      // .
                      // .
async function get(url) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '5506d672c0mshf956266881ceab1p1b1c17jsn74b9b2547f4d',
      },
    }
    )
    const dat = await res.json();
    return dat;
}
                          //  calling api
get('https://covid-193.p.rapidapi.com/statistics').then((data) => {

                        //  set map object to getting quardinates of countries from data.json
  data.response.forEach((ele) => {
    mp.set(ele.country, ele.cases.total);
  })
                            // sorting data by new cases which is default sorting for table
                            // .
  async function sort_new() {
    const p = await data.response.sort(function (a, b) {
      return b.cases.new - a.cases.new;
    })
    return p;     
  }
  sort_new().then((data) => { call_again(data) });

                          // sorting data by death
                          // .
  async function sort_death() {
    tbody.innerHTML = "";
    console.log("death");
    const p = await data.response.sort(function (p, q) {
      return q.deaths['1M_pop'] - p.deaths['1M_pop'];
    })
    return p;
  }
  const call_death = () => {
    sort_death().then((data) => { call_again(data) });
  }
  btn_death.addEventListener('click', call_death);


                            // sorting data by new cases in 1 million
                            //  .
                            //  .

  async function sort_cases() {
    tbody.innerHTML = '';
    console.log('cases');
    const p = await data.response.sort(function (p, q) {
      return q.cases['1M_pop'] - p.cases['1M_pop'];
    })
    return p;
  }
  const call_cases = () => {
    sort_cases().then((data) => {
      call_again(data);
    });
  }
  btn_cases.addEventListener('click', call_cases);

                    //  reseting the data by new cases
                    //   .

  
  const reset = () => {
    tbody.innerHTML = ''
    sort_new().then((data) => { call_again(data) });
  
  }
  btn_reset.addEventListener('click', reset);

                      
                    //  sorting the data according to 
                    //  country name for dropdown
  async function sort_country() {
    const p = await data.response.sort((a, b) => { a.country > b.country });
    return p;
  }
                      // filling the country data in dropdown
  const call_country = () => {
    sort_country().then((data) => {
      console.log(data);
      data.forEach((ele) => {
        search_country.innerHTML += `<option value="${ele.country}">${ele.country}</option>`
      })
    })
  }
  call_country();

  const country_fill= async (event) => {
  
    const result = await data.response.filter((ele) => {
      return ele.country === event.target.value;
    })
    return result;
  }
  const country_change = async (event) => {
    tbody.innerHTML = '';
    const p = await country_fill(event).then((data) => {
      call_again(data);
    })
    return p;
  }

  search_country.addEventListener('change', country_change);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
                   
  // this function is for changing the table data
  // acc.to requirement by sending updated data
  
  function call_again(data) {
          
    // setting total cases,deaths,recovered data in flexboxes

            data.forEach((ele) => {
              if (ele.country ==='All') {
                count = numberWithCommas(ele.cases.total);
                death = numberWithCommas(ele.deaths.total);
                recovered = numberWithCommas(ele.cases.recovered);
                active = data[0].cases.active
              }
                // filling the data in table
              
                tbody.innerHTML += `<tr>
    <th scope='row'>${ele.country}</th>
    <td>${ele.cases.total}</td>
    <td>${ele.cases.new === null ? '0' : ele.cases.new}</td>
    <td>${ele.cases.critical === null ? '0' : ele.cases.critical}</td>
    <td>${ele.cases.active === null ? '0' : ele.cases.active}</td>
    <td>${ele.deaths.total === null ? '0' : ele.deaths.total}</td>
    <td>${ele.cases.recovered === null ? '0' : ele.cases.recovered}</td>
  </tr>`
            })
            show(count, death, recovered, active);
            setMap();
        }
})
                             // ending fetch

                          //  filling total cases,deaths
                           // , recovered data in flexboxes
const show=(count,death,recovered,active) => {
    total_case.innerHTML = count;
    total_death.innerHTML = death;
    total_recovered.innerHTML = recovered;
   
}
 
                      //  setting map
function setMap() {
    fetch('/data.json').then((res) => res.json()).then((data) => {

        data.forEach((ele) => {
            let latitude = ele.latitude;
            let longitude = ele.longitude;
            if (mp.has(ele.country)) {
                const marker = new mapboxgl.Marker({
                  draggable: false,
                  color: `rgb(${mp.get(ele.country) / 3000},
                   0
                  ,0`,
                })
                  .setLngLat([longitude, latitude])
                  .addTo(map)
            }

        })
    })
}

function onDragEnd() {
  const lngLat = marker.getLngLat()
  coordinates.style.display = 'block'
  coordinates.innerHTML = `Longitude: ${lngLat.longitude}<br />Latitude: ${lngLat.latitude}`
}

marker.on('dragend', onDragEnd);






