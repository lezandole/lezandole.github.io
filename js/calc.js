
    var CommentBox = React.createClass({
      render: function() {
        return (
          <div className="commentList">
            Hello, world! I am a CommentList.
          </div>
        );
      }
    });
    ReactDOM.render(
      <CommentBox />,
      document.getElementById('content')
    );