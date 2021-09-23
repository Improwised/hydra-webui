<template>
  <div>
    <!--  -->
    <b-modal
      :id="id"
      ref="modal"
      size="lg"
      title="Add Client"
      hide-footer
      @hide="resetForm"
    >
      <b-form @submit.prevent="action">
        <b-form-group label="Client Id:" label-for="client_id">
          <b-form-input
            id="client_id"
            v-model="form.client_id"
            :disabled="type === 'Edit'"
          ></b-form-input>
          <b-form-text id="client_id">
            Default value will be taken if blank
          </b-form-text>
        </b-form-group>
        <b-form-group label="Client Name:" label-for="client_name">
          <b-form-input
            id="client_name"
            v-model="form.client_name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          v-if="type === 'Add'"
          label="Client Secret:"
          label-for="client_secret"
        >
          <b-form-input
            id="client_secret"
            v-model="form.client_secret"
            minlength="6"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Token Endpoint Auth method">
          <b-form-select
            v-model="form.token_endpoint_auth_method"
            :options="[
              { value: 'client_secret_post', text: 'client_secret_post' },
              { value: 'client_secret_basic', text: 'client_secret_basic' },
              {
                value: 'private_key_jwt',
                text: 'private_key_jwt',
              },
            ]"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          v-if="form.token_endpoint_auth_method === 'private_key_jwt'"
          label="Jwks:"
          label-for="Jwks"
        >
          <b-form-input
            id="Jwks"
            v-model="form.jwks"
            type="Object"
            placeholder="{}"
          ></b-form-input>
          <b-form-text id="input-live-help"
            >Input type must be type Object
            <a href="https://www.ory.sh/hydra/docs/reference/api/#tag/public"
              >Refer this.</a
            ></b-form-text
          >
        </b-form-group>
        <b-form-group
          v-if="form.token_endpoint_auth_method === 'private_key_jwt'"
          label="Jwk URI:"
          label-for="Jwk URI"
        >
          <b-form-input id="Jwk URI" v-model="form.jwks_uri"></b-form-input>
        </b-form-group>
        <b-form-group label="Scope:" label-for="scope">
          <b-form-input id="scope" v-model="form.scope"></b-form-input>
        </b-form-group>
        <b-form-group label="Redirect uris:" label-for="redirect_uris">
          <b-form-tags
            id="redirect_uris"
            v-model="form.redirect_uris"
            placeholder="https://example.com"
            :tag-validator="validator"
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
            :tag-validator="validator"
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
            :tag-validator="validator"
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
          <b-button type="submit" variant="primary">{{ type }}</b-button>
        </div>
      </b-form>
    </b-modal>
    <!--  -->
  </div>
</template>
<script>
import addClient from "@/mixins/addClient.js";
import editClient from "@/mixins/editClient.js";
export default {
  mixins: [addClient, editClient],
  props: {
    id: {
      type: String,
      default: "add-modal",
    },
    type: {
      type: String,
      default: "Add",
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: Object.assign({}, this.formData),
    };
  },
  watch: {
    formData(newvalue) {
      this.form = Object.assign({}, newvalue);
    },
  },
  methods: {
    action() {
      if (this.type === "Add") {
        this.addClient(this.form);
      } else {
        this.editClient(this.form);
      }
    },
    resetForm() {
      if (this.type === "Add") {
        this.form = {};
      }
    },
    validator(tag) {
      const pattern = "^(http|https)://"; // eslint-disable-line
      const regexp = new RegExp(pattern);
      return regexp.test(tag);
    },
  },
};
</script>
