const request = require('./requests.js')
const DOM = require('./domElements.js')
const colours = require('./colours.js')

const addCategoriesToDom = (arrOfCategories) => {
  arrOfCategories.forEach((el, i) => {
    createSideBarCategory(el, i)
    createDropdownCategory(el)
  })
}

request.justGivingCategories(addCategoriesToDom)

const createDropdownCategory = (category) => {
  const newCategory = document.createElement('a')
  newCategory.href = '#'
  newCategory.textContent = category.category
  DOM.dropdownContent.appendChild(newCategory)
  categoryListener(newCategory, category)
}

const createSideBarCategory = (category, i) => {
  const newCategory = DOM.categoryOption.cloneNode(true)
  newCategory.querySelector('h2 a').textContent = category.category
  newCategory.querySelector('h2 a').href = '#'
  newCategory.style.display = 'block'
  newCategory.style.backgroundColor = colours[i % colours.length]
  DOM.categoriesSidebar.appendChild(newCategory)
  categoryListener(newCategory, category)
}

const categoryListener = (node, category) => {
  node.addEventListener('click', () => {
    DOM.searchResults.innerHTML = ''
    DOM.dropdownButton.textContent = category.category
    request.justGivingCharitiesByCategory(category.id, addCharitiesToDom)
  })
}

const addCharitiesToDom = (charitiesArr) => {
  charitiesArr.forEach((charity, i) => {
    const newPanel = clonePanel(charity, i)
    request.justGivingCharityUrls(charity.charityId, (urls) => {
      newPanel.querySelector('.charity-jg-page a').href = urls.justGivingPage
      newPanel.querySelector('.charity-name a').href = urls.website
    })
  })
}

const clonePanel = (charity, i) => {
  const newPanel = DOM.panel.cloneNode(true)
  DOM.appDescription.style.display = 'none'
  const delay = '0.' + i + 's'
  newPanel.style.animationDelay = delay
  newPanel.style.display = 'block'
  newPanel.querySelector('.charity-name a').textContent = charity.name
  newPanel.querySelector('.charity-desc').textContent = charity.description
  DOM.searchResults.appendChild(newPanel)
  return newPanel
}
