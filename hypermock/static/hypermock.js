// hypermock.js

// Values are: 'pointer', 'comment', 'hyperlink'
var selectedTool = '';

function setTool(tool) {
    $('.tool').removeClass('selected');
    $('.' + tool + 'Tool').addClass('selected');
    selectedTool = tool;
}

$('.pointerTool').click(function() {
    setTool('pointer');
    return false;
});

$('.commentTool').click(function() {
    setTool('comment');
    return false;
});

$('.hyperlinkTool').click(function() {
    setTool('hyperlink');
    return false;
});

$(function() {
    setTool('pointer');
});
