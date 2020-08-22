import React, { useState, useEffect } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  getNews,
  incrementPageNumber,
  setCategory,
} from '../../actions/newsFeed';
import { categories } from '../../data/categories';

const Navbar = (props) => {
  const [activeItem, setActiveItem] = useState('home');
  const [newCategory, setNewCategory] = useState('general');

  const handleItemClick = (e, { name, value }) => {
    if (name === 'category') {
      setNewCategory(value);
    } else {
      setActiveItem(name);
    }
  };

  useEffect(() => {
    props.setCategory(newCategory);
  }, [newCategory]);
  return (
    <div>
      <Menu pointing secondary>
        <Link to='/'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
        </Link>

        <Dropdown
          loading={props.loading}
          item
          text={() =>
            newCategory
              ? newCategory[0].toUpperCase() + newCategory.slice(1)
              : 'General'
          }
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
          <Link to='/search'>
            <Menu.Item
              name='search'
              active={activeItem === 'search'}
              onClick={handleItemClick}
            >
              <Icon name='search' />
            </Menu.Item>
          </Link>

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

const mapStateToProps = (state) => ({
  news: state.newsFeed.news,
  loading: state.newsFeed.loading,
  error: state.newsFeed.error,
  language: state.newsFeed.params.language,
  country: state.newsFeed.params.country,
  uri: state.newsFeed.params.uri,
  page: state.newsFeed.params.page,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: (language, country, category, uri, page) =>
    dispatch(getNews(language, country, category, uri, page)),
  incrementPageNumber: () => dispatch(incrementPageNumber()),
  setCategory: (category) => dispatch(setCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
