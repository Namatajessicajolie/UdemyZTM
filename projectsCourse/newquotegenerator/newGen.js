let apiQuotes = [];
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
//showloading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//function complete
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function newQuote() {
    showLoadingSpinner();
    //pick a random quote from the array
    const newquote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //chck quote length for styling
    if (newquote.text.length > 50) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    //check if author field is blank
    if (!newquote.author) {
        quoteAuthor.textContent = "Unknown";
    } else {
        quoteAuthor.textContent = newquote.author;

    }
    //setquote and hide loader

    quoteText.textContent = newquote.text;
    removeLoadingSpinner();

}


//quotes from api
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

    }
}

//tweet a quote using a template string
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank')
}
//eventListeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//onload
getQuotes();