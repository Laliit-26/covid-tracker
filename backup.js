const total_case = document.querySelector('.total_case')
const total_death = document.querySelector('.total_death')
const total_recovered = document.querySelector('.total_recovered')
const tbody = document.querySelector('.table_body')
const btn_death = document.querySelector('.btn_death')

console.log(btn_death)

//   btn_death.addEventListener('onClick', function () {
//       console.log('clicked');
// data.response.sort(function (p, q) {
//   return q.deaths[1] - q.deaths[1]
// })

var count = 0
var death = 0
var recovered = 0
var active = 0

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
  })
  const dat = await res.json()
  return dat
  // console.log(dat);
}
// setInterval(() => {
get('https://covid-193.p.rapidapi.com/statistics').then((data) => {
  data.response.sort(function (a, b) {
    return b.cases.new - a.cases.new
  })
  // btn_death.addEventListener('onclick', function () {
  //     console.log('clicked');
  //     data.response.sort(function (p, q) {
  //         return q.deaths[1] - q.deaths[1]
  //     })
  // });

  const call = () => {
    console.log('click')
    data.response.sort(function (p, q) {
      return q.deaths[1] - q.deaths[1]
    })
  }
  btn_death.onclick = call

  console.log(data)
  count = data.response[0].cases.total
  death = data.response[0].deaths.total
  recovered = data.response[0].cases.recovered
  active = data.response[0].cases.active
  data.response.forEach((ele) => {
    // console.log(ele.cases.total);

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
  show(count, death, recovered, active)
})

// }, 1000);

const show = (count, death, recovered, active) => {
  console.log(count, death, recovered, active)
  total_case.innerHTML = count
  total_death.innerHTML = death
  total_recovered.innerHTML = recovered
}
// console.log(count);

// var co = 0;
// setTimeout(() => {
//     const add = () => {
//       co = 2
//     }
// }, 2000);

// console.log(co);
// add();
