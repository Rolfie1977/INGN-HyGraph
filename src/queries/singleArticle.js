export const singleArticle = `query MyQuery($articleID: ID!) {
    article(where: {id: $articleID}) {
      id
      heading
      author
      published
      text
      hashtag
      image {
        url
      }
    }
  }`