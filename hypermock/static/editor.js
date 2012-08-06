// editor.js


// Editor class
function Editor() {
    this.tags = new TagManager();
    this.selectedTool = Editor.PointerTool;
    this.selectedTag = null;
    this.newTagPreview = null;
    this.newTagPreviewUpdated = null;
    this.newTagCreated = null;
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
    if(this.newTagPreviewUpdated)
        this.newTagPreviewUpdated();
};
Editor.prototype.updateNewTag = function(x, y) {
    if(this.newTagPreview === null)
        return;
    this.newTagPreview.width = Math.max(x - this.newTagPreview.x, 0);
    this.newTagPreview.height = Math.max(y - this.newTagPreview.y, 0);
    if(this.newTagPreviewUpdated)
        this.newTagPreviewUpdated();
};
Editor.prototype.endNewTag = function() {
    if(this.newTagPreview === null)
        return null;
    var bounds = this.newTagPreview;
    this.newTagPreview = null;
    if(this.newTagPreviewUpdated)
        this.newTagPreviewUpdated();
    if(bounds.width > 0 && bounds.height > 0)
        return this.newTag(bounds);
    return null;
};
Editor.prototype.newTag = function(bounds) {
    if(this.selectedTool === Editor.PointerTool)
        return null;
    var tag = this.tags.create(this.selectedTool.name, bounds);
    if(this.newTagCreated)
        this.newTagCreated(tag);
    return tag;
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
