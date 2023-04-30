import React from 'react';

function NotFoundPage(props) {
  const { staticContext = {} } = props;

  staticContext.notFound = true;

  return <h1>Oops, route not found.</h1>;
}

export default {
  component: NotFoundPage,
};
