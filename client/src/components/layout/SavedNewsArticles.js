import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Card,
  Divider,
  Image,
  Placeholder,
  Header,
  Icon,
  Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSavedArticles, deleteSavedArticle } from '../../actions/newsFeed';
import { shortenString, formatDate } from '../../utils';
import placeHolderImage from '../../img/placeholder-news.jpg';
import ConfirmModal from './ConfirmModal';

const SavedNewsArticles = ({
  savedArticles,
  totalSavedArticles,
  getSavedArticles,
  deleteSavedArticle,
  loading,
}) => {
  useEffect(() => {
    getSavedArticles();
  }, []);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const confirmDeletion = (article) => {
    setShowConfirmModal(true);
    setArticleToDelete(article);
  };

  return (
    <Fragment>
      {savedArticles && savedArticles.length > 0 ? (
        <Fragment>
          <Header as='h3'>Your saved articles:</Header>
          <Button as='div' labelPosition='right'>
            <Button color='red'>
              <Icon name='heart' />
              Liked
            </Button>
            <Label basic color='red' pointing='left'>
              {totalSavedArticles}
            </Label>
          </Button>
          <Divider />
          <Card.Group itemsPerRow={3} stackable>
            {savedArticles.map((article) => (
              <Card key={article.id}>
                {loading ? (
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                ) : (
                  <Image
                    src={article.urlToImage || placeHolderImage}
                    alt={article.title}
                    as='a'
                    target='_blank'
                    href={article.url}
                    rel='noopener noreferrer'
                  />
                )}
                <Card.Content>
                  {loading ? (
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                        <Placeholder.Line length='medium' />
                      </Placeholder.Header>
                      <Placeholder.Paragraph>
                        <Placeholder.Line length='short' />
                      </Placeholder.Paragraph>
                    </Placeholder>
                  ) : (
                    <Fragment>
                      <Card.Header>
                        {shortenString(article.title, 20)}
                      </Card.Header>
                      <Card.Meta>{formatDate(article.publishedAt)}</Card.Meta>
                      <Card.Description>
                        {shortenString(article.description, 40)}
                      </Card.Description>
                    </Fragment>
                  )}
                </Card.Content>

                <Card.Content extra>
                  <Button
                    disabled={loading}
                    primary
                    href={article.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Read
                  </Button>
                  <Button
                    disabled={loading}
                    onClick={(e) => confirmDeletion(article)}
                  >
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Fragment>
      ) : (
        <Header as='h3'>You have no saved articles!</Header>
      )}

      <ConfirmModal
        header='Delete Article'
        confirmationMessage='This will delete this article from your local storage permanently.'
        article={articleToDelete}
        handleOpenModal={setShowConfirmModal}
        handleCloseModal={setShowConfirmModal}
        isOpen={showConfirmModal}
        handleUserCancel={setShowConfirmModal}
        handleUserConfirm={() => {
          setShowConfirmModal(false);
          deleteSavedArticle(articleToDelete.id);
          getSavedArticles();
        }}
      />
    </Fragment>
  );
};

SavedNewsArticles.propTypes = {
  savedArticles: PropTypes.array,
  totalSavedArticles: PropTypes.number,
  getSavedArticles: PropTypes.func.isRequired,
  deleteSavedArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  savedArticles: state.newsFeed.news.savedArticles,
  totalSavedArticles: state.newsFeed.totalSavedArticles,
  loading: state.newsFeed.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getSavedArticles: () => dispatch(getSavedArticles()),
  deleteSavedArticle: (articleId) => dispatch(deleteSavedArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedNewsArticles);
