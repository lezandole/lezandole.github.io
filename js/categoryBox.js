var data = [
  {id: 1, catgoryName: "SDカードに関するお問合せ", questions: "ビューアソフト・SDカード認識しません。", asked: "SDが壊れた可能性がございますのでSDカードを交換してください。8GBに対応している他のリーダーライターで確認ください。", products: "FDR-800、FDR-810", questionTag: "SDカードエラー"},
  {id: 2, catgoryName: "SDカードに関するお問合せ", questions: "SDカードはの容量は対応していますか？", asked: "当社SDカード32ＧＢまで対応しております。", products: "FDR-800、FDR-810", questionTag: "SDカードエラー"},
  {id: 3, catgoryName: "SDカードに関するお問合せ", questions: "フォーマットの周期はどれくらいがよいでしょうか？", asked: "管理の意味合いも含めまして、2~3週間に一度はフォーマットして頂くことをお勧めします。", products: "FDR-800、FDR-810", questionTag: "SDカードエラー"}
];
var nl2br = function (text) {
	if (text=='') { return text; };
	var regex = /(\n)/g
	return text.split(regex).map(function (line) {
		if (line.match(regex)) {
			return React.createElement('br');
		} else {
			return line;
		}
	});
};
//CategoryBox
var CategoryBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	render: function() {
		if (this.state.data.length==0) { return null; };
		// console.log(this.state.data);
		var faqSection = this.state.data.map(function(faqList) {
			// console.log(faqList);
			return (
				<section className="container item text">
					<h3>{faqList[0].catgoryName}</h3>
					<FAQList data={faqList} />
				</section>
			);
		});
		return (
			<section>{faqSection}</section>
		);
	},
});
var FAQList = React.createClass({
	render: function() {
		var faqNodes = this.props.data.map(function(faq) {
			var Asked1 = React.createClass({
				render: function() {
					return (faq.asked1=='')? null: (<p><i className="fa fa-hand-o-right" aria-hidden="true"></i>{nl2br(faq.asked1)}</p>);
				}
			});
			var Asked2 = React.createClass({
				render: function() {
					return (faq.asked2=='')? null: (<p><i className="fa fa-hand-o-right" aria-hidden="true"></i>{nl2br(faq.asked2)}</p>);
				}
			});
			var Asked3 = React.createClass({
				render: function() {
					return (faq.asked3=='')? null: (<p><i className="fa fa-hand-o-right" aria-hidden="true"></i>{nl2br(faq.asked3)}</p>);
				}
			});
			var PDF = React.createClass({
				render: function() {
					return (faq.pdf=='')? null: (<p><i className="fa fa-download" aria-hidden="true"></i><a href="/check/fdr-810/data/pdf/{nl2br(faq.pdf)}">{nl2br(faq.pdf)}</a></p>);
				}
			});
			return (
				<li>
					<a href="javascript:void();"><i className="fa fa-question-circle" aria-hidden="true"></i>{faq.questions}</a>
					<Asked1 />
					<Asked2 />
					<Asked3 />
					<span><i className="fa fa-tag" aria-hidden="true"></i>{faq.questionTag}</span>
					<span><i className="fa fa-tag" aria-hidden="true"></i>{faq.products}</span>
					<PDF />
				</li>
			);
		});
		return (
			<ul>{faqNodes}</ul>
		);
	}
});
ReactDOM.render(
  <CategoryBox url="/check/fdr-810/faq/app/DataModel.php" />,
  document.getElementById('content')
);