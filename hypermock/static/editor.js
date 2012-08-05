// editor.js


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


// Editor class
function Editor() {
    this.tags = new TagManager();
    this.selectedTool = Editor.PointerTool;
    this.selectedTag = null;
    this.newTagPreview = null;
    // TODO: callbacks
}
Editor.PointerTool = new Tool('pointer', null);
Editor.CommentTool = new Tool('comment', CommentTag);
Editor.HyperlinkTool = new Tool('hyperlink', HyperlinkTag);
Editor.Tools = [Editor.PointerTool, Editor.CommentTool, Editor.HyperlinkTool];
Editor.Tools.find = function(name) {
    var tool = null;
    $.each(this, function(index, item) {
        if(item.name === name) {
            tool = item;
            return false;
        }
        return true;
    });
    return tool;
};
Editor.prototype.selectTool = function(tool) {
    if(typeof(tool) == 'string') {
        item = Editor.Tools.find(tool);
        if(!item)
            throw new Error('"' + tool + '" tool not supported.');
        return this.selectTool(item);
    }
    if(Editor.Tools.indexOf(tool) == -1)
        throw new Error('Invalid tool.');
    this.selectedTool = tool;
    return true;
};
Editor.prototype.startNewTag = function(x, y) {
    this.newTagPreview = new NewTagPreview(x, y);
};
Editor.prototype.endNewTag = function() {
    if(this.newTagPreview === null)
        return null;
    var bounds = this.newTagPreview;
    this.newTagPreview = null;
    return bounds.width > 0 && bounds.height > 0 ?
        this.newTag(bounds) :
        null;
};
Editor.prototype.newTag = function(bounds) {
    return this.selectedTool !== Editor.PointerTool ?
        this.tags.create(this.selectedTool.name, bounds)
        : null;
};


// Tag manager class
function TagManager() {
    this.__tags = [];
}
TagManager.prototype.create = function(type, bounds, data) {
    var tag = Tag.Create(type, bounds, data);
    this.add(tag);
    return tag;
};
TagManager.prototype.add = function(tag) {
    this.__tags.push(tag);
};
TagManager.prototype.remove = function(tag) {
    // TODO: implement
    return true;
};


// "New tag" preview class
function NewTagPreview(x, y) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
}
NewTagPreview.prototype.update = function(x, y) {
    this.width = Math.max(x - this.x, 0);
    this.height = Math.max(y - this.y, 0);
};
