<template>
    <section ref="styles" hidden>
        <section ref="styleHost" hidden>
            <slot></slot>
        </section>
    </section>
</template>

<script>
export default {
  name: 'custom-styles',
  props: [],
  data() {
    return {
      style: [][0],
      observer: [][0],
    };
  },
  methods: {
    updateColor() {
      this.style.textContent = this.$refs.styleHost.textContent;
      this.$forceUpdate();
    },
    observe(mutations) {
      console.log(mutations);
      this.style.textContent = this.$refs.styleHost.textContent;
      this.$forceUpdate();
    },
  },
  mounted: function() {
    let config = { attributes: true, childList: true, characterData: true, subtree: true };
    this.observer = new MutationObserver(this.observe.bind());
    this.style = document.createElement('style');
    this.style.textContent = this.$refs.styleHost.textContent;
    // this.$refs.styles.textContent = null;
    this.$refs.styles.appendChild(this.style);
    this.observer.observe(this.$refs.styleHost, config);
  },
};
</script>
