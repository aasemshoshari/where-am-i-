const section = document.querySelector(".countries");
const locationBtn = document.querySelector(".location-btn");

const fetchCountry = async (country) => {
  try {
    const request = await fetch(`https://restcountries.com/v3.1/name/${country}
    `);

    const data = await request.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const renderCountry = async (data) => {
  const [countries] = await data;
  console.log(countries);
  const [lat, lng] = countries.latlng;
  const latitude = Math.trunc(lat);
  const longitude = Math.trunc(lng);

  const country = `
      <article class="country">
      <div class="hidden">${latitude}</div>
      <div class="hidden">${longitude}</div>
      <div class="country-flag"><img src="${countries.flags.svg}" /></div>
      <div class="country-infos">
        <div class="name"><i class="fas fa-flag"></i><p>${
          countries.name.official
        }</p></div>
        <div class="country-currency"><i class="fas fa-money-bill-alt"></i><p>${
          Object.values(countries.currencies)[0].name
        }</p></div>
        <div class="country-language"><i class="fas fa-globe-europe"></i><p>${
          Object.values(countries.languages)[0]
        }</p></div>
        <div class="country-capital"><i class="fas fa-city"></i><p>${
          countries.capital[0]
        }</p></div>
      <div>


    </article>
      `;
  section.insertAdjacentHTML("afterbegin", country);
  section.style.opacity = "1";
};

const jordan = fetchCountry("jordan");
const palestine = fetchCountry("palestine");
const syria = fetchCountry("syria");
const iraq = fetchCountry("iraq");
const yemen = fetchCountry("yemen");
const egypt = fetchCountry("egypt");
const ksa = fetchCountry("saudi");
const oman = fetchCountry("oman");
const kuwait = fetchCountry("kuwait");
const uae = fetchCountry("uae");
const lebanon = fetchCountry("lebanon");
const qatar = fetchCountry("qatar");

renderCountry(jordan);
renderCountry(palestine);
renderCountry(syria);
renderCountry(iraq);
renderCountry(egypt);
renderCountry(ksa);
renderCountry(oman);
renderCountry(kuwait);
renderCountry(uae);
renderCountry(lebanon);
renderCountry(qatar);

async function renderUserCountry(latitude, longitude) {
  const countries = await document.querySelectorAll(".country");
  countries.forEach((country) => {
    country.classList.add("hidden");
    const [lat, lng] = country.querySelectorAll(".hidden");
    //due to unaccurate coordinates provided by countries API
    if (
      lat.textContent == Math.floor(latitude) &&
      lng.textContent == Math.ceil(longitude)
    ) {
      country.classList.remove("hidden");
      country.classList.add("center");
    }
  });
}
const getCoords = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let { latitude, longitude } = position.coords;
    renderUserCountry(latitude, longitude);
  });
};

locationBtn.addEventListener("click", getCoords);
