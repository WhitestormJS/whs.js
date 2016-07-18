var asciitable = function asciitable(options, data) {
  var pad = function pad(text, length) {
    if (typeof text === "undefined") { text = ""; }
    return ("" + text) + new Array(Math.max((length - ("" + text).length) + 1,0)).join(" ");
  };

  if (typeof options === "object" && Array.isArray(options)) {
    var tmp = data;
    data = options;
    options = tmp;
  }

  if (!options) {
    options = {};
  }

  if (!options.intersectionCharacter) {
    options.intersectionCharacter = "-";
  }

  var columns;
  if (options.columns) {
    columns = options.columns;
  } else {
    columns = [];
    data.forEach(function(e) {
      Object.keys(e).filter(function(k) { return columns.indexOf(k) === -1; }).forEach(function(k) { columns.push(k); });
    });
  }

  columns = columns.map(function(e) {
    if (typeof e === "string") {
      e = {
        name: e,
        field: e,
      };
    }

    e.width = e.name.length;

    return e;
  });

  data.forEach(function(e) {
    columns.forEach(function(column) {
      if (typeof e[column.field] === "undefined") {
        return;
      }

      column.width = Math.max(column.width, ("" + e[column.field]).length);
    });
  });

  var output = [];

  var separator = [""].concat(columns.map(function(e) { return (new Array(e.width + 1)).join("-"); })).concat([""]).join("-" + options.intersectionCharacter + "-");

  output.push(separator);
  output.push([""].concat(columns.map(function(e) { return pad(e.name, e.width); })).concat([""]).join(" | "));
  output.push(separator);
  data.forEach(function(row) {
    output.push([""].concat(columns.map(function(column) { return pad(row[column.field], column.width); })).concat([""]).join(" | "));
  });
  output.push(separator);

  if (options.skinny) {
    output = output.map(function(e) {
      return e.replace(/^[ -]/, "").replace(/[ -]$/, "");
    });
  }

  return output.join("\n");
};

if(typeof module !== "undefined") module.exports = asciitable;
