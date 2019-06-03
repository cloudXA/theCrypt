//定义命名空间对象
var spacer = {
    //返回空字符
    blank: function (){
        return "";
    },
    //返回换行符
    newLine: function () {
        return "\n";
    },
    //返回指定长度的字符
    line: function (length, character) {
        var longString = "****************************************";
        longString += "----------------------------------------";
        longString += "========================================";
        longString += "++++++++++++++++++++++++++++++++++++++++";
        longString += " ";
        length = Math.max(0, length);
        length = Math.min(40,length);
        return longString.substr(longString.indexOf(character), length);

    },
    //使用字符和新增加的首位空格填充文本
    wrap: function (text, length, character) {
        var padLength = length - text.length + 3;
        var wrapText = character + " " + text;
        wrapText += spacer.line(padLength, " ");
        wrapText += character;
        return wrapText;
    },
    //将文本置于指定字符的框内
    box: function (text, length, character) {
        var boxText = spacer.newLine();
        boxText += spacer.line(length, character) + spacer.newLine();
        boxText += spacer.wrap(text, length, character) + spacer.newLine();
        boxText += spacer.line(length, character) + spacer.newLine();
        return boxText;
    }
};