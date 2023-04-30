import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function requireAuth(ChildComponent) {
  class RequireAuth extends Component {
    render() {
      if (this.props.auth === null) {
        return <div>Loading...</div>;
      }

      if (this.props.auth === false) {
        return <Redirect to="/" />;
      }

      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth,
    };
  }

  return connect(mapStateToProps)(RequireAuth);
}
