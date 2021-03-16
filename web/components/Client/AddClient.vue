<template>
  <div>
    <!--  -->
    <b-button v-b-modal.add-model variant="primary">Create Client</b-button>
    <!--  -->
    <b-modal
      id="add-model"
      ref="modal"
      size="lg"
      title="Add Client"
      hide-footer
      @hide="resetForm"
    >
      <b-form @submit.prevent="add">
        <b-form-group label="Client Id:" label-for="client_id">
          <b-form-input id="client_id" v-model="form.client_id"></b-form-input>
          <b-form-text id="client_id" class="mt-2">
            Default will be taken if blank
          </b-form-text>
        </b-form-group>
        <b-form-group label="Client Name:" label-for="client_name">
          <b-form-input
            id="client_name"
            v-model="form.client_name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Client Secret:" label-for="client_secret">
          <b-form-input
            id="client_secret"
            v-model="form.client_secret"
            minlength="6"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Scope:" label-for="scope">
          <b-form-input id="scope" v-model="form.scope"></b-form-input>
        </b-form-group>
        <b-form-group label="Redirect uris:" label-for="redirect_uris">
          <b-form-tags
            id="redirect_uris"
            v-model="form.redirect_uris"
            placeholder="https://example.com"
            remove-on-delete
            tag-variant="primary"
            tag-pills
          ></b-form-tags>
        </b-form-group>
        <b-form-group label="Request uris:" label-for="request_uris">
          <b-form-tags
            id="request_uris"
            v-model="form.request_uris"
            placeholder="https://example.com"
            remove-on-delete
            tag-variant="primary"
            tag-pills
          ></b-form-tags>
        </b-form-group>
        <b-form-group label="Grant Types:" label-for="grant_types">
          <b-form-tags
            id="grant_types"
            v-model="form.grant_types"
            placeholder=""
            remove-on-delete
            tag-variant="primary"
            tag-pills
          ></b-form-tags>
        </b-form-group>
        <b-form-group
          label="Allowed cors origins:"
          label-for="allowed_cors_origins"
        >
          <b-form-tags
            id="allowed_cors_origins"
            v-model="form.allowed_cors_origins"
            placeholder=""
            remove-on-delete
            tag-variant="primary"
            tag-pills
          ></b-form-tags>
        </b-form-group>
        <b-form-group label="Audience:" label-for="audience">
          <b-form-tags
            id="audience"
            v-model="form.audience"
            placeholder=""
            remove-on-delete
            tag-variant="primary"
            tag-pills
          ></b-form-tags>
        </b-form-group>
        <div class="text-center mb-1 pt-3">
          <b-button type="submit" variant="primary">Add</b-button>
        </div>
      </b-form>
    </b-modal>
    <!--  -->
  </div>
</template>
<script>
import addClient from '~/mixins/addClient.js'
export default {
  mixins: [addClient],
  data() {
    return {
      form: {
        client_id: '',
        client_name: '',
        client_secret: '',
        scope: '',
        redirect_uris: [],
        request_uris: [],
        grant_types: [],
        allowed_cors_origins: [],
        audience: [],
      },
    }
  },
  methods: {
    add() {
      this.addClient(this.form)
    },
    resetForm() {
      this.form = {}
    },
  },
}
</script>
