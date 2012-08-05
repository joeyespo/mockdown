// editor.js


// Data models
function Tool(name, tagClass) {
    this.name = name;
    this.tag = tagClass;
}

function Tag(bounds) {
    this.bounds = bounds || {x: 0, y: 0, width: 0, height: 0};
}
Tag.Create = function(type, bounds, data) {
    switch(type) {
        case CommentTag.Name:
            return new CommentTag(bounds, data);
        case HyperlinkTag.Name:
            return new HyperlinkTag(bounds, data);
        default:
            alert('Error: "' + type + '" tag not supported.');
            return null;
    }
};

function CommentTag(bounds, text) {
    Tag.call(this, bounds, text);
    this.text = text || '';
}
CommentTag.Name = 'comment';
CommentTag.prototype = new Tag();

function HyperlinkTag(bounds, href) {
    Tag.call(this, bounds, href);
    this.href = href || '';
}
HyperlinkTag.Name = 'hyperlink';
HyperlinkTag.prototype = new Tag();
