import Vue        from 'vue';
import wrap       from '@vue/web-component-wrapper';
import RcDropdown from './components/RcDropdown.vue';

try {
  window.customElements.define('rc-dropdown', wrap(Vue, RcDropdown));
} catch (err) {
  window.console.trace(err.message);
}

export default RcDropdown;
