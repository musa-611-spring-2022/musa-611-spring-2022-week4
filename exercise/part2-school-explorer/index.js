/* global schools */

const schoolMap = L.map('school-map').setView([39.95303901388685, -75.16341794003617], 13);
const schoolLayer = L.layerGroup().addTo(schoolMap);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png',
}).addTo(schoolMap);

// const schoolList = document.querySelector('#school-list');
const gradeLevelSelect = document.querySelector('#grade-level-select');
const zipCodeSelect = document.querySelector('#zip-code-select');

/* ====================

# Exercise: School Explorer

## Introduction

In this exercise you will create the majority of a simple application that shows
schools within Philadelphia in both a map and a list, and allows a user to
filter the schools by zip code and grade level.

Data on Philadelphia schools has been pre-processed and is available in this
script as an array called `schools`. If you open up the index.html file in a
browser and open the JavaScript console, you can inspect the `schools` array.
You can also explore this data in the data/schools.js file in this repository.

## Step 1: Show the Schools on the Map ~~~~~~~~~~~~~~~~~~~~

Fill in the `updateSchoolMarkers` function to add a marker for each school. Note
that the function accepts an argument `schoolsToShow`. You can expect that this
argument is a list of school objects in the same format that you find in the
data/schools.js file. Only schools in the `schoolsToShow` array should get added
to the map.

Instead of adding the markers directly to the map with `.addTo(map)` as you have
in the past, add the markers to the `schoolLayer`, which is defined above on
line 4. Refer to the documentation for LayerGroup:
https://leafletjs.com/reference.html#layergroup */

let updateSchoolMarkers = (schoolsToShow) => {
  schoolLayer.clearLayers();
  schoolsToShow.forEach((school) => {
    // split the GPS Location entry of school
    let schoolGPS = school['GPS Location'].split(',');
    let lng = parseFloat(schoolGPS[0].trim());
    let lat = parseFloat(schoolGPS[1].trim());
    let schoolName = school['Abbreviated Name'];
    let marker = L.marker([lng, lat]).bindTooltip(schoolName);
    // add marker to LayerGroup
    schoolLayer.addLayer(marker);
  });
};


/**
## Step 2: Initialize the Zip Code Options ~~~~~~~~~~~~~~~~~~~~

Fill in the `initializeZipCodeChoices` function to add an option for each
unique zip code that appears in the schools data. In other words, to start with,
the `#zip-code-select` element has a single `option` element inside of it when
the page loads. Go find it in the index.html file. It looks like this:

  <select id="zip-code-select" class="form-select">
    <option value="">All</option>
  </select>

Without editing the index.html file, you'll be creating new `option` elements.
Each option element will have a zip code in it. That means the DOM tree for the
`#zip-code-select` element will look something like this:

  <select id="zip-code-select" class="form-select">
    <option value="">All</option>
    <option>19102</option>
    <option>19103</option>
    <option>19104</option>
    <option>19106</option>
    ...
  </select>

Truncate the zip codes to the first 5 digits.

TIP 1: You can use the `map` function to pull a specific attribute off of each
object in an array.

TIP 2: There are various libraries and techniques that you can use to trim down
an array to just it's unique elements, but the most efficient way to do this in
modern JavaScript is with a Set object. For example:

  const numbers = [1, 4, 2, 3, 4, 1, 2, 1, 3, 2, 4, 2, 3, 1, 2, 4];
  const uniqueNumbers = [...new Set(numbers)];
  console.log(uniqueNumbers);
  // ^^ will print something like [1, 4, 2, 3]

  const pets = ['dog', 'cat', 'cat', 'dog', 'cat', 'dog', 'dog'];
  const uniquePets = [...new Set(pets)];
  console.log(uniquePets);
  // ^^ will print something like ['dog', 'cat']

TIP 3: The htmlToElement function from part 1 of this exercise set is available
to use here as well (and should be used for this).
 */




