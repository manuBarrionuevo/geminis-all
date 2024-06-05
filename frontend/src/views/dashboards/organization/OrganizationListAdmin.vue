  <template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <!-- Card header -->
          <div class="pb-0 card-header">
            <div class="d-lg-flex">
              <div>
                <h5 class="mb-0">Administradores:</h5>
              </div>
              <div class="my-auto mt-4 ms-auto mt-lg-0">
                <div class="my-auto ms-auto">
                  <button
                    type="button"
                    class="mx-1 mb-0 btn bg-gradient-success btn-sm"
                    @click="navigateToEntityNewAdmin"
                  >
                    +&nbsp;Nuevo
                  </button>
                </div>
              </div>
            </div>
          </div>
          {{entities}}
          <div class="px-0 pb-0 card-body">
            <div class="table-responsive">
              <table id="organization-list" class="table table-flush">
                <thead class="thead-light">
                  <tr>
                    <th>CUIL</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Roles</th>
                    <th>Habilitado</th>
                    <th>Asignar como principal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(entity, index) in entities" :key="entity.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ entity.entity_name }}</td>
                    <td>{{ entity.entity_cuit }}</td>
                    <td>{{ entity.entity_domain }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>CUIL</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Roles</th>
                    <th>Habilitado</th>
                    <th>Asignar como principal</th>
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
import SoftButton from "@/components/SoftButton.vue";
import { DataTable } from "simple-datatables";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  component: {
    SoftButton
  },
  mounted() {
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
  },
  computed: {
    ...mapState('entities', ['entities'])
  },
  methods: {
    navigateToEntityDetails(entityName) {
      // Lógica para navegar a los detalles de la entidad
      console.log(entityName);
    },
    navigateToEntityListAdmin(entityName) {
      // Lógica para navegar a los detalles de la entidad
      console.log(entityName);
      this.$router.push({ name: "Organization List Admin", params:{ entityName: entityName } });
    },
    handleDelete(index, entity) {
      // Lógica para eliminar una entidad
      console.log(index, entity);
    }
  },
  created() {
    this.$store.dispatch('entities/fetchEntities');
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
