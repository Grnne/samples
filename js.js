Vue.createApp({})
    .component("PhoneBook", {
        data() {
            return {
                mockPhones: ["1", "2", "3", "4", "5"],
                myInputs: [
                    {
                        id: 1,
                        name: "Name",
                        invalidMessage: "This field is required.",
                        validMessage: "Good1.",
                        value: '',
                        validationMethod: this.validateDefault
                    },
                    {
                        id: 2,
                        name: "Phone",
                        invalidMessage: "This field must be longer than 3 characters.",
                        validMessage: "Good2.",
                        value: '',
                        validationMethod: this.validatePhone
                    },
                    {
                        id: 3,
                        name: "Dummy1",
                        invalidMessage: "This field is required.",
                        validMessage: "Good3.",
                        value: '',
                        validationMethod: this.validateDefault
                    },
                    {
                        id: 4,
                        name: "Dummy2",
                        invalidMessage: "This field is required.",
                        validMessage: "Good4.",
                        value: '',
                        validationMethod: this.validateDefault
                    }
                ],
                submitted: false,
            };
        },
        methods: {
            getInputClass(input) {
                if (this.submitted) {
                    return input.validationMethod(input) ? 'is-valid' : 'is-invalid';
                }
                return "";
            },
            validateDefault(input) {
                return input.value.trim() !== "";
            },
            validatePhone(input) {
                if (this.mockPhones.some(item => item.trim() === input.value.trim())) {
                    input.invalidMessage = "Phone already exists.";
                    return false;
                } else if (input.value.length < 7) {
                    input.invalidMessage = "Must be longer than 7 characters.";
                    return false;
                }
                input.invalidMessage = "";
                return true;
            },
            handleSubmit() {
                this.submitted = true;

                if (this.myInputs.every(input => this.validateDefault(input))) {
                    alert("Form submitted successfully!");
                    this.myInputs.forEach(i => i.value = "");
                    this.submitted = false; // Reset submission state
                } else {
                    alert("Please fix the errors in the form.");
                }
            },
        },
        template: `
          <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
            <div v-for="(input) in myInputs" :key="input.id">
              <my-input
                  :input="input"
                  :validationClass="getInputClass(input)"
                  @update:value="input.value = $event"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        `
    })
    .component("myInput", {
        props: {
            validationClass: {
                type: String,
                default: ""
            },
            input: {
                type: Object,
                required: true
            },
        },
        template: `
          <div>
            <label :for="input.name">{{ input.name }}</label>
            <input
                :value="input.value"
                :class="validationClass"
                class="form-control"
                type="text"
                required
                @input="$emit('update:value', $event.target.value)"
            />
            <div class="valid-feedback">{{ input.validMessage }}</div>
            <div class="invalid-feedback">{{ input.invalidMessage }}</div>
          </div>
        `
    })
    .mount("#app");