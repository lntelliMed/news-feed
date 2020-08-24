import React, { Fragment } from 'react';
import { Button, Image, Header, Modal, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { shortenString } from '../../utils';
import placeHolderImage from '../../img/placeholder-news.jpg';

const ConfirmModal = ({
  header,
  confirmationMessage,
  handleOpenModal,
  handleCloseModal,
  isOpen,
  handleUserCancel,
  handleUserConfirm,
  article,
}) => {
  return (
    <Fragment>
      <Modal
        onClose={() => handleOpenModal(false)}
        onOpen={() => handleCloseModal(true)}
        open={isOpen}
        // trigger={<Button>Show Modal</Button>}
        dimmer='inverted'
        size='small'
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content image>
          <Image
            size='large'
            src={(article && article.urlToImage) || placeHolderImage}
            alt={article && article.title}
            wrapped
          />
          <Modal.Description>
            <Header>{shortenString(article && article.title, 40)}</Header>
            <p>{confirmationMessage}</p>
            <p>Are you sure?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            // color='black'
            positive
            onClick={() => handleUserCancel(false)}
          >
            Cancel
          </Button>
          <Button
            content='OK'
            labelPosition='right'
            icon='checkmark'
            onClick={handleUserConfirm}
            negative
          />
        </Modal.Actions>
      </Modal>
      {false && (
        <Confirm
          header={header}
          content={`${confirmationMessage} Are you sure?`}
          dimmer='inverted'
          size='tiny'
          open={isOpen}
          cancelButton='Cancel'
          confirmButton='OK'
          onCancel={() => handleUserCancel(false)}
          onConfirm={handleUserConfirm}
        />
      )}
    </Fragment>
  );
};

ConfirmModal.propTypes = {
  header: PropTypes.string.isRequired,
  confirmationMessage: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleUserCancel: PropTypes.func.isRequired,
  handleUserConfirm: PropTypes.func.isRequired,
  article: PropTypes.any,
};

export default ConfirmModal;
