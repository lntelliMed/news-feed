import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCategory } from '../../actions/newsFeed';
import { categories } from '../../data/categories';
import { capitalizeFirstLetter } from '../../utils';

const Navbar = ({ setCategory, loading, history, location }) => {
  const [activeItem, setActiveItem] = useState('home');
  const [newCategory, setNewCategory] = useState('general');

  useEffect(() => {
    setCategory(newCategory);
    if (location && location.pathName !== '/') {
      if (history) {
        history.push('/');
      }
    }
  }, [newCategory, setCategory]);

  const handleItemClick = (e, { name, value }) => {
    if (name === 'category') {
      setNewCategory(value);
    } else {
      setActiveItem(name);
    }
  };

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
        />

        <Dropdown
          loading={loading}
          item
          text={capitalizeFirstLetter(newCategory, 'General')}
        >
          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item
                key={category.key}
                name='category'
                value={category.value}
                onClick={handleItemClick}
              >
                {category.text}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position='right'>
          <Menu.Item
            as={Link}
            to='/search'
            name='search'
            active={activeItem === 'search'}
            onClick={handleItemClick}
          >
            <Icon name='search' />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/saved-articles'
            name='my articles'
            active={activeItem === 'my articles'}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

Navbar.propTypes = {
  setCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.newsFeed.loading,
});

const mapDispatchToProps = (dispatch) => ({
  setCategory: (category) => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
