  <template>
    <div class="container">
      <div class="header">
        <p class="title">
          <img src="../assets/img/banner_hydra.png" alt="Smiley face" height="74" width="361" />
        </p>
      </div>
      <div class="body">
        <div class="sub-header">
          <p>Client List</p>
        </div>
        <List ></List>
      </div>
    </div>
  </template>

  <script>
  import List from "../components/List/Index.vue";
  export default {
    components: {
      List
    },
    async asyncData({ store }) {
      await store.dispatch("getClientList");
      return {};
    }
  };
  </script>

  <style>
  .container {
    overflow: unset;
    background-color: #ffffff;
    padding: 3px 30px;
    width: 100%;
    min-width: 100%;
  }
  .title {
    font-size: 31px;
    margin-bottom: 0px;
  }
  .header {
    height: 80px;
  }
  .sub-header {
        margin: 0px;
      height: 64px;
      padding: 17px;
      font-size: 24px;
      font-weight: 500;
      color: #004084;
      border-bottom: 1px solid;
      margin-top: -1px;
  }
  </style>
