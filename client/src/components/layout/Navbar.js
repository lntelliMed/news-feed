import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCategory } from '../../actions/newsFeed';
import { categories } from '../../data/categories';

const Navbar = ({ setCategory, loading }) => {
  const [activeItem, setActiveItem] = useState('home');
  const [newCategory, setNewCategory] = useState('general');

  useEffect(() => {
    setCategory(newCategory);
  }, [newCategory]);

  const handleItemClick = (e, { name, value }) => {
    if (name === 'category') {
      setNewCategory(value);
    } else {
      setActiveItem(name);
    }
  };

  const getCategoryTitle = () =>
    newCategory
      ? newCategory[0].toUpperCase() + newCategory.slice(1)
      : 'General';

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

        <Dropdown loading={loading} item text={getCategoryTitle()}>
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

          {false && (
            <Link to='/saved-articles'>
              <Menu.Item
                name='articles'
                active={activeItem === 'articles'}
                onClick={handleItemClick}
              />
            </Link>
          )}
          {false && (
            <Link to='/login'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
              />
            </Link>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
