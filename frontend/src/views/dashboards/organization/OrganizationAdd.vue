<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Administración de Municipios</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link to="/organization/list" class="mb-0 btn bg-gradient-success btn-sm">&nbsp; Volver al Listado </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
            <Form
                role="form"
                class="text-start"
                :validation-schema="schema"
                @submit="handleRegister">

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">CUIT del Municipio</label>
                  <Field name="entity_cuit" type="text" v-model="data_entity.entity_cuit">
                    <soft-model-input
                        id="entity_cuit"
                        v-model="data_entity.entity_cuit"
                        name="entity_cuit"
                        type="text"
                        placeholder="Ingrese el CUIT del Municipio" />
                    <ErrorMessage name="entity_cuit" class="text-danger" />
                  </Field>
                </div>

                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Municipio</label>
                  <Field name="entity_name" type="text" v-model="data_entity.entity_name">
                    <soft-model-input
                        id="entity_name"
                        v-model="data_entity.entity_name"
                        name="entity_name"
                        type="text"
                        placeholder="Ingrese el Nombre del Municipio" />
                    <ErrorMessage name="entity_name" class="text-danger" />
                  </Field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">CUIL del Responsable</label>
                  <Field name="user_cuil" type="text" v-model="data_entity.user_cuil">
                    <soft-model-input
                        id="user_cuil"
                        v-model="data_entity.user_cuil"
                        name="user_cuil"
                        type="text"
                        placeholder="Ingrese el CUIL del Responsable" />
                    <ErrorMessage name="user_cuil" class="text-danger" />
                  </Field>
                </div>

                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Nombre</label>
                  <Field name="user_name" type="text" v-model="data_entity.user_name">
                    <soft-model-input
                        id="user_name"
                        v-model="data_entity.user_name"
                        name="user_name"
                        type="text"
                        placeholder="Ingrese el Nombre del Responsable" />
                    <ErrorMessage name="user_name" class="text-danger" />
                  </Field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Correo Electrónico</label>
                  <Field name="email" type="email" v-model="data_entity.email">
                    <soft-model-input
                        id="email"
                        v-model="data_entity.email"
                        name="email"
                        type="email"
                        placeholder="Ingrese el correo electrónico" />
                    <ErrorMessage name="email" class="text-danger" />
                  </Field>
                </div>

                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Apellido</label>
                  <Field name="user_lastname" type="text" v-model="data_entity.user_lastname">
                    <soft-model-input
                        id="user_lastname"
                        v-model="data_entity.user_lastname"
                        name="user_lastname"
                        type="text"
                        placeholder="Ingrese el Apellido del Responsable" />
                    <ErrorMessage name="user_lastname" class="text-danger" />
                  </Field>
                </div>
              </div>

              <h5 class="mt-4">Dominios y Base de Datos</h5>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Configuración del Dominio</label>
                  <Field name="entity_domain" type="text" v-model="data_entity.entity_domain">
                    <soft-model-input
                        id="entity_domain"
                        v-model="data_entity.entity_domain"
                        name="entity_domain"
                        type="text"
                        placeholder="Ingrese la configuración del dominio" />
                    <ErrorMessage name="entity_domain" class="text-danger" />
                  </Field>
                </div>

                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Usuario de la BD</label>
                  <Field name="db_user" type="text" v-model="data_entity.db_user">
                    <soft-model-input
                        id="db_user"
                        v-model="data_entity.db_user"
                        name="usuario_bd"
                        type="text"
                        placeholder="Ingrese el usuario de la BD" />
                    <ErrorMessage name="db_user" class="text-danger" />
                  </Field>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Nombre de la BD</label>
                  <Field name="db_name" type="text" v-model="data_entity.db_name">
                    <soft-model-input
                        id="db_name"
                        v-model="data_entity.db_name"
                        name="db_name"
                        type="text"
                        placeholder="Ingrese el nombre de la BD" />
                    <ErrorMessage name="db_name" class="text-danger" />
                  </Field>
                </div>

                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Contraseña de la BD</label>
                  <Field name="db_password" type="password" v-model="data_entity.db_password">
                    <soft-model-input
                        id="db_password"
                        v-model="data_entity.db_password"
                        name="db_password"
                        type="password"
                        placeholder="Ingrese la contraseña de la BD" />
                    <ErrorMessage name="db_password" class="text-danger" />
                  </Field>
                </div>
              </div>

              <soft-button
                  color="dark"
                  variant="gradient"
                  class="float-end mt-4 mb-0"
                  size="sm"
                  :is-disabled="loading ? true : false">
                <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                <span v-else>Guardar</span>
              </soft-button>
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
  name: "OrganizationAdd",
  components: {
    SoftModelInput,
    SoftButton,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const schema = yup.object().shape({
      entity_cuit: yup.string().required("Ingrese el CUIT del Municipio"),
      entity_name: yup.string().required("Ingrese el Nombre del Municipio"),
      user_cuil: yup.string().required("Ingrese el CUIL del Responsable"),
      user_name: yup.string().required("Ingrese el Nombre del Responsable"),
      email: yup.string().email("Ingrese un correo válido").required("Ingrese el correo electrónico"),
      user_lastname: yup.string().required("Ingrese el Apellido del Responsable"),
      entity_domain: yup.string().required("Ingrese la configuración del dominio"),
      db_user: yup.string().required("Ingrese el usuario de la BD"),
      db_name: yup.string().required("Ingrese el nombre de la BD"),
      db_password: yup.string().required("Ingrese la contraseña de la BD"),
    });

    return {
      schema,
      data_entity: {
        "entity_phone": "1132261837",
        "user_role": "admin"
      },
      loading: false,
    };
  },
  methods: {
    async handleRegister() {
      try {
        await this.$store.dispatch('organizations/addOrganization', this.data_entity);
        showSwal.methods.showSwal({
          type: "success",
          message: "Municipio agregado con éxito!",
        });
        this.$router.push("/organization/list");
      } catch (error) {
        if (error.response.data.errors || error.response.data.success === false) {
          showSwal.methods.showSwal({
            type: "error",
            message: error.response.data.message,
          });
        } else {
          showSwal.methods.showSwal({
            type: "error",
            message: "Oops, error al generar el Municipio!",
          });
        }
      }
    },
  }
});
</script>

<style>
img {
  object-fit: cover;
}
.choices {
  margin-bottom: 0px !important;
}
</style>
