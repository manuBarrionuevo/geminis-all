<template>
  <a
    :data-bs-toggle="collapse ? 'collapse' : ''"
    :href="collapse ? `#${collapseRef}` : collapseRef"
    :aria-controls="collapseRef"
    aria-expanded="false"
    class="nav-link"
    v-bind="$attrs"
    type="button"
    @click="isExpanded = !isExpanded"
  >
    <div
      class="text-center bg-color shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-2'"
    >
      <slot name="icon"></slot>
    </div>
    <span
      class="nav-link-text"
      :class="isRTL ? ' me-1' : 'ms-1'"
      >{{ navText }}</span
    >
  </a>
  <div :id="collapseRef" class="collapse">
    <slot name="list"></slot>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "SidenavCollapse",
  props: {
    collapseRef: {
      type: String,
      required: true
    },
    navText: {
      type: String,
      required: true
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(["isRTL"]),
  },
};
</script>
