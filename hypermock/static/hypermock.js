// hypermock.js

var availableTools = ['pointer', 'comment', 'hyperlink'];
var selectedTool = '';

function initTools() {
    $.each(availableTools, function(index, tool) {
        initTool(tool);
    });
}

function initTool(tool) {
    var element = $('.' + tool + 'Tool');
    if(element.length == 0) {
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
    selectedTool = tool;
}

$(function() {
    initTools();
    setTool('pointer');
});
