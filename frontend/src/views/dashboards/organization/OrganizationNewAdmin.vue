<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <!-- Añadir contenido aquí si es necesario -->
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="px-5 col-xl-5 col-lg-6 col-md-8 col-12 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-3 card-body">
                  <Form @submit="handleSendEmail" class="text-start">
                    <div>
                      <label for="email">Email</label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        v-model="email"
                        placeholder="Email"
                        class="form-control"
                      />
                      <ErrorMessage name="email" class="text-danger" />
                    </div>
                    <div class="text-center">
                      <soft-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        full-width
                        :is-disabled="loading"
                      >
                        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                        <span v-else>Send</span>
                      </soft-button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <!-- Añadir contenido aquí si es necesario -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>



<script>
import { defineComponent, ref } from 'vue';
import { useField, Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import SoftButton from "@/components/SoftButton.vue";
import showSwal from "/src/mixins/showSwal.js";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "SendEmail",
  components: {
    SoftButton,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const email = ref('');
    const loading = ref(false);

    const emailSchema = yup.string()
      .required("Email is required!")
      .email("Must be a valid email! ex.: name@company.domain");

    useField('email', emailSchema);

    const handleSendEmail = async () => {
      loading.value = true;
      try {
        // Lógica para enviar el correo electrónico
        showSwal.methods.showSwal({
          type: "success",
          message: "Email sent! Please check your inbox.",
          width: 450,
        });
      } catch (error) {
        console.error("Error sending email:", error);
        showSwal.methods.showSwal({
          type: "error",
          message: "Failed to send email. Please try again later.",
          width: 450,
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      loading,
      handleSendEmail
    };
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    document.body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    document.body.classList.add("bg-gray-100");
  }
});
</script>


<style scoped>
.text-danger {
  color: red;
}
</style>
