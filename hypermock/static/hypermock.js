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

$('.preview').mousedown(function() {
    if($(this).hasClass('toolSelected')) {
        // TODO: implement dragging
        alert('TODO: Start dragging');
    }
    return false;
});

$(function() {
    initTools();
    setTool(pointerTool);
});
