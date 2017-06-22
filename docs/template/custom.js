exports.defineTags = function (dictionary) {
  dictionary.defineTag("category", {
    mustHaveValue: true,
    canHaveType: false,
    canHaveName: true,

    onTagged: function (doclet, tag) {
      doclet.category = tag.value;
    }
  });
};
