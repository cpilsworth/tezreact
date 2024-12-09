/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import { getArticle } from '../utils/commons';
import { getPublishHost } from '../utils/fetchData';
import { mapJsonRichText } from '../utils/renderRichText';
// import Error from './base/Error';
import Loading from './base/Loading';
import "./Teaser.scss";


const Teaser = (props) => {
  console.log('entering the teaser block');
  const persistentQuery = `wknd-shared/article-by-slug;slug=${props.item}`;
  const {data, errorMessage} = useGraphQL(persistentQuery);
  	//If there is an error with the GraphQL query
	if (errorMessage) return;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;
  
  const article =  getArticle(data);
  console.log(article);
  if(!article) return <></>
  const { title, _path, featuredImage, synopsis } = article;

  const editorProps = {
		"data-aue-resource": "urn:aemconnection:" + _path + "/jcr:content/data/master",
		"data-aue-type": "reference",
		"data-aue-filter": "cf"
	};

  return (

  <section {...editorProps} className="Teaser">

      <div class="caro__item" >
        <div class="caro__img">
          <img className="caro-image" src={`${getPublishHost()}${featuredImage._path}`} alt={title} data-aue-type="media" data-aue-prop="featuredImage" />
        </div>
        <div class="caro__text">
          <div class="caro__heading">
            <h2 data-aue-prop="title" data-aue-type="text">{title}</h2>
          </div>
          {synopsis && <div className="caro__para"><p data-aue-prop="synopsis" data-aue-type="richtext">{mapJsonRichText(synopsis.json)}</p></div>}
          <Link to={`/articles/article/christmas-food-recipes-and-ideas${window.location.search}`}>
            <button className="teaser-button">Read more</button>
          </Link>
        </div>								
      </div>

    
  </section>

);
  }
  
export default Teaser;

