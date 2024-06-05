<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="dashboardsExamples"
          nav-text="Usuarios"
          :class="getRoute() === 'user' ? 'active' : ''"
        >
          <template #icon>
            <Shop />
          </template>
          <template #list>
            <ul class="nav ms-4 ps-3">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'UserList' }"
                mini-icon="D"
                text="Lista"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="pagesExamples"
          nav-text="Administración"
          :class="getRoute() === 'organization' ? 'active' : ''"
        >
          <template #icon>
            <Office />
          </template>
          <template #list>
            <ul class="nav ms-4 ps-3">
              <sidenav-item
                :to="{ name: 'OrganizationList' }"
                mini-icon="D"
                text="Municipios"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
import { mapState } from "vuex";
export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
    Shop,
    Office,
  },
  props: {
    cardBg: {
      type: String,
      default: "",
    },
  },

  computed: {
    ...mapState(["isRTL"]),
    profile() {
      return this.$store.getters["profile/profile"];
    },
    requireAdmin() {
      if (this.$store.getters["auth/loggedIn"] && this.profile) {
        if (this.profile.roles[0].name == "admin") return true;
      }

      return false;
    },
    requireCreator() {
      if (this.$store.getters["auth/loggedIn"] && this.profile) {
        const aux = this.profile.roles[0].name;
        if (aux == "admin" || aux == "creator") return true;
      }
      return false;
    },
  },
  async created() {
    if (this.$store.getters["auth/loggedIn"]) {
      try {
        await this.$store.dispatch("profile/getProfile");
        this.profileChange = { ...this.profile };
      } catch (error) {
        try {
          await this.$store.dispatch("auth/logout");
        } finally {
          this.$router.push("/login");
        }
      }
    }
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
