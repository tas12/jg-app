const request = require('./requests.js')

const colours = ['#fba200', '#a1c50e', '#f16c65', '#38bcf1']

const DOM = {
  button: document.querySelector('button[name=jg-request]'),
  body: document.querySelector('body'),
  dropdownContent: document.querySelector('.dropdown-content'),
  dropdownButton: document.querySelector('.dropbtn'),
  searchResults: document.querySelector('#search-results'),
  panel: document.querySelector('.panel'),
  appDescription: document.querySelector('#app-desc'),
  categoriesSidebar: document.querySelector('#categories-sidebar'),
  categoryOption: document.querySelector('.category-option')
}

const addCharitiesToDom = (charitiesArr) => {
  charitiesArr.forEach((charity, i) => {
    const newPanel = DOM.panel.cloneNode(true)
    DOM.appDescription.style.display = 'none'
    const delay = '0.' + i + 's'
    newPanel.style.animationDelay = delay
    newPanel.style.display = 'block'
    newPanel.querySelector('.charity-name a').textContent = charity.name
    newPanel.querySelector('.charity-desc').textContent = charity.description
    DOM.searchResults.appendChild(newPanel)
    request.justGivingCharityUrls(charity.charityId, (urls) => {
      newPanel.querySelector('.charity-jg-page a').href = urls.justGivingPage
      newPanel.querySelector('.charity-name a').href = urls.website
    })
  })
}

const addCategoriesToDropdown = (arrOfCategories) => {
  arrOfCategories.forEach((el, i) => {
    const category = document.createElement('a')
    category.href = '#'
    category.textContent = el.category
    const newCat = DOM.categoryOption.cloneNode(true)
    newCat.querySelector('h2 a').textContent = el.category
    newCat.querySelector('h2 a').href = '#'
    newCat.style.display = 'block'
    newCat.style.backgroundColor = colours[i % colours.length]
    DOM.categoriesSidebar.appendChild(newCat)
    category.addEventListener('click', () => {
      DOM.searchResults.innerHTML = ''
      DOM.dropdownButton.textContent = el.category
      request.justGivingCharitiesByCategory(el.id, addCharitiesToDom)
    })
    newCat.addEventListener('click', () => {
      DOM.searchResults.innerHTML = ''
      DOM.dropdownButton.textContent = el.category
      request.justGivingCharitiesByCategory(el.id, addCharitiesToDom)
    })
    DOM.dropdownContent.appendChild(category)
  })
}

request.justGivingCategories(addCategoriesToDropdown)
