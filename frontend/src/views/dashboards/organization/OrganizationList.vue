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
                  <button
                      type="button"
                      class="mx-1 mb-0 btn bg-gradient-success btn-sm"
                      @click="navigateToEntityListAdmin"
                    >
                    +&nbsp;Nuevo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="organization-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>No</th>
                    <th>Municipio</th>
                    <th>CUIT</th>
                    <th>Dominio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(entity, index) in organizations" :key="entity.entity_cuit">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entity.entity_name }}</td>
                    <td>{{ entity.entity_cuit }}</td>
                    <td>{{ entity.entity_domain }}</td>
                    <td class="text-right">
                      <a
                        :href="`/organization/detail?entityName=${entity.entity_name}`"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Consultar organization"
                      >
                        <i class="fas fa-eye text-secondary"></i>
                      </a>
                      <a
                        href="/organization/adminlist?entityName={{entity.entity_name}}"
                        class="mx-3"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Admin organization"
                      >
                        <i class="fas fa-building text-secondary"></i>
                      </a>
                      <a
                        href="javascript:;"
                        data-bs-toggle="tooltip"
                        data-bs-original-title="Delete organization"
                      >
                        <i class="fas fa-trash text-secondary"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>No</th>
                    <th>Municipio</th>
                    <th>CUIT</th>
                    <th>Dominio</th>
                    <th>Acciones</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  computed: {
    ...mapState('organizations', ['organizations']),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch('organizations/fetchOrganizations')
        .then(() => {
          this.initDataTable();
        })
        .catch(error => {
          this.$notify({
            type: 'danger',
            message: `Hubo un error al obtener las organizaciones: ${error.message}`,
            icon: 'nc-icon nc-bell-55',
          });
        });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (document.getElementById("organization-list")) {
          const dataTableSearch = new DataTable("#organization-list", {
            searchable: true,
            fixedHeight: false,
            perPage: 7
          });

          document.querySelectorAll(".export").forEach(function (el) {
            el.addEventListener("click", function () {
              var type = el.dataset.type;
              var data = {
                type: type,
                filename: "soft-ui-" + type
              };
              if (type === "csv") {
                data.columnDelimiter = "|";
              }
              dataTableSearch.export(data);
            });
          });
        }
        setTooltip(this.$store.state.bootstrap);
      });
    },
    navigateToEntityDetails() {
    },
    navigateToEntityListAdmin() {
      this.$router.push({ name: "OrganizationAdd" });
    },
    handleDelete() {
    },
  },
  watch: {
    organizations: {
      handler() {
        this.initDataTable();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.thead-light th {
  background-color: #f8f9fa;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>
