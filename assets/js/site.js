// Smooth in-page anchor scrolling for the c-editorial navigation.
// Vanilla replacement for the theme's jQuery smooth-scroll setup.
(function () {
  var OFFSET = 96; // sticky pill masthead height + breathing room

  document.addEventListener("click", function (event) {
    var a = event.target && event.target.closest ? event.target.closest("a") : null;
    if (!a || !a.getAttribute) return;
    var href = a.getAttribute("href") || "";

    var id = null;
    if (href.charAt(0) === "#") {
      id = href.slice(1);
    } else if (href.indexOf("/#") === 0) {
      // Root-relative anchor (e.g. /#news): only intercept when already on the homepage,
      // otherwise let the browser navigate to the homepage anchor natively.
      if (window.location.pathname.replace(/index\.html$/, "") !== "/") return;
      id = href.slice(2);
    }
    if (!id || !document.getElementById(id)) return;

    event.preventDefault();
    var y = document.getElementById(id).getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
    if (history.pushState) history.pushState(null, "", "#" + id);
  });
})();
