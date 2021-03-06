'use strict';

const React = require('react');
const { sendEvent } = require('./utilities.js');
const { connect } = require('react-redux');
const { changeFeedbackMessage } = require('./actions.js');

const Feedback = connect(state => {
  var {feedback_ask} = state.data;
  return {feedback_ask};
})(React.createClass({
  displayName: 'Feedback',
  propTypes: {
    dispatch: React.PropTypes.func,
    feedback_ask: React.PropTypes.bool
  },

  handleClick: function (e) {
    sendEvent('feedback-click', e.target.id, window.location.pathname);
    if (e.target.id === 'thumbs-down') {
      window.open('https://github.com/FirefoxUX/photon/issues','_blank');
    }
    changeFeedbackMessage(this.props.dispatch, false)
  },

  handleXClick: function () {
    changeFeedbackMessage(this.props.dispatch, true)
  },

  render: function() {
    return(
      <div className="center mw7 ph3 mb5">
        {this.props.feedback_ask &&
          <div className="w-100 bg-white shadow-3 br2 pa3 flex-ns justify-between-ns items-center-ns">
            <p className="mt0 mb3 mb0-ns lh-copy tc"
                id="feedback-text"
            >{'Tell us, is the content of this page helpful?'}</p>
            <p className="ma0 flex justify-around">
              <a className="mr4-ns no-underline f3 lh-copy dib"
                  id="thumbs-up"
                  onClick={this.handleClick}
                  title="Send us some ❤️"
              >{'👍'}
              </a>
              <a className="no-underline f3 lh-copy dib"
                  id="thumbs-down"
                  onClick={this.handleClick}
                  title="File an issue on GitHub"
              >{'👎'}
              </a>
            </p>
          </div>
        ||
        <div className="w-100 ba b--light-gray br2 pv2 ph3 flex justify-between items-center">
          <span className="lh-copy"
              id="feedback-text"
          >{'Thank you for the feedback!'}</span>
          <a className="close-feedback"
              onClick={this.handleXClick}
          ></a>
        </div>
        }
      </div>)
  }
}));

module.exports = Feedback;
