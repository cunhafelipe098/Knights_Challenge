<template>
  <div>
    <div class="text-h2 row justify-center">knights Editor</div>

    <div class="q-pa-md justify-center">
      <q-table
        title="Knights Editor"
        :data="data"
        :columns="columns"
        row-key="id"
        :loading="loading"
        dense
        binary-state-sort
        @request="getAllKnights"
        :pagination="initialPagination"
      >
        <template v-slot:top>
          <q-btn
            dense
            color="primary"
            label="Add Knights"
            @click="show_dialog_addKnights = true"
            no-caps
          />
          <!-- create Knights popup -->
          <div class="q-pa-sm q-gutter-lg">
            <q-dialog v-model="show_dialog_addKnights">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Knight Registration</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <q-input
                      class="q-ml-md"
                      v-model="name"
                      label="Name"
                      :rules="[(val) => !!val || 'Name is required']"
                    />
                    <q-input class="q-ml-md" v-model="nickname" label="Nickname" />
                    <div>
                      <q-input
                        filled
                        class="q-ma-md"
                        v-model="birthday"
                        mask="date"
                        :rules="['date']"
                        label="Birthday"
                      >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="birthday">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat></q-btn>
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      </q-input>
                    </div>
                  </div>
                  <q-select
                    outlined
                    v-model="keyAttribute"
                    :options="options"
                    label="Choose Attribute"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                  />

                  <div id="q-app" style="min-height: 100vh;">
                    <div class="q-pt-md">
                      <q-card class="my-card">
                        <q-card-section>
                          <div class="text-h6">Fill the fields below</div>
                        </q-card-section>

                        <q-tabs v-model="tab" class="text-teal">
                          <q-tab label="Attributes" name="one"></q-tab>
                          <q-tab label="Weapons" name="two"></q-tab>
                        </q-tabs>

                        <q-separator></q-separator>

                        <q-tab-panels v-model="tab" animated>
                          <q-tab-panel name="one">
                              <q-input
                                class="q-ma-md" filled v-model="attributes.strength"
                                label="strength"
                              />
                              <q-input
                                class="q-ma-md" filled v-model="attributes.dexterity"
                                label="dexterity"
                              />
                              <q-input
                                class="q-ma-md" filled v-model="attributes.constitution"
                                label="constitution"
                              />
                              <q-input
                                class="q-ma-md" filled v-model="attributes.intelligence"
                                label="intelligence"
                              />
                              <q-input
                                class="q-ma-md" filled v-model="attributes.wisdom"
                                label="wisdom"
                              />
                              <q-input
                                class="q-ma-md" filled v-model="attributes.charisma"
                                label="charisma"/>
                          </q-tab-panel>

                          <q-tab-panel name="two">
                            <q-input class="q-ma-md" filled v-model="weapons.name"
                              label="name"
                            />
                            <q-input class="q-ma-md" filled v-model="weapons.mod"
                              label="mod"
                            />
                            <q-input class="q-ma-md" filled v-model="weapons.attr"
                              label="attr"
                            />
                            <q-checkbox
                              class="q-ma-sm"
                              v-model="weapons.equipped"
                              val="teal"
                              label="Equipped"
                              color="teal"
                            />
                          </q-tab-panel>
                        </q-tab-panels>
                      </q-card>
                    </div>
                  </div>

                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Back"
                    color="primary"
                    v-close-popup="cancelEnabled"
                  />
                  <q-btn
                    label="Add"
                    color="primary"
                    v-close-popup
                    @click="createKnights"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>

          <!-- edit Knights popup -->

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog_editKnights">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Edit Nick Name</div>
                </q-card-section>

                <q-card-section>
                  <div class="row">
                    <q-input v-model="editedItem.nickname" label="Nickname" />
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cacel"
                    color="primary"
                    v-close-popup="cancelEnabled"
                  />
                  <q-btn
                    label="Edit"
                    color="primary"
                    v-close-popup
                    @click="saveEdits"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog_deleteKnights">
              <q-card>
                <q-card-section>
                  <div class="text-h6">
                    Really want to delete "{{ editedItem.name }}"'?
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cacel"
                    color="dark"
                    v-close-popup="cancelEnabled"
                  />
                  <q-btn
                    label="Delete"
                    color="negative"
                    v-close-popup
                    @click="deleteKnights"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="nickname" :props="props">
              {{ props.row.nickname }}
            </q-td>

            <q-td key="birthday" :props="props">
              {{ props.row.birthday }}
            </q-td>

            <q-td key="keyAttribute" :props="props">
              {{ props.row.keyAttribute }}
            </q-td>

            <q-td key="actionEdit" :props="props">
              <q-btn
                color="blue"
                label="Edit"
                @click="openEditDialog(props.row)"
                size="sm"
                no-caps
              />
            </q-td>

            <q-td key="actionDelete" :props="props">
              <q-btn
                color="red"
                label="Delete"
                @click="openDeleteDialog(props.row)"
                size="sm"
                no-caps
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "KnightsEditor",
  components: {},
  data() {
    return {
      tab: "one",
      model: null,
      options: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
      initialPagination: {
        sortBy: "asc",
        descending: false,
        rowsPerPage: 20
      },
      data: [],
      show_dialog_addKnights: false,
      show_dialog_editKnights: false,
      show_dialog_deleteKnights: false,
      loading: false,
      editedIndex: -1,
      editedItem: {
        id: "",
        name: "",
        nickname: ""
      },
      id: "",
      name: "",
      nickname: "",
      birthday: "",
      weapons: {
        name: "",
        mod: "",
        attr: "",
        equipped: false
      },
      attributes: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      },
      keyAttribute: "",
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "nickname",
          align: "center",
          label: "Nickname",
          field: "nickname",
          sortable: true
        },
        {
          name: "birthday",
          label: "Birthday",
          field: "birthday",
          sortable: true
        },
        {
          name: "keyAttribute",
          label: "KeyAttribute",
          field: "keyAttribute",
          sortable: true
        },
        {
          name: "actionEdit",
          label: "",
          field: "actions"
        },
        {
          name: "actionDelete",
          label: "",
          field: "actions"
        }
      ]
    };
  },
  async created() {
    await this.getAllKnights();
  },

  methods: {
    async getAllKnights() {
      await this.$axios
        .get("http://localhost:5050/api/knights")
        .then((response) => {
          this.data = response.data;
        })
        .catch((err) => {
          window.console.error(err);
        });
    },
    openEditDialog(data) {
      this.editedItem = Object.assign({}, data);
      this.show_dialog_editKnights = true;
    },
    openDeleteDialog(data) {
      this.editedItem = Object.assign({}, data);
      this.show_dialog_deleteKnights = true;
    },

    async createKnights() {
      await this.$axios
        .post("http://localhost:5050/api/knights/", {
          name: this.name,
          nickname: this.nickname,
          birthday: this.birthday,
          weapons: [this.weapons],
          attributes: this.attributes,
          keyAttribute: this.keyAttribute
        })
        .then(() => {
          this.name = "";
          this.nickname = "";
          this.birthday = "";
          this.weapons = {
            name: "",
            mod: "",
            attr: "",
            equipped: false
          };
          this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
          };
          this.keyAttribute = "";
          this.getAllKnights();
        })
        .catch((err) => {
          window.console.error(err);
        });
    },
    async saveEdits() {
      await this.$axios
        .put(
          `http://localhost:5050/api/knights/${this.editedItem.id}`,
          this.editedItem
        )
        .then(() => {
          this.getAllKnights();
        })
        .catch((err) => {
          window.console.error(err);
        });
    },
    async deleteKnights() {
      await this.$axios
        .delete(`http://localhost:5050/api/knights/${this.editedItem.id}`)
        .then(() => {
          this.getAllKnights();
        })
        .catch((err) => {
          window.console.error(err, this.editedItem.id);
        });
    }
  }
};
</script>
