import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Item, Icon, Label } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
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
  totalSavedArticles,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

  useEffect(() => {
    return () => {
      if (!saveTimeout) return;
      clearTimeout(saveTimeout);
      setSaveTimeout(null);
    };
  }, []);

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

    const timeout = setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 1000);
    }, 1000);
    setSaveTimeout(timeout);
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
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              size='mini'
            >
              <Icon name='edge' />
              Read
            </Button>
            <Button.Or />

            <Button
              negative={isSaved}
              positive
              onClick={handeArticleSave}
              disabled={isSaving}
              loading={isSaving}
              size='mini'
            >
              <Icon name='heart' inverted loading={isSaving} />
              {!isSaved ? 'Save' : 'Saved!'}
            </Button>
          </Button.Group>
          <Button
            as={Link}
            to='/saved-articles'
            labelPosition='right'
            floated='right'
            size='mini'
          >
            <Button color='red'>
              <Icon name='heart' />
            </Button>
            <Label basic color='red' pointing='left'>
              {totalSavedArticles}
            </Label>
          </Button>
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
  totalSavedArticles: PropTypes.number,
};

export default NewsArticle;
