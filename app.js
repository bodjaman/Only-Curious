// SET URL

let landed = new Date("2012-08-06"); // landing date
let current = new Date(); // current date

let generated, generatedYear, generatedMonth, generatedDay, generatedDateStr;
const apiKey = process.env.API_KEY;
let url;

function randomDateInRange(start, end) {
  date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  generatedYear = date.getFullYear();
  generatedMonth = date.getMonth() + 1;
  generatedDay = date.getDate();
  generatedDateStr = `${generatedYear}-${generatedMonth}-${generatedDay}`;
  url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${generatedDateStr}&api_key=${apiKey}`;
}

// GET IMAGES

function getImages() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let photos = data.photos;
      for (let i = 0; i < photos.length; i++) {
        let element = document.createElement("img");
        element.src = photos[i].img_src;
        element.className = "photo";
        document.getElementById("rover-photos").appendChild(element);
      }
    });
}

randomDateInRange(landed, current);
document.getElementById("earth-date").innerHTML = generatedDateStr;
getImages();

// To Do:
// 1) ENV Variables
// 2) Push to GitHub and deploy on Netlify
// 3) Add extra features
//    - camera name on mouse-hover (following cursor)
//    - colour overlay buttons
//    - load images only, NOT whole page on new date
