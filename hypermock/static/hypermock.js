// hypermock.js

// TODO: better drag-to-create functionality

function updateTools() {
    $('.tool').removeClass('selected');
    $('.tool[data-tool="' + editor.selectedTool.name + '"]').addClass('selected');
    $('.preview').toggleClass('toolSelected', editor.selectedTool !== Editor.PointerTool);
}

function updatePreview() {
    var bounds = editor.newTagPreview;
    var properties = bounds !== null ?
        {display: 'block', left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height} :
        {display: 'none'};
    $('.overlayPreview').css(properties);
}


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
    if(editor.newTagPreview === null)
        return true;
    editor.newTagPreview.update(e.clientX, e.clientY);
    updatePreview();
    return false;
});
$('.preview, .overlayPreview').mouseup(function(e) {
    if(editor.newTagPreview === null)
        return true;
    var tag = editor.endNewTag();
    updatePreview();
    alert('TODO: Create ' + tag.type + ' tag');
    // TODO: begin editing tag
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
