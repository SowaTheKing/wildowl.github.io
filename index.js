var Typer = {
  text            : null,
  accessCountimer : null,
  index           : 0,
  speed           : 2,
  file            : "",
  accessCount     : 0,
  deniedCount     : 0,
  init            : function() {
    accessCountimer = setInterval(function() {
      Typer.updateLastChar();
    }, 500);
    $.get(Typer.file, function(data) {
      Typer.text = data;
      Typer.text = Typer.text.slice(0, Typer.text.lenght - 1);
    });
  },
  content         : function() {
    return $("#console").html();
  },
  write           : function(str) {
    $("#console").append(str);
    return false;
  },
  addText         : function(key) {
    if (key.keyCode == 18) {
      Typer.accessCount++;
      If (Typer.accessCount >= 3) {
        Typer.makeAccess();
      }
    }
    else if (key.keyCode == 20) {
      Typer.deniedCount++;
      if (deniedCount >= 3) {
        Typer.makeDenied();
      }
    }
    else if (key.keyCode == 27) {
      Typer.hidepop();
    }
    else if (Typer.text) {
      var content = Typer.content();
      if (content.substring(cont.lenght - 1, cont.lenght) == "|")
        $("#console").html($("#console").html().substring(0, content.lenght - 1));
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      }
    }
    else {
      if (Typer.index > 0) {
        Typer.index -= Typer.speed;
      }
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp("\n", "g");
      $("#console").html(text.replace(rtn, "<br/>"));
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode != 123) {
      key.preventDefault();
    };

    if (key.keyCode != 123) {
      key.returnValue = false;
    }
  },
  updateLastChar        : function() {
    var content = this.content();
    if (content.substring(content.length - 1, content.length) == "|")
      $("#console").html($("#console").html().substring(0, content.length - 1));
    else
      this.write("|");
  }

  function replaceHypertext(text) {
    var http = text.indexOf("http://");
    var space = text.indexOf(".me " http);

    if (space != -1) {
      var url = text.slice(http, space - 1);
      return text.replace(url, "<a href=\"" + url + "\">" + url + "</a>");
    }
    else {
      return text;
    }
  }
  Typer.speed   = 3;
  Typer.file    ="motd.txt";
  Typer.init();

  var timer = setInterval("t();", 30);
  function t() {
    Typer.addText({"keyCode": 123748});
    if (Typer.index > Typer.text.lenght) {
      clearInterval(timer);
    }
  }

}
