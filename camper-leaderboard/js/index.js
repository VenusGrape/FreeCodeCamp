'use strict';

var Board = React.createClass({
  displayName: 'Board',

  getInitialState: function getInitialState() {
    return {
      recent: [],
      alltime: [],
      display: 'recent'
    };
  },

  componentDidMount: function componentDidMount() {
    $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function (data) {
      this.setState({
        recent: data
      });
    }.bind(this));

    $.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function (data) {
      this.setState({
        alltime: data
      });
    }.bind(this));
  },

  showRecent: function showRecent() {
    this.setState({
      display: 'recent'
    });
  },

  showAllTime: function showAllTime() {
    this.setState({
      display: 'alltime'
    });
  },

  render: function render() {
    return React.createElement(
      'table',
      { className: 'table table-striped table-bordered table-hover table-condensed' },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            { colSpan: '4', className: 'theader text-center' },
            React.createElement(
              'h2',
              null,
              'Leaderboard'
            )
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            React.createElement(
              'h4',
              null,
              '#'
            )
          ),
          React.createElement(
            'th',
            null,
            React.createElement(
              'h4',
              null,
              'Camper Name'
            )
          ),
          React.createElement(
            'th',
            { className: 'text-center' },
            React.createElement(
              'a',
              { onClick: this.showRecent },
              React.createElement(
                'h4',
                null,
                'Points in Past 30 Days  ',
                React.createElement('span', {
                  className: this.state.display === 'recent' ? 'fa fa-dot-circle-o' : 'fa fa-circle-o' })
              )
            )
          ),
          React.createElement(
            'th',
            { className: 'text-center' },
            React.createElement(
              'a',
              { onClick: this.showAllTime },
              React.createElement(
                'h4',
                null,
                'All Time Points  ',
                React.createElement('span', {
                  className: this.state.display === 'recent' ? 'fa fa-circle-o' : 'fa fa-dot-circle-o' })
              )
            )
          )
        )
      ),
      React.createElement(AllRows, { data: this.state[this.state.display] })
    );
  }
});

var AllRows = React.createClass({
  displayName: 'AllRows',

  render: function render() {
    var rows = this.props.data.map(function (row, index) {
      return React.createElement(Row, { key: index, id: index + 1, data: row });
    });

    return React.createElement(
      'tbody',
      null,
      rows
    );
  }
});

var Row = React.createClass({
  displayName: 'Row',

  render: function render() {
    return React.createElement(
      'tr',
      null,
      React.createElement(
        'td',
        null,
        this.props.id
      ),
      React.createElement(
        'td',
        null,
        React.createElement(
          'a',
          { target: '_blank', href: "https://freecodecamp.com/" + this.props.data.username },
          React.createElement('img', { className: 'pic', src: this.props.data.img, className: 'pic' }),
          '  ',
          this.props.data.username
        )
      ),
      React.createElement(
        'td',
        { className: 'text-center' },
        this.props.data.recent
      ),
      React.createElement(
        'td',
        { className: 'text-center' },
        this.props.data.alltime
      )
    );
  }
});

var Footer = React.createClass({
  displayName: 'Footer',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'footer theader text-center row' },
      'build by @venusgrape'
    );
  }
});

var App = React.createClass({
  displayName: 'App',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Board, null)
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));