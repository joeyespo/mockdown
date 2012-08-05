// editor.js


// Data models
function Tag(bounds) {
    this.bounds = bounds || {x: 0, y: 0, width: 0, height: 0};
    this.element = null;
}
Tag.Create = function(type, bounds, data) {
    switch(type) {
        case 'comment':
            return CommentTag(bounds, data);
        case 'comment':
            return HyperlinkTag(bounds, data);
        default:
            alert('Error: "' + type + '" tag not supported.');
            return null;
    }
};
Tag.prototype.createElement = function() {
    var element = $('<div class="tag"></div>');
    // TODO: attach element to the DOM
    this.element = element;
};
Tag.prototype.updateElement = function() {
    // TODO: if(this.element)
};

function CommentTag(bounds, text) {
    Tag(bounds);
    this.text = text || '';
}
CommentTag.prototype = new Tag();

function HyperlinkTag(bounds, href) {
    Tag(bounds);
    this.href = href || '';
}
HyperlinkTag.prototype = new Tag();
HyperlinkTag.prototype.updateElement = function() {
    // TODO: implement
};
