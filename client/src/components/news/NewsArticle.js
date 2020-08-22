import React from 'react';
import moment from 'moment';
import { Button, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
    <Item.Image src={urlToImage} alt={description} width='100%' />

    <Item.Content>
      <Item.Header as='h3'>{title}</Item.Header>

      <Item.Description>
        {description && (
          <p>
            {description}{' '}
            <a target='_blank' href={url}>
              {' read more..'}
            </a>
          </p>
        )}
      </Item.Description>

      {!description && content && (
        <Item.Meta>
          <p>
            Content: {content}{' '}
            <a target='_blank' href={url}>
              {' read more..'}
            </a>
          </p>
        </Item.Meta>
      )}
      <br></br>
      <Item.Extra>
        <Button>
          <a target='_blank' href={url}>
            Read more..
          </a>
        </Button>
        <Button>Save</Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);

NewsArticle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
};

export default NewsArticle;
