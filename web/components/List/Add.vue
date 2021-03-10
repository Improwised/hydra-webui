<template>
  <div>
    <b-button v-b-modal.add-model class="add-btn" variant="primary"
      >Create Client</b-button
    >
    <b-modal id="add-model" ref="modal" hide-footer title="Add Client">
      <b-form @submit.prevent="addModal">
        <b-form-group label="Client Owner" label-for="owner">
          <b-form-input
            id="owner"
            v-model="form.owner"
            invalid-feedback="Owner is required"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Client Name"
          label-for="client_name"
          :state="nameState"
          invalid-feedback="Client Name is required"
        >
          <b-form-input
            id="client_name"
            v-model="form.client_name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Client Secret"
          label-for="client_secret"
          :state="secretState"
          invalid-feedback="Client Secret is required"
        >
          <b-form-input
            id="client_secret"
            v-model="form.client_secret"
            min="6"
            :state="secretState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Expiry Time"
          label-for="client_secret_expires_at"
          invalid-feedback="Secret Expire is required"
        >
          <b-form-input
            id="client_secret_expires_at"
            v-model="form.client_secret_expires_at"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Contact" label-for="contacts">
          <b-form-input id="contacts" v-model="form.contacts"></b-form-input>
        </b-form-group>
        <b-form-group label="Subject type" label-for="subject_type">
          <b-form-input
            id="subject_type"
            v-model="form.subject_type"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Terms of Service(Document URL)"
          label-for="tos_uri"
        >
          <b-form-input id="tos_uri" v-model="form.tos_uri"></b-form-input>
        </b-form-group>
        <b-form-group label="Policy" label-for="policy_uri">
          <b-form-input
            id="policy_uri"
            v-model="form.policy_uri"
          ></b-form-input>
        </b-form-group>
        <div class="text-center mb-1 pt-3">
          <b-button type="submit" variant="primary">Add</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import addClient from '@/mixins/add.js'
export default {
  mixins: [addClient],
  data() {
    return {
      form: {
        client_name: '',
        client_secret: '',
        owner: '',
        subject_type: '',
        policy_uri: '',
        backchannel_logout_session_required: true,
        tos_uri: '',
        client_secret_expires_at: 0,
        contacts: null,
      },
      nameState: null,
      secretState: null,
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.secretState = valid
      return valid
    },
    addModal(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.add()
    },
    add() {
      this.form.client_secret_expires_at = parseInt(
        this.form.client_secret_expires_at
      )
      this.addClient(this.form)
    },
  },
}
</script>
