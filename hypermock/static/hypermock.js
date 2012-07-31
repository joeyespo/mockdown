// hypermock.js

var pointerTool = 'pointer';
var availableTools = [pointerTool, 'comment', 'hyperlink'];
var selectedTool = '';

function initTools() {
    $.each(availableTools, function(index, tool) {
        initTool(tool);
    });
}

function initTool(tool) {
    var element = $('.' + tool + 'Tool');
    if(element.length === 0) {
        alert('"' + tool + '" tool not found.');
        return true;
    }
    element.click(function() {
        setTool(tool);
        return false;
    });
}

function setTool(tool) {
    $('.tool').removeClass('selected');
    $('.' + tool + 'Tool').addClass('selected');
    $('.preview').toggleClass('toolSelected', tool !== pointerTool);
    selectedTool = tool;
}

function createBox(rect) {
    switch(selectedTool) {
        case 'comment': return createComment(rect);
        case 'hyperlink': return createHyperlink(rect);
    }
}

function createComment(rect) {
    // TODO: create comment
    alert('TODO: Create comment');
}

function createHyperlink(rect) {
    // TODO: create hyperlink
    alert('TODO: Create hyperlink');

    // TODO: show potential mockups to link to
}

// TODO: better drag-to-create functionality

// Drag functionality
var drag = null;
$('.preview').mousedown(function(e) {
    if(!$(this).hasClass('toolSelected'))
        return true;
    drag = {x: e.clientX, y: e.clientY};
    $('.overlayPreview').css({left: drag.x, top: drag.y, width: 0, height: 0}).show();
    return false;
});
$('.preview, .overlayPreview').mousemove(function(e) {
    if(drag === null)
        return true;
    var popup = $('.overlayPreview');
    drag = {x: e.clientX, y: e.clientY};
    popup.css({width: Math.max(drag.x - popup.position().left, 0), height: Math.max(drag.y - popup.position().top, 0)});
    return false;
});
$('.preview, .overlayPreview').mouseup(function(e) {
    if(drag === null)
        return true;
    var popup = $('.overlayPreview');
    var rect = {x: popup.position().left, y: popup.position().top, width: popup.width(), height: popup.height()};
    drag = null;
    popup.css({left: 0, top: 0, width: 0, height: 0}).hide();
    if(rect.width > 0 && rect.height > 0)
        createBox(rect);
    return false;
});

$(function() {
    initTools();
    setTool(pointerTool);
});
