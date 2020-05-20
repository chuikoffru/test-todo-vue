<template>
  <div id="app">
    <div class="left">
      <Sidebar/>
    </div>
    <div class="right">
      <Header/>
      <section class="content">
        <router-view/>
      </section>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style lang="sass">
@import './sass/reset'
html, body
  height: 100%
  overflow-y: hidden
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
a
  text-decoration: none
#app
  display: flex
  flex-direction: row
  height: 100vh
.left
  flex-basis: 30%
  background: $sb-bg
.right
  flex-basis: 70%
  background: #eee
.content
  overflow: auto
  height: 100vh
  padding: 25px 25px 80px
.button
  background: #000
  color: #fff
  padding: 15px 20px
  font-size: 1rem
</style>
