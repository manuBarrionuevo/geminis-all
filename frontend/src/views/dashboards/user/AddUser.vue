<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Agregar Usuario</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link to="/user/list" class="mb-0 btn bg-gradient-success btn-sm"
                  >&nbsp; Volver al Listado </router-link
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
              <Form
                role="form"
                class="text-start"
                :validation-schema="schema"
                @submit="handleRegister" >

                <label class="form-label mt-2 row mt-4">Cuil</label>

                <field
                    name="cuil"
                    type="text"
                    v-model="user.cuil">
                  <soft-model-input
                      id="cuil"
                      v-model="user.cuil"
                      name="cuil"
                      type="text"
                      placeholder="CUIT/CUIL"
                  />
                  <ErrorMessage name="cuil" class="text-danger" />
                 </field>

                <label class="form-label mt-2 row mt-4">Rol</label>

                <field name="rol" type="text"  v-model="user.role">
                  <soft-model-input
                      id="rol"
                      v-model="user.role"
                      name="rol"
                      type="text"
                      placeholder="Rol"
                  />
                  <ErrorMessage name="rol" class="text-danger" />
                </field>

<!--            <select-->
<!--                id="choices-roles"-->
<!--                v-model="getRole"-->
<!--                class="form-control"-->
<!--                name="choices-roles"-->
<!--            ></select>-->

                <soft-button
                    color="dark"
                    variant="gradient"
                    class="float-end mt-4 mb-0"
                    size="sm"
                    :is-disabled="loading ? true : false"

                ><span v-if="loading" class="spinner-border spinner-border-sm"></span>
                  <span v-else>Agregar</span></soft-button
                >
              </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SoftModelInput from "/src/components/SoftModelInput.vue";
import SoftButton from "/src/components/SoftButton.vue";
import showSwal from "/src/mixins/showSwal.js";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default defineComponent({
  name: "AddUser",
  components: {
    SoftModelInput,
    SoftButton,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const schema = yup.object().shape({
      cuil: yup.string().matches(/^(20|23|24|27)\d{8}\d$/, 'Verifique el formato del cuit/cuil' ).required("Ingrese un cuil"),
      rol: yup.string().required("Ingrese un rol")
    });

    return {
      schema,
      user: {},
      loading: false,
      getRole: null,
      options: [],
    };
  },

  methods: {

    async handleRegister() {

      // this.loading = true;
      try {
        await this.$store.dispatch('users/addUser', this.user);

        showSwal.methods.showSwal({
          type: "success",
          message: "User added successfully!",
        });
        this.$router.push("/user/list");

      }catch (error){
        if (error.response.data.errors || error.response.data.success === false ){
            //this.setApiValidation(error.response.data.errors);
          showSwal.methods.showSwal({
            type: "error",
            message: error.response.data.message,
            width: 700,
          });
        }
        else
          showSwal.methods.showSwal({
            type: "error",
            message: error.response.data.message + "Oops, something went wrong!",
            width: 700,
          });
        // this.loading = false;
      }
    },
  }
});
</script>
<style>
img {
  object-fit: cover;
}

.choices{
  margin-bottom: 0px !important;
}
</style>
