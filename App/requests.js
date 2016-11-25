const key = require('./config.js').JUST_GIVING_API_KEY

const map = require('async').map

const justGivingGetRequest = (endpoint, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.response)
      return callback(res)
    }
  }
  xhr.open('GET', `http://api.sandbox.justgiving.com/${key}/v1${endpoint}`)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send()
}

const justGivingCategories = (callback) => {
  justGivingGetRequest('/charity/categories', (res) => {
    return callback(res)
  })
}

const justGivingCharitiesByCategory = (categoryId) => {
  // justGivingGetRequest('/charity/search?categoryId=' + categoryId, (res) => {
  //   const results = res.charitySearchResults.map((charity) => {
  //     return {
  //       charityId: charity.charityId,
  //       name: charity.name,
  //       description: charity.description
  //     }
  //   })
  //   callback(results)
  // })

  return new Promise((resolve, reject) => {
    justGivingGetRequest('/charity/search?categoryId=' + categoryId, (res) => {
      const results = res.charitySearchResults.map((charity) => {
        return {
          id: charity.charityId,
          name: charity.name,
          description: charity.description
        }
      })
      resolve(results)
    })
  })
}

const allData = (categoryId, callback) => {
  justGivingCharitiesByCategory(categoryId)
    .then((res) => {
      map(res, charityData, (err, results) => {
        return callback(results)
      })
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

const charityData = (data, callback) => {
  justGivingCharityUrls(data.id, (urls) => {
    callback(null, Object.assign(data, urls))
  })
}

module.exports = {
  justGivingCategories,
  justGivingCharitiesByCategory,
  allData,
}
