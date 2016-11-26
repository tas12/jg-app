const key = require('./config.js').JUST_GIVING_API_KEY

const justGivingGetRequest = (endpoint, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.response)
      return callback(res)
    }
  }
  xhr.open('GET', `http://api.sandbox.justgiving.com/v1${endpoint}`)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.setRequestHeader('x-api-key', key)
  xhr.send()
}

const justGivingCategories = (callback) => {
  justGivingGetRequest('/charity/categories', (res) => {
    return callback(res)
  })
}

const justGivingCharitiesByCategory = (categoryId, callback) => {
  justGivingGetRequest('/charity/search?categoryId=' + categoryId, (res) => {
    const results = res.charitySearchResults.map((charity) => {
      return {
        charityId: charity.charityId,
        name: charity.name,
        description: charity.description
      }
    })
    callback(results)
  })
}

const justGivingCharityUrls = (charityId, callback) => {

  justGivingGetRequest('/charity/' + charityId, (res) => {
    const urls = {
      website: res.websiteUrl,
      justGivingPage: res.profilePageUrl
    }
    callback(urls)
  })

}

module.exports = {
  justGivingCategories,
  justGivingCharitiesByCategory,
  justGivingCharityUrls
}
