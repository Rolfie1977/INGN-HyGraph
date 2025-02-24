import React from 'react';
import { singleArticle } from '../../queries/singleArticle';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import s from './SingleContent.module.scss';

export const SingleContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleArticle", id],
    queryFn: async () =>
      request(
        "https://eu-west-2.cdn.hygraph.com/content/cm1omm29a04rh07uxvrzowh0r/master",
        singleArticle,
        { articleID: id }
      ),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error {error.message}</p>;
  }
  if (!data || !data.article) {
    return <p>No article data found</p>;
  }

  const item = data.article;
  console.log(item);
  
  return (
    <div className={s.contentStyle}>
      <ul className={s.backNav}>
        <li onClick={() => navigate(-1)} className={s.backItem}>&lt; Tilbage</li>
      </ul>
      <article className={s.articleStyle} key={item.id}>
        <img src={item.image?.[0]?.url || ""} alt={item.heading} />
        <div className={s.articleDevider}>
          <h2>{item.heading}</h2>
          <span className={s.articleInfo}>
            <p>{new Date(item.published).toLocaleDateString()}</p>
            <p> af {item.author}</p>
          </span>
          <p>{item.text}</p>
        </div>
      </article>
    </div>
  );
};