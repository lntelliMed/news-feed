import React, { useState } from 'react';
import moment from 'moment';
import { Button, Item, Icon } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import placeHolderImage from '../../img/placeholder-news.jpg';

const NewsArticle = ({
  saveArticle,
  title,
  description,
  content,
  url,
  urlToImage,
  author,
  publishedAt,
  source: { name },
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handeArticleSave = () => {
    saveArticle({
      id: uuidv4(),
      title,
      description,
      content,
      url,
      urlToImage,
      author,
      publishedAt,
      name,
    });
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }, 2000);
  };
  return (
    <Item>
      <Item.Meta>
        <span className='cinema'>
          <strong>{name}</strong>
          {` - Published ${moment.utc(publishedAt).fromNow()}`}
        </span>
        {author && (
          <span>
            {' '}
            by <em>{author}</em>
          </span>
        )}
      </Item.Meta>
      <br></br>
      {urlToImage ? (
        <Item.Image
          src={urlToImage}
          alt={description}
          width='100%'
          as='a'
          target='_blank'
          href={url}
          rel='noopener noreferrer'
        />
      ) : (
        <Item.Image
          src={placeHolderImage}
          alt={'Place holder image'}
          width='100%'
          as='a'
          target='_blank'
          href={url}
          rel='noopener noreferrer'
        />
      )}

      <Item.Content>
        <Item.Header as='h3'>{title}</Item.Header>

        <Item.Description>
          {description && (
            <p>
              {description}{' '}
              <a target='_blank' href={url} rel='noopener noreferrer'>
                {' read more..'}
              </a>
            </p>
          )}
        </Item.Description>

        {!description && content && (
          <Item.Meta>
            <p>
              Content: {content}{' '}
              <a target='_blank' href={url} rel='noopener noreferrer'>
                {' read more..'}
              </a>
            </p>
          </Item.Meta>
        )}
        <br></br>
        <Item.Extra>
          <Button.Group>
            <Button
              primary
              href={url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Icon name='edge' />
              Read more..
            </Button>
            <Button.Or />

            <Button
              negative={!isSaved}
              positive={isSaved}
              onClick={handeArticleSave}
              disabled={isSaving}
              loading={isSaving}
            >
              <Icon name='heart' color={isSaved && 'red'} />
              {!isSaved ? 'Save Article' : 'Item Saved!'}
            </Button>
          </Button.Group>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

NewsArticle.propTypes = {
  saveArticle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
  author: PropTypes.string,
  publishedAt: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
};

export default NewsArticle;
