const request = require('./requests.js')

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
  charitiesArr.forEach((charity) => {
    const newPanel = DOM.panel.cloneNode(true)
    DOM.appDescription.style.display = 'none'
    newPanel.style.display = 'block'
    newPanel.querySelector('.charity-name a').textContent = charity.name
    newPanel.querySelector('.charity-name a').href = charity.website
    newPanel.querySelector('.charity-desc').textContent = charity.description
    newPanel.querySelector('.charity-jg-page a').textContent = 'Visit JustGiving page'
    newPanel.querySelector('.charity-jg-page a').href = charity.justGivingPage
    DOM.searchResults.appendChild(newPanel)
  })
}

const addCategoriesToDropdown = (arrOfCategories) => {
  arrOfCategories.forEach((el) => {
    const category = document.createElement('a')
    category.href = '#'
    category.textContent = el.category
    const newCat = DOM.categoryOption.cloneNode(true)
    newCat.querySelector('h2 a').textContent = el.category
    newCat.querySelector('h2 a').href = '#'
    newCat.style.display = 'block'
    DOM.categoriesSidebar.appendChild(newCat)
    category.addEventListener('click', () => {
      DOM.searchResults.innerHTML = ''
      DOM.dropdownButton.textContent = el.category
      request.allData(el.id, addCharitiesToDom)
    })
    newCat.addEventListener('click', () => {
      DOM.searchResults.innerHTML = ''
      DOM.dropdownButton.textContent = el.category
      request.allData(el.id, addCharitiesToDom)
    })
    DOM.dropdownContent.appendChild(category)
  })
}

request.justGivingCategories(addCategoriesToDropdown)
