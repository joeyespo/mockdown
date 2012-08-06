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

function tagAdded(tag) {
    alert('TODO: Create ' + tag.type + ' tag element');
}


// Event handlers
$('.tool').click(function() {
    editor.selectTool($(this).data('tool'));
    updateTools();
    return false;
});

$('.preview').mousedown(function(e) {
    if(editor.selectedTool !== Editor.PointerTool)
        editor.startNewTag(e.clientX, e.clientY);
    return false;
});
$('.preview, .overlayPreview').mousemove(function(e) {
    if(editor.newTagPreview !== null)
        editor.updateNewTag(e.clientX, e.clientY);
    return false;
});
$('.preview, .overlayPreview').mouseup(function(e) {
    if(editor.newTagPreview !== null)
        editor.endNewTag();
    return false;
});


// Initialization
function initTags() {
    $.each(window.sessionTags || [], function(index, tag) {
        editor.addTag(tag);
    });
}
var editor = new Editor();
editor.newTagPreviewUpdated = updatePreview;
editor.tagAdded = tagAdded;
updateTools();
$(initTags);
