export const Articles = `query MyQuery {
    articles {
        id
        author
        heading
        published
        hashtag
        text
        image{
          url
        }
      }
  }`