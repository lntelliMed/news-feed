import React from 'react';
import moment from 'moment';
import { Button, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import placeHolderImage from '../../img/placeholder-news.jpg';

const NewsArticle = ({
  title,
  description,
  content,
  url,
  urlToImage,
  author,
  publishedAt,
  source: { name },
}) => (
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
        <Button primary href={url} target='_blank' rel='noopener noreferrer'>
          Read more..
        </Button>
        <Button>Save</Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);

NewsArticle.propTypes = {
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
