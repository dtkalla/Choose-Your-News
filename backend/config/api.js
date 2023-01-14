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
   
    const url = `${newyorktimesUrl}${filterQueryString}&sort=relevance&api-key=${newyorktimesApiKey}`;

    const response = await axios.get(url);

    const data = response.data.response.docs;
    
    let articles = data.map(datum => {
        return {
            headline: datum.headline.main,
            summary: datum.abstract,
            source: datum.source,
            publishedDate: datum.pub_date,
            url: datum.web_url
        }
    })

    if (articles.length == 0) {
        articles.push(new Article({
            headline: 'None',
            summary: 'None',
            source: 'None327',
            publishedDate: "2022-12-21 12:40:02",
            url: 'None'
        }
        ))
    }

    return articles.sort((a, b) => (a.publishedDate < b.publishedDate) ? 1 : -1);
}