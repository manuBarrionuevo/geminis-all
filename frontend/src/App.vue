<template>
  <sidenav
    v-if="showSidenav"
    :custom-class="color"
    :class="[isTransparent, isRTL ? 'fixed-end' : 'fixed-start']"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <!-- nav -->
    <navbar
      v-if="showNavbar"
      :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
      :text-white="isAbsolute ? 'text-white opacity-8' : ''"
      :min-nav="navbarMinimize"
    />
    <router-view />
    <app-footer v-show="showFooter" />
    <configurator
      :toggle="toggleConfigurator"
      :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
    />
  </main>
</template>
<script>
import Sidenav from "./components/Sidenav";
import Navbar from "@/components/Navbars/Navbar.vue";
import AppFooter from "@/components/Footer.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "App",
  components: {
    Sidenav,
    Navbar,
    AppFooter,
  },
  computed: {
    ...mapState([
      "isTransparent",
      "isRTL",
      "isNavFixed",
      "isAbsolute",
      "navbarFixed",
      "absolute",
      "color",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
    ]),
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
};
</script>
<style>
#sidenav-main {
  overflow: hidden !important;
}
#sidenav-collapse-main {
  overflow-x: hidden !important;
}
</style>