import React from 'react';
import moment from 'moment';
import { Button, Item } from 'semantic-ui-react';

const NewsItem = (props) => (
  <Item>
    <Item.Meta>
      <span className='cinema'>
        <strong>{props.source.name}</strong>
        {` - Published ${moment.utc(props.publishedAt).fromNow()}`}
      </span>
      {props.author && (
        <span>
          {' '}
          by <em>{props.author}</em>
        </span>
      )}
    </Item.Meta>
    <br></br>
    <Item.Image src={props.urlToImage} alt={props.description} width='100%' />

    <Item.Content>
      <Item.Header as='h3'>{props.title}</Item.Header>

      <Item.Description>
        {props.description && (
          <p>
            {props.description}{' '}
            <a className={props.rowClass} target='_blank' href={props.url}>
              {' read more..'}
            </a>
          </p>
        )}
      </Item.Description>

      {!props.description && props.content && (
        <Item.Meta>
          <p>
            Content: {props.content}{' '}
            <a className={props.rowClass} target='_blank' href={props.url}>
              {' read more..'}
            </a>
          </p>
        </Item.Meta>
      )}
      <br></br>
      <Item.Extra>
        <Button>
          <a className={props.rowClass} target='_blank' href={props.url}>
            Read more..
          </a>
        </Button>
        <Button>Save</Button>
      </Item.Extra>
    </Item.Content>
  </Item>
);

export default NewsItem;
