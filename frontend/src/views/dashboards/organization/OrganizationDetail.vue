<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Detalle del Municipio {{ organization?.tenancy_entity_name }}</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <router-link to="/organization/list" class="mb-0 btn bg-gradient-success btn-sm">&nbsp; Volver al Listado </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div v-if="organization">
              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">CUIT del Municipio</label>
                  <p>{{ organization.tenancy_entity_cuit }}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Municipio</label>
                  <p>{{ organization.tenancy_entity_name }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">CUIL del Responsable</label>
                  <p>{{ organization.tenancy_user_cuil }}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Nombre</label>
                  <p>{{ organization.tenancy_user_name }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Correo Electrónico</label>
                  <p>{{ organization.tenancy_user_email }}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Apellido</label>
                  <p>{{ organization.tenancy_user_lastname }}</p>
                </div>
              </div>

              <h5 class="mt-4">Dominios y Base de Datos</h5>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Configuración del Dominio</label>
                  <p>{{ organization.tenancy_entity_domain }}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Usuario de la BD</label>
                  <p>{{ organization.tenancy_db_username }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Nombre de la BD</label>
                  <p>{{ organization.tenancy_db_name }}</p>
                </div>
                <div class="col-md-6">
                  <label class="form-label mt-2 row mt-4">Contraseña de la BD</label>
                  <p>{{ organization.tenancy_db_password }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <p>Cargando...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('organizations', {
      organization: state => state.selectedOrganization
    }),
  },
  mounted() {
    this.fetchOrganization();
  },
  methods: {
    async fetchOrganization() {
      // Extraigo el nombre de la entidad de la cadena de consulta URL
      const urlParams = new URLSearchParams(window.location.search);
      const entityName = urlParams.get('entityName');

      // Envia la acción con el nombre de entidad extraído
      if (entityName) {
        await this.$store.dispatch('organizations/fetchOrganizationById', entityName);
      } else {
        // Maneja el caso en el que falta el nombre de la entidad en la URL
        console.error('Missing entityName in the URL');
      }
    },
  },
};
</script>
