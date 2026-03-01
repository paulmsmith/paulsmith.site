module.exports = {
  layout: 'weeknote.njk',
  feed: {
    url: '/weeknotes/feed.xml'
  },
  // Use a date + title-based URL for individual weeknotes
  // e.g. /weeknotes/2021-04-05/weeknotes-1/
  permalink: "weeknotes/{{ date | date('yyyy-LL-dd') }}/{{ title | slug }}/"
}
