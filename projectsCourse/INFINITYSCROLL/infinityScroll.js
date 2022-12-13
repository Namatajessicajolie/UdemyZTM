//obtaining the dom elements
let imageContainer = document.querySelector('#img-container')
const loader = document.getElementById('#loader');

//unsplash apiurl 
const count = 10;
const apiKey = "dNTzySD_3Ex_IZUx5EmjyP8xXX_YUVj82IWZjGEYt54";
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;
//https: //api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

//function show loading
function showLoading() {

}

//function complete loading
function completeLoading() {

}
//helper unction to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//function display photos
function displayPhotos() {
    //showLoading();
    photosArray.forEach((photo) => {
        //create an ancor element
        let item = document.createElement('a');
        /* item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank'); */
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //create an image element
        let img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description

        })
        /* img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description); */
        // put the img inside the a then put both inside the image container Element
        item.appendChild(img);
        console.log(item);
        imageContainer.appendChild(item);

    });
    //run for each method for each object inphotosarray

    /* 
        for (let i = 0; i < photosArray.length; i++) {
            let item = document.createElement('a');
            item.setAttribute('href', photosArray[i].links.html);
            item.setAttribute('target', '_blank');

            //create img or photo
            let img = document.createElement('img');
            img.setAttribute('alt', photosArray[i].alt_description);
            img.setAttribute('src', photosArray[i].urls.regular);
            img.setAttribute('title', photosArray[i].alt_description);
            

            // put the img inside the a then put both inside the image container Element
            item.appendChild(img);
            imagecontainer.appendChild(item);
             }
             
            //completeLoading(); */


}

//function get photos from ansplash
async function getPhotos() {
    //showLoading();
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}
//chack to see if scrolling near bottom page, load more photos
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000){
        console.log('load more');
        getPhotos();
    }
})

//onload
getPhotos();