import { useQuery } from "@tanstack/react-query";
import { request } from "graphql-request";
import { Link } from "react-router-dom";
import { Articles } from "../../queries/Articles";
import s from "./Content.module.scss";

export const Content = ({ selectedHashtag }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Articles"],
    queryFn: async () =>
      request(
        "https://eu-west-2.cdn.hygraph.com/content/cm1omm29a04rh07uxvrzowh0r/master",
        Articles
    ),
    
});
console.log(Articles);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error {error.message}</p>;
  }
  console.log(data);

  const filteredArticles = selectedHashtag
    ? data?.articles.filter((article) =>
        article.hashtag?.toLowerCase().includes(selectedHashtag.toLowerCase())
      )
    : data?.articles;

  const formatDate = (dateString) => {
    try {
      const dateParts = dateString.split(/[-T :]/);
      if (dateParts.length >= 3) {
        const day = String(dateParts[2]).padStart(2, "0");
        const month = String(dateParts[1]).padStart(2, "0");
        const year = dateParts[0];
        return `${day}/${month}-${year}`;
      }
      return "Invalid date";
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className={s.contentStyle}>
      {filteredArticles.map((item) => (
        <article className={s.articleStyle} key={item.id}>
          <div className={s.articleDevider}>
            <h2>{item.heading}</h2>
            <span className={s.articleInfo}>
              <p>{formatDate(item.published)}</p>
              <p> af {item.author}</p>
            </span>
            <Link to={`/article/${item.id}`}>Læs mere</Link>
          </div>
          <img src={item.image?.[0]?.url || ""} alt={item.heading} />
        </article>
      ))}
    </div>
  );
};