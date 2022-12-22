const axios = require("axios").default;
const { newyorktimesApiKey } = require('./keys');

exports.fetchArticlesFromNewYorkTimes = async (query) => {
    const newyorktimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';

    const filterQueryObj = {
        'headline': query,
        'document_type': 'article'
    };

    let filterQueryString = "";
    for (const key in filterQueryObj) {
        if (filterQueryObj.hasOwnProperty(key)) {
            filterQueryString += `fq=${key}:(${filterQueryObj[key]})&`
        }
    }

    const url = `${newyorktimesUrl}sort=newest&${filterQueryString}&api-key=${newyorktimesApiKey}`;
    const response = await axios.get(url);
    const data = response.data.response.docs;
    const articles = data.map(datum => {
        return {
            headline: datum.headline.main,
            summary: datum.abstract,
            source: datum.source,
            publishedDate: datum.pub_date,
            url: datum.web_url
        }
    })
    return articles.sort((a, b) => (a.publishedDate < b.publishedDate) ? 1 : -1);
}