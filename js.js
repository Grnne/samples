Vue.createApp({})
    .component("PhoneBook", {
        data() {
            return {
                myInputs: [
                    {
                        id: 1,
                        name: "FirstName",
                        invalidMessage: "This field is required.",
                        validMessage: "Good1.",
                        value: ''
                    },
                    {
                        id: 2,
                        name: "must be>3<10",
                        invalidMessage: "This field must be longer than 3 characters.",
                        validMessage: "Good2.",
                        value: ''
                    },
                    {
                        id: 3,
                        name: "Dummy1",
                        invalidMessage: "This field is required.",
                        validMessage: "Good3.",
                        value: ''
                    },
                    {
                        id: 4,
                        name: "Dummy2",
                        invalidMessage: "This field is required.",
                        validMessage: "Good4.",
                        value: ''
                    }
                ],
                submitted: false,
                returnedInputValue: ""
            };
        },
        computed: {
            inputValidity() {
                return this.myInputs.map(input => ({
                    ...input,
                    isValid: this.validateInput(input)
                }));
            }
        },
        methods: {
            validateInput(input) {
                if (input.name === "must be>3<10") {
                    return this.validateCustom(input);
                }
                return input.value.trim() !== "";
            },
            validateCustom(input) {
                // Тут должна быть логика поиска и проверки номера телефона уже добавленного
                // из коллекции contactsList контактов, которую помоему надо в глобал стейт пихать через пинью
                // ну а в нашем случае опять эмиты из листа в фонбук и бинд в пропсы
                if (input.value.length < 4) {
                    input.invalidMessage = "Must be longer than 3 characters.";
                    return false;
                } else if (input.value.length > 10) {
                    input.invalidMessage = "Must be shorter than 10 characters.";
                    return false;
                }
                input.invalidMessage = "";
                return true;
            },
            handleSubmit() {
                this.submitted = true;

                const validity = this.inputValidity;

                if (validity.every(input => input.isValid)) {
                    alert("Form submitted successfully!");
                    this.myInputs.forEach(i => i.value = "");
                    this.submitted = false; // Reset submission state
                } else {
                    alert("Please fix the errors in the form.");
                }
            },
            // временно заглушил
            getState(input, index) {
                if (!this.inputValidity[index].isValid && this.submitted) {
                    return 'is-valid';
                }

                if (this.inputValidity[index].isValid && this.submitted) {
                    return 'is-invalid';
                }

                return "";
            }
        },
        template: `
          <form @submit.prevent="handleSubmit" class="needs-validation" novalidate>
            <div v-for="(input, index) in myInputs" :key="input.id">
              <label :for="input.name">{{ input.name }}</label>
              <my-input
                  type="text"
                  :value="input.value"
                  @update:value="input.value = $event"
                  :id="input.name"
                  :class="{'is-invalid': !inputValidity[index].isValid && submitted, 'is-valid': inputValidity[index].isValid && submitted}"
                  class="form-control"
                  required
              />
              <!--Выше я не совсем понял как именно оно подало нужный инпут через индекс, но работает -->
              <div class="valid-feedback">{{ input.validMessage }}</div>
              <div class="invalid-feedback">{{ input.invalidMessage }}</div>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        `
    })
    .component("myInput", {
        // пустил темп для прверки

        props: {
            // messageState: {
            //   type: String,
            //   required: true
            // },
            // temp: {
            //     type: Object,
            //     required: true
            // },
            value: {
                type: String,
                default: ""
            }
        },

        emits: [
            "update:value",
        ],
        template:
            `<input
                :value="value"
                @input="(event) => {
                    // в тут проверял стейты, поэтому эмит такой
                    // console.log(this.messageState);
                    $emit('update:value', event.target.value)}"
            />
            `
    })
    .mount("#app");