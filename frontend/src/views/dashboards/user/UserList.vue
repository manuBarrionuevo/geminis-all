<!--<template>-->
<!--  <div class="card p-4 m-3 border-light mb-3">-->
<!--    <div class="card-header d-flex justify-content-between align-items-center">-->
<!--      <h3 class="card-title mb-0">Listado de Usuarios</h3>-->
<!--     <button class="btn btn-primary" @click="goToUserAdd()" >Nuevo <i class="fa fa-plus ml-2" ></i> </button>-->

<!--    </div>-->
<!--    <div class="table-responsive">-->
<!--      <table class="table table-bordered table-hover mt-3">-->
<!--          <thead class="thead-light">-->
<!--            <tr>-->
<!--              <th>CUIL</th>-->
<!--              <th>Nombre</th>-->
<!--              <th>Email</th>-->
<!--              <th>Rol</th>-->
<!--              <th>Acciones</th>-->
<!--            </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--            <tr v-for="user in users" :key="user.cuil">-->
<!--              <td>{{ user.cuil }}</td>-->
<!--              <td></td>-->
<!--              <td></td>-->
<!--              <td>{{ user.roles[0].name }}</td>-->
<!--              <td>x x</td>-->
<!--            </tr>-->
<!--          </tbody>-->
<!--        </table>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->


<template>
<div class="py-4 container-fluid">
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="pb-0 card-header">
          <div class="d-lg-flex">
            <div>
              <h5 class="mb-0">Administración de Usuarios</h5>
            </div>
            <div class="my-auto mt-4 ms-auto mt-lg-0">
              <div class="my-auto ms-auto">
                <button
                    type="button"
                    class="mx-1 mb-0 btn bg-gradient-success btn-sm"
                    @click="goToUserAdd()"
                >
                  +&nbsp;Nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="px-0 pb-0 card-body">
          <div class="table-responsive">
            <table id="users-list" class="table table-flush">
              <thead class="thead-light">
              <tr>
                <th>CUIL</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in users" :key="user.cuil">
                <td>{{ user.cuil }}</td>
                <td></td>
                <td></td>
                <td>{{ user.roles[0].name }}</td>
                <td class="text-right">
                  <a
                      href="javascript:;"
                      data-bs-toggle="tooltip"
                      data-bs-original-title="Preview organization"
                  >
                    <i class="fas fa-eye text-secondary"></i>
                  </a>
                  <a
                      href="/"
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
                <th>CUIL</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
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
    ...mapState('users', ['users'])
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    goToUserAdd() {
      this.$router.push({ name: "addUser" });
    },

    fetchData() {
      this.$store.dispatch('users/fetchUsers')
          .then(() => {
            this.initDataTable();
          })
          .catch(error => {
            console.error("Error fetching users:", error);
          });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (document.getElementById("users-list")) {
          const dataTableSearch = new DataTable("#users-list", {
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
    navigateToEntityDetails(entityName) {
      alert('Entity details');
      console.log("Navigating to entity details:", entityName);
      // alert(`Navigating to entity details: ${entityName}`);
    },
    navigateToEntityListAdmin(entityName) {
      console.log("Navigating to entity list admin:", entityName);
      //this.$router.push({ name: "Organization List Admin", params: { entityName } });
    },
    handleDelete(index, entity) {
      console.log("Deleting entity:", index, entity);
    },
    goToEntityAdd() {
      console.log("Navigating to add entity");
      this.$router.push({ name: "EntityAdd" });
    }
  },
  watch: {
    users: {
      handler() {
        this.initDataTable();
      },
      deep: true
    }
  }




}

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
