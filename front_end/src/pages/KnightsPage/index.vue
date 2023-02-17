<template>
  <q-page padding>
    <KnightsAPI></KnightsAPI>
  </q-page>
</template>

<script>
import KnightsAPI from "./KnightsAPI";

export default {
  name: "UserEditor",
  components: { KnightsAPI },
  data() {
    return {};
  }
};
</script>
