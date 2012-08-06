// models.js


// Tool model
function Tool(name, tagClass) {
    this.name = name;
    this.tag = tagClass;
}


// Tag model
function Tag(type, bounds) {
    this.type = type;
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
// Comment tag
function CommentTag(bounds, text) {
    Tag.call(this, CommentTag.Name, bounds, text);
    this.text = text || '';
}
CommentTag.Name = 'comment';
CommentTag.prototype = new Tag();
// Hyperlink tag
function HyperlinkTag(bounds, href) {
    Tag.call(this, HyperlinkTag.Name, bounds, href);
    this.href = href || '';
}
HyperlinkTag.Name = 'hyperlink';
HyperlinkTag.prototype = new Tag();


// "New tag" preview model
function NewTagPreview(x, y) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
}
