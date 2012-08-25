// editor.js


// Editor class
function Editor() {
    this.tags = [];
    this.selectedTool = Editor.PointerTool;
    this.selectedTag = null;
    this.newTagPreview = null;
    this.tagCreated = null;
    this.tagAdded = null;
    this.tagRemoved = null;
    this.newTagPreviewUpdated = null;
}
Editor.PointerTool = new Tool('pointer', null);
Editor.CommentTool = new Tool('comment', CommentTag);
Editor.HyperlinkTool = new Tool('hyperlink', HyperlinkTag);
Editor.Tools = [Editor.PointerTool, Editor.CommentTool, Editor.HyperlinkTool];
Editor.Tools.find = function(name) {
    for(var index = 0; index < this.length; index++) {
        if(this[index].name == name)
            return this[index];
    }
    return null;
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
        this.newTagPreviewUpdated(true);
};
Editor.prototype.updateNewTag = function(x, y) {
    if(this.newTagPreview === null)
        return;
    this.newTagPreview.width = Math.max(x - this.newTagPreview.x, 0);
    this.newTagPreview.height = Math.max(y - this.newTagPreview.y, 0);
    if(this.newTagPreviewUpdated)
        this.newTagPreviewUpdated(true);
};
Editor.prototype.endNewTag = function() {
    if(this.newTagPreview === null)
        return null;
    var bounds = this.newTagPreview;
    this.newTagPreview = null;
    if(this.newTagPreviewUpdated)
        this.newTagPreviewUpdated(false);
    if(bounds.width > 0 && bounds.height > 0)
        return this.createTag(bounds, true);
    return null;
};
Editor.prototype.createTag = function(bounds, byUser) {
    if(this.selectedTool === Editor.PointerTool)
        return null;
    var tag = Tag.Create(this.selectedTool.name, bounds);
    if(this.tagCreated)
        this.tagCreated(tag, byUser);
    this.addTag(tag, byUser);
    return tag;
};
Editor.prototype.addTag = function(tag, byUser) {
    if(!tag)
        throw new Error('Invalid tag.');
    this.tags.push(tag);
    if(this.tagAdded)
        this.tagAdded(tag, byUser);
};
Editor.prototype.remove = function(tag) {
    if(!tag)
        return false;
    // TODO: if(!this.tags.contains(tag)) return false;
    if(this.tagRemoved)
        this.tagRemoved(tag);
    return true;
};
