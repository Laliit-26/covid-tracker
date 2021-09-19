const total_case = document.querySelector('.cases');
const total_death = document.querySelector('.deaths')
const total_recovered = document.querySelector('.recovers');
const tbody = document.querySelector('.table_body');
const btn_death = document.querySelector('.btn_death');
const btn_cases = document.querySelector('.btn_cases');
const btn_reset = document.querySelector('.btn_reset');
const search_country = document.querySelector('.country')

console.log(search_country.value);



//   btn_death.addEventListener('onClick', function () {
//       console.log('clicked');
    // data.response.sort(function (p, q) {
    //   return q.deaths[1] - q.deaths[1]
    // })
 


var count=0 ;
var death=0 ;
var recovered = 0;
var active = 0;
let mp = new Map();

    // fetch('https://covid-193.p.rapidapi.com/statistics')
    // .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    // })

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
    // console.log(dat);
}
// setInterval(() => {
get('https://covid-193.p.rapidapi.com/statistics').then((data) => {
  console.log(data.response[10].deaths);
  // console.log(data.response);
  data.response.forEach((ele) => {
    mp.set(ele.country, ele.cases.total);
  })
 
  async function sort_new() {
    const p = await data.response.sort(function (a, b) {
      return b.cases.new - a.cases.new;
    })
    return p;
       
  }
  sort_new().then((data) => { call_again(data) });
      

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

  async function sort_cases() {
    tbody.innerHTML = '';
    console.log('cases');
    const p = await data.response.sort(function (p, q) {
      return q.cases['1M_pop'] - p.cases['1M_pop']
    })
    return p
  }
  const call_cases = () => {
    sort_cases().then((data) => {
      call_again(data);
    })
  }
  btn_cases.addEventListener('click', call_cases);

  
  const reset = () => {
    tbody.innerHTML = ''
    sort_new().then((data) => { call_again(data) });
  
  }
  btn_reset.addEventListener('click', reset);


  async function sort_country() {
    // tbody.innerHTML = ''
    console.log('cases')
    const p = await data.response.sort(function (p, q) {
      return q.country - p.country;
    })
    return p
  }
  const call_country = () => {
    sort_country().then((data) => {
      data.forEach((ele) => {
        search_country.innerHTML += `<option value="${ele.country}">${ele.country}</option>`
      })
      // call_again(data)
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
      call_again(data)
    })
    return p
  }

  search_country.addEventListener('change',country_change) 
  // result.textContent = `You like ${event.target.value}`



    // call_again(data);
        function call_again(data){
            console.log(data);
          //   count = data[0].cases.total
          //   death = data[0].deaths.total
          //   recovered = data[0].cases.recovered
          // active = data[0].cases.active;
            data.forEach((ele) => {
                // console.log(ele.country);
              if (ele.country ==='All') {
                count = ele.cases.total
                death = ele.deaths.total
                recovered = ele.cases.recovered
                active = data[0].cases.active
              }
                // death = ele[0].deaths.total;
                // recovered = ele[0].cases.recovered;
                // active = ele[0].cases.active;
                // count += ele.cases.total;
                // death += ele.deaths.total;
                // recovered += ele.cases.recovered;
                // active += ele.cases.active;
                tbody.innerHTML += `<tr>
    <th scope='row'>${ele.country}</th>
    <td>${ele.cases.total}</td>
    <td>${ele.cases.new}</td>
    <td>${ele.cases.critical}</td>
    <td>${ele.cases.active}</td>
    <td>${ele.deaths.total}</td>
    <td>${ele.cases.recovered}</td>
  </tr>`
            })
            console.log(count)
            show(count, death, recovered, active);
            setMap();
        }
    })
    

// }, 1000);

const show=(count,death,recovered,active) => {
    console.log(count, death, recovered, active);
    total_case.innerHTML = count;
    total_death.innerHTML = death;
    total_recovered.innerHTML = recovered;
   
}

function setMap() {
    fetch('/data.json').then((res) => res.json()).then((data) => {

        data.forEach((ele) => {
            let latitude = ele.latitude;
            let longitude = ele.longitude;
            // console.log(ele.country);
            if (mp.has(ele.country)) {
                // console.log(mp.get(ele.country),ele.country);
                const marker = new mapboxgl.Marker({
                    draggable: false,
                    color: `rgb(${mp.get(ele.country)/255},0,0)`
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
  coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`
}

marker.on('dragend', onDragEnd);




var countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central Arfrican Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauro',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];


