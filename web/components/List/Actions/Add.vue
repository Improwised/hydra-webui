<template>
  <div>
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide
      >Hello, world! This is a toast message.</b-toast
    >
    <b-button v-b-modal.add-model class="add-btn">Create Client</b-button>
    <b-modal id="add-model" ref="modal" title="Add Client" @ok="addModal">
      <form ref="form" @submit.prevent="add">
        <b-form-group
          label="Client Owner"
          label-for="name-input"
          invalid-feedback="owner is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.owner"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Client Name"
          label-for="name-input"
          :state="nameState"
          invalid-feedback="Client Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.client_name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Client Secret"
          label-for="name-input"
          :state="secretState"
          invalid-feedback="Client Secret is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.client_secret"
            min="6"
            :state="secretState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Expiry Time"
          label-for="name-input"
          invalid-feedback="Secret Expire is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.client_secret_expires_at"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Contact"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.contacts"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Subject type"
          label-for="name-input"
          invalid-feedback="Subject type is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.subject_type"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Terms of Service(Document URL)"
          label-for="name-input"
          invalid-feedback="Terms of service is required"
        >
          <b-form-input id="name-input" v-model="form.tos_uri"></b-form-input>
        </b-form-group>
        <b-form-group
          label="Policy"
          label-for="name-input"
          invalid-feedback="Policy URL is required"
        >
          <b-form-input
            id="name-input"
            v-model="form.policy_uri"
            required
          ></b-form-input>
        </b-form-group>
      </form>
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
