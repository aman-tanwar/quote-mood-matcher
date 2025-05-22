import { quotesData } from '/quotesData.js'

const moodRadios = document.getElementById("mood-radios")
const getQuoteBtn = document.getElementById("get-quote-btn")
const shortOnlyOption = document.getElementById("short-only-option")
const quoteModal = document.getElementById("quote-modal")
const quoteModalInner = document.getElementById("quote-modal-inner")
const quoteModalCloseNtn = document.getElementById("quote-modal-close-btn")

getQuoteBtn.addEventListener('click', renderQuote)

moodRadios.addEventListener('change', highlightRadioInput)

function highlightRadioInput(e) {
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}


quoteModalCloseNtn.addEventListener('click', function () {
    quoteModal.style.display = 'none'
})

function getMatchingMoodArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedRadioMood = document.querySelector('input[type="radio"]:checked').value
        const isShort = shortOnlyOption.checked

        const matchingMoodArray = quotesData.filter(function (quoteObject) {
            if (isShort) {
                return quoteObject.moodTags.includes(selectedRadioMood) && quoteObject.isShort
            } else {
                return quoteObject.moodTags.includes(selectedRadioMood)
            }
        })
        return matchingMoodArray
    }
}

function renderQuote() {
    const quoteObject = getSingleQuoteObject()
    quoteModalInner.innerHTML = `
        <h2>Your Quote</h2>
        <p class="quote-text">"${quoteObject.quote}"</p>
        <p class="quote-author">${quoteObject.author}</p>
    `
    quoteModal.style.display = 'flex'
}




function getSingleQuoteObject() {
    const quoteArray = getMatchingMoodArray()
    const randomNumber = Math.floor(Math.random() * (quoteArray.length))
    return quoteArray[randomNumber]
}


function getMoodsFromQuotesData(quotes) {
    const moodsArray = []
    for (let quote of quotes) {
        for (let mood of quote.moodTags) {
            if (!moodsArray.includes(mood)) {
                moodsArray.push(mood)
            }
        }
    }
    return moodsArray
}


function renderMoodRadio(quotesObject) {
    let moodRadioIndex = ``
    const moods = getMoodsFromQuotesData(quotesData)
    for (let mood of moods) {
        moodRadioIndex += `
        <div class="radio">
            <label for="${mood}">${mood}</label>
            <input
            type="radio"
            id="${mood}"
            value="${mood}"
            name="mood"
            >
        </div>`
    }
    moodRadios.innerHTML = moodRadioIndex
}

renderMoodRadio(quotesData)