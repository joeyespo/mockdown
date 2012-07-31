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

// Drag functionality
var drag = null;
$('.preview').mousedown(function(e) {
    if(!$(this).hasClass('toolSelected'))
        return true;
    drag = {x: e.clientX, y: e.clientY};
    // TODO: create a box preview
    return false;
});
$('.preview').mousemove(function(e) {
    if(!$(this).hasClass('toolSelected') || drag === null)
        return true;
    // TODO: resize the box preview
    drag = {x: e.clientX, y: e.clientY};
    return false;
});
$('.preview').mouseup(function(e) {
    if(!$(this).hasClass('toolSelected') || drag === null)
        return true;
    // TODO: create the box
    drag = null;
    return false;
});

$(function() {
    initTools();
    setTool(pointerTool);
});
