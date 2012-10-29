// mockdown.js

// TODO: better drag-to-create functionality


// Update functions
function updateTools() {
    $('.tool').removeClass('selected');
    $('.tool[data-tool="' + editor.selectedTool.name + '"]').addClass('selected');
    $('.mockup').toggleClass('toolSelected', editor.selectedTool !== Editor.PointerTool);
}

function updatePreview(isDragging) {
    var bounds = editor.newTagPreview;
    $('.tagPreview').css(bounds !== null ?
        {display: 'block', left: bounds.x, top: bounds.y, width: bounds.width, height: bounds.height} :
        {display: 'none'});
    // Show drag cursor when dragging over tags
    $('.tag').toggleClass('isDragging', isDragging);
}

function tagAdded(tag, byUser) {
    var element = $('.template.tag').clone().appendTo('.tags').removeClass('template')
        .css({left: tag.bounds.x, top: tag.bounds.y, width: tag.bounds.width, height: tag.bounds.height});
    bindTagEvents(element);
    // TODO: begin editing the new tag if created by user
    if(byUser)
        alert('TODO: Begin editing tag');
}

function tagRemoved(tag) {
    // TODO: remove associated DOM element
    alert('TODO: Remove ' + tag.type + ' tag element');
}


// Event functions

// Binds events to allow other elements to drag-and-drop over it
function bindTagEvents(element) {
    function bubbleUp(e) {
        $('.mockup').trigger(e);
        return true;
    }

    // Ignore any clicks on the element
    $(element).mousedown(function() { return false; });

    // Bubble up the other mouse events to allow drag-and-drop
    $(element).mousemove(bubbleUp);
    $(element).mouseup(bubbleUp);
}


// Event handlers
$('.tool').click(function() {
    editor.selectTool($(this).data('tool'));
    updateTools();
    return false;
});

$('.mockup').mousedown(function(e) {
    if(e.which != 1)
        return true;
    if(editor.selectedTool !== Editor.PointerTool)
        editor.startNewTag(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    return false;
});
$('.mockup').mousemove(function(e) {
    if(editor.newTagPreview !== null)
        editor.updateNewTag(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    return false;
});
$('.mockup').mouseup(function(e) {
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
bindTagEvents('.tagPreview');
updateTools();
$(initTags);
