// mockdown.js

// TODO: better drag-to-create functionality


// Update functions
function updateTools() {
    $('.tool').removeClass('selected');
    $('.tool[data-tool="' + editor.selectedTool.name + '"]').addClass('selected');
    $('.mockup').toggleClass('toolSelected', editor.selectedTool !== Editor.PointerTool);
}

function updatePreview() {
    var bounds = editor.newTagPreview;
    $('.overlayPreview').css(bounds !== null ?
        {display: 'block', left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height} :
        {display: 'none'});
}

function tagAdded(tag, byUser) {
    $('.template.tag').clone().appendTo('.tags').removeClass('template')
        .css({left: tag.bounds.x, top: tag.bounds.y, width: tag.bounds.width, height: tag.bounds.height});
    // TODO: begin editing the new tag if created by user
    if(byUser)
        alert('TODO: Begin editing tag');
}

function tagRemoved(tag) {
    // TODO: remove associated DOM element
    alert('TODO: Remove ' + tag.type + ' tag element');
}


// Event handlers
$('.tool').click(function() {
    editor.selectTool($(this).data('tool'));
    updateTools();
    return false;
});

$('.mockup').mousedown(function(e) {
    if(editor.selectedTool !== Editor.PointerTool)
        editor.startNewTag(e.clientX, e.clientY);
    return false;
});
$('.mockup, .overlayPreview').mousemove(function(e) {
    if(editor.newTagPreview !== null)
        editor.updateNewTag(e.clientX, e.clientY);
    return false;
});
$('.mockup, .overlayPreview').mouseup(function(e) {
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
editor.tagAdded = tagAdded;
editor.tagRemoved = tagRemoved;
editor.newTagPreviewUpdated = updatePreview;
updateTools();
$(initTags);
