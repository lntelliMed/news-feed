import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import App from '../App';
import LandingPage from '../components/layout/LandingPage';

// TODO: Complete those tests, including testing the landing page articles, and also
// testing the search functionality that will invoke a different API end-point, which
// will also require setting a search term, simulating search button click, etc.

beforeEach(() => {
  moxios.install();
  moxios.stubRequest(
    '/api/news/v2/top-headlines?language=en&page=1&pageSize=5&country=us&category=general',
    {
      status: 200,
      response: {
        status: 'ok',
        totalResults: 1,
        articles: [
          {
            source: {
              id: 'buzzfeed',
              name: 'Buzzfeed',
            },
            author: 'carlyeben',
            title:
              "Decorate For Halloween And We'll Tell You What Your Best Quality Is",
            description: "You'll be ~spooked~ by how accurate this is.",
            url:
              'https://www.buzzfeed.com/carlyeben/decorate-for-halloween-and-we-will-tell-you-what-y-4c6a2dw76e',
            urlToImage:
              'https://img.buzzfeed.com/buzzfeed-static/static/2020-08/21/5/enhanced/81d098e7de23/original-5649-1597987337-10.jpg?crop=1244:651;2,89%26downsize=1250:*',
            publishedAt: '2020-08-23T00:37:19.5279181Z',
            content:
              'Sign up to the BuzzFeed Quizzes Newsletter - Binge on the latest quizzes delivered right to your inbox with the Quizzes newsletter!',
          },
        ],
      },
    }
  );
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of articles and display them', (done) => {
  const wrapped = mount(
    <App>
      <LandingPage />
    </App>
  );

  // wrapped.find('.fetch-articles').simulate('click');

  moxios.wait(() => {
    wrapped.update();

    expect(wrapped.find('.segment').length).toEqual(1);
    expect(wrapped.find('div').length).toEqual(25);
    expect(wrapped.find('a').length).toEqual(7);

    done();
    wrapped.unmount();
  });
});
