const getRequest = (endpoint, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.response)
      return callback(res)
    }
  }
  xhr.open('GET', endpoint)
  xhr.send()
}

const justGivingCategories = (callback) => {
  getRequest('/categories', (res) => {
    return callback(res)
  })
}

const justGivingCharitiesByCategory = (categoryId, callback) => {
  getRequest('/charities/' + categoryId, (res) => {
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

  getRequest('/urls/' + charityId, (res) => {
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
