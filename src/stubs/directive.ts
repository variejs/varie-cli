// https://vuejs.org/v2/guide/custom-directive.html
import Vue from "vue";

Vue.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});
