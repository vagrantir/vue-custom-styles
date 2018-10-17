<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <div class="test_class first">
            Test before
        </div>
        <CustomStyles>
            .test_class {
                color: {{color}};
                background-color: black;
            }
            .test_class.first{
                {{ classBody }}
            }
        </CustomStyles>
        <br>
        <div class="test_class second">
            Test after
        </div>
        <br>
        <label for="text-color">color: <input id="text-color" type="text" v-model="color"></label>
        <br>
        <label for="text-class">class:
            <textarea id="text-class" type="text" v-model="classBody"></textarea>
        </label>
    </div>
</template>

<script>
import CustomStyles from './components/CustomStyles.vue';

export default {
  name: 'app',
  components: {
    CustomStyles,
  },
  data() {
    return {
      color: 'red',
      classBody: '',
    };
  },
  watch: {
    color() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
