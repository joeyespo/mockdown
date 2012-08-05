// hypermock.js

// TODO: better drag-to-create functionality


// Update functions
function updateTools() {
    $('.tool').removeClass('selected');
    $('.tool[data-tool="' + editor.selectedTool.name + '"]').addClass('selected');
    $('.preview').toggleClass('toolSelected', editor.selectedTool !== Editor.PointerTool);
}

function updatePreview() {
    var bounds = editor.newTagPreview;
    $('.overlayPreview').css(bounds !== null ?
        {display: 'block', left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height} :
        {display: 'none'});
}


// Event handlers
$('.tool').click(function() {
    editor.selectTool($(this).data('tool'));
    updateTools();
    return false;
});

$('.preview').mousedown(function(e) {
    if(editor.selectedTool !== Editor.PointerTool) {
        editor.startNewTag(e.clientX, e.clientY);
        updatePreview();
    }
    return false;
});
$('.preview, .overlayPreview').mousemove(function(e) {
    editor.updateNewTag(e.clientX, e.clientY);
    // TODO: remove this once callbacks are in place
    if(editor.newTagPreview !== null)
        updatePreview();
    return false;
});
$('.preview, .overlayPreview').mouseup(function(e) {
    // TODO: editor.endNewTag();
    // TODO: remove this once callbacks are in place
    if(editor.newTagPreview === null)
        return false;
    var tag = editor.endNewTag();
    updatePreview();
    // TODO: create tag element and begin editing it
    alert('TODO: Create ' + tag.type + ' tag');
    return false;
});


// Initialization
function initTags() {
    $.each(window.sessionTags || [], function(index, tag) {
        editor.tags.create(tag.type, tag.bounds);
    });
}
var editor = new Editor();
updateTools();
$(initTags);
