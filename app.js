// let input=document.querySelector("input");
// let btn=document.querySelector("button");
// let nasa=[];
// input.addEventListener("input", function(){
// if(isNaN(input.value) ||input.value===""){
// btn.className="disabled";
// }else{
//   btn.className="";
// }}
// )


// btn.addEventListener("click" , function(){

// if(input.value!==""){
// fetch(`https://api.nasa.gov/planetary/apod?api_key=Fydgfzbn56lWIHMZnKbsu7W9poyaAk9TMePwf8rK&count=${input.value}`)
// .then(res => res.json())
// .then(reslut =>{
//     console.log(reslut)
//     nasa=reslut;
// })
// { 
//    }}
// })




const inputNumber = document.getElementById('input-number')
const submitBtn = document.getElementById('submit-btn')
const imageDetails = document.getElementById('image-details')
const gallery = document.getElementById('gallery')
let information = []

// events listeners
inputNumber.addEventListener('keyup', function () {
  if (Number(inputNumber.value)) {
    submitBtn.removeAttribute('disabled')
  } else {
    submitBtn.setAttribute('disabled', true)
  }
})

submitBtn.addEventListener('click', function (event) {
  event.preventDefault()

  let inputValue = inputNumber.value

  imageDetails.innerHTML = "";

  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=8PrMHpPeTU4lrZx2fqyzPtV086hewfctfuTEIEDu&count=${inputValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      information = generateIndex(data)
      render(information)
    })
})

gallery.addEventListener('click', function (event) {
  if (event.target.classList.value === "overlay" || event.target.parentElement.classList.value === "overlay") {
    let itemIndex = event.target.parentElement.getAttribute("data-index");

    let item = information.filter(object => {
      if (Number(itemIndex) === object.index) {
        return object;
      }
    })

    imageDetails.innerHTML = renderItemDetails(item[0]);
  }
})

imageDetails.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    imageDetails.innerHTML = "";
  }

  imageDetails.setAttribute("data-media", item[0].media_type);
  if (imageDetails.getAttribute("data-media") === "video") {
    const embed = imageDetails.getElementsByTagName("embed")[0];

    event.target.setAttribute("target", "_blank");
  }

})

// functions
function render(data) {
  gallery.innerHTML = data.reduce((result, media) => {
    const { index, date, media_type, title, url } = media

    if (media_type !== 'other') {
      result += `
      <div class="gallery-item" data-index=${index}>
        <h4>${media_type}</h4>
        <div class="overlay">
          <h3>${title}</h3>
          <p>${date}</p>
        </div>
        <embed src="${url}">
      </div>
    `
    }

    return result
  }, '')
}

function renderItemDetails(item) {
  const { title, explanation, url, copyright } = item;
  let result = `
    <h2>${title}</h2>
    <p>${explanation}</p>
    <embed
      src="${url}">
    <button>X</button>
  `

  if (copyright) {
    result += `<p class="copyright">©copyright ${copyright}</p>`;
  }

  return result;
}

function generateIndex(data) {
  return data.map((obj, index) => {
    obj.index = index
    return obj
  })
}