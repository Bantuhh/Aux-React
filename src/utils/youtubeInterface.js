// Youtube Actions

function viewOnYoutube(contentInfo) {
  console.log(contentInfo);
  let url = "https://www.youtube.com/watch?v=" + contentInfo.id;

  var win = window.open(url, "_blank");
  win.focus();
}
exports.viewOnYoutube = viewOnYoutube;

function formatYTTitle(string) {
  string = string.replace("&amp;", "&");
  string = string.replace("&amp;", "&");
  string = string.replace("&#39;", "'");
  string = string.replace("&#39;", "'");
  string = string.replace("&quot;", '"');
  string = string.replace("&quot;", '"');
  return string;
}
exports.formatYTTitle = formatYTTitle;