let initializeZipCodeChoices = () => {
  // Get the zipcodeselece element
  const zipCodeSelectEle = document.getElementById('zip-code-select');
  // const zipCodeSelectEle = document.querySelector('#zip-code-select');
  // get the array of zipcode
  const arrOfZipCode = schools.map((school) => school['Zip Code'].substring(0, 5));
  // get unique members of arrOfZipCode
  const uniqueZipCodeArr = [...new Set(arrOfZipCode)];
  // loop through each zip code and add it to the zip-code-select element
  for (let zipcode of uniqueZipCodeArr) {
    zipCodeSelectEle.innerHTML += `<option>${zipcode}</option>`;
  }
};



/**
## Step 3: Show the School Names in a List ~~~~~~~~~~~~~~~~~~~~

Fill in the `updateSchoolList` function to add a new `li` element into the
`#school-list` element for each school. The `#school-list` element starts off
empty when the page loads. Go find the element in the index.html file. It looks
like this:

  <ol id="school-list"></ol>

Without editing the index.html file, you'll be creating new list item (`li`)
elements. Each list item will have the name of a school in it (use the
"Publication Name" attribute from the school objects). That means the DOM tree
for the `#school-list` element will look something like this:

  <ol id="school-list">
    <li>Northeast Community Propel Academy<li>
    <li>John Bartram High School</li>
    <li>West Philadelphia High School</li>
    <li>High School of the Future</li>
    <li>Paul Robeson High School for Human Services</li>
    ...
  </ol>

This will be very similar to the previous step, except instead of creating
`option` elements, you'll be creating `li` elements.
 */

let updateSchoolList = (schools) => {
  // get the school-list element
  let schoolListEle = document.getElementById('school-list');
  schoolListEle.innerHTML = '';
  // create a list with only names of schools
  const schoolNameArr = schools.map((school) => school['Publication Name']);
  // add schoolNameArr to schoolListEle
  schoolNameArr.forEach((schoolName) => {
    schoolListEle.innerHTML += `<li>${schoolName}</li>`;
  });
};


/*
## Step 4: Filter the Schools ~~~~~~~~~~~~~~~~~~~~

Fill in the `filteredSchools` function. This function should start from the
`schools` array, and return a new array that only contains the schools that
should be shown on the map, according to the selected grade level and zip code.
Refer to the `handleSelectChange` to see how the `filteredSchools` function will
be used. */

let filteredSchools = () => {
  // get selected zipCode value
  let zipCode = document.getElementById('zip-code-select').value;
  // get selected Grade value
  let grade = document.getElementById('grade-level-select').value;
  // filter schools arr based on selected zipcode and grade

  const schoolsFiltered = schools.filter((school) => {
    let ifZipAndGrade;
    if (grade === '' && zipCode === '') {
      ifZipAndGrade = true;
    } else if (grade === '') {
      ifZipAndGrade = school['Zip Code'].substring(0, 5) === zipCode;
    } else if (zipCode === '') {
      ifZipAndGrade = school[grade] === '1';
    } else {
      ifZipAndGrade = (school['Zip Code'].substring(0, 5) === zipCode) && (school[grade] === '1');
    }
    return ifZipAndGrade;
  });
  return schoolsFiltered;
};



/**
## Step 5: Clear the map and list before adding new items ~~~~~~~~~~~~~~~~~~~~

At this point, if you filter the schools by grade or zip code, you should see
new items get added to the map and the list. However, the old items are still
there as well. Update the `updateSchoolMarkers` and `updateSchoolList` functions
clear the map and the list element before adding new items.

==================== */




/*

No need to edit anything below this line ... though feel free.

*/

// The handleSelectChange function is an event listener that will be used to
// update the displayed schools when one of the select filters is changed.
let handleSelectChange = () => {
  const schoolsToShow = filteredSchools() || [];
  updateSchoolMarkers(schoolsToShow);
  updateSchoolList(schoolsToShow);
};

gradeLevelSelect.addEventListener('change', handleSelectChange);
zipCodeSelect.addEventListener('change', handleSelectChange);

// The code below will be run when this script first loads. Think of it as the
// initialization step for the web page.
initializeZipCodeChoices();
updateSchoolMarkers(schools);
updateSchoolList(schools);
