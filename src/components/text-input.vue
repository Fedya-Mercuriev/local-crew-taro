<template>
    <form class="form form_center"
          :class="{ 'stick-top': questionSubmitted }"
          @submit.prevent="triggerLayOutCards"
          action="#"
          method="get">
        <div class="form-group">
            <label class="field" :class="{ 'shrink-left': questionValid && !questionSubmitted }">
                <span class="field__label" :class="{ 'is-visible': label.length }">{{ label }}</span>
                <span class="field__main"></span>
                <span class="field__indicator"></span>
                <input class="field-input field__input"
                       autocomplete="off"
                       @focus="disapproveQuestion"
                       v-model="question" type="text"
                       name="question" value=""
                       placeholder="На что будем гадать?">
            </label>
            <button type="submit"
                    class="button button_stick_right button_modal button_red"
                    :class="{ 'button_hidden': !questionValid || questionSubmitted }">Давай</button>
        </div>
    </form>
</template>
<script>
    export default {
        name: "TextInput",
        data() {
            return {
                input: null,
                question: '',
                label: '',
                questionValid: false,
                questionSubmitted: false,
                errors: {
                    wrongLocale: 'По-русски!',
                    insufficientCharactersCount: 'Коротковат вопрос...'
                }
            }
        },
        mounted() {
          this.input = this.$el.querySelector('input');
        },
        computed: {
            tidyQuestion() {
                return this.question.replace(/[!?@#$%^&*)(+=./_\\\-\s]+/g, '');
            }
        },
        watch: {
            question(newQuestion) {
                try {
                    if (this.validateQuestion(this.tidyQuestion)) {
                        this.enableSubmit();
                    }
                } catch(e) {
                    this.disableSubmit();
                    this.updateLabel(e.message);
                }
            }
        },
        methods: {
            validateQuestion(question) {
                if (question.length > 0 && question.length < 4) {
                    throw new Error(this.errors.insufficientCharactersCount);
                } else if (question.length === 0) {
                    throw new Error('');
                } else if (this.getStringLocale(question) !== 'ru') {
                    throw new Error(this.errors.wrongLocale);
                } else if (question.length > 50) {
                    this.updateLabel('Серьезно, остановись');
                    return true;
                } else if (question.length > 25) {
                    this.updateLabel('Воу-воу! Полегче!');
                    return true;
                } else {
                    return true;
                }
            },
            updateLabel(message) {
                this.label = message;
            },
            resetLabel() {
                this.label = '';
            },
            getStringLocale(question) {
                if (/^[\u0400-\u04FF]+/g.test(question) && !/\w+/.test(question)) {
                    return 'ru';
                }
                return 'other';
            },
            triggerLayOutCards() {
                if (!this.questionValid) return;
                this.input.blur();
                this.resetLabel();
                this.questionSubmitted = true;
                this.$emit('layout-cards', this.question);
            },
            disableSubmit() {
                this.questionValid = false;
            },
            enableSubmit() {
                this.questionValid = true;
                this.updateLabel('Похоже на вопрос. Делаю расклад?');
            },
            disapproveQuestion() {
                if (this.questionSubmitted) {
                    this.questionSubmitted = false;
                    this.enableSubmit();
                    this.$emit('hide-cards');
                }
            }
        }
    }
</script>

<style lang="scss">
    .form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        z-index: 100;
        min-width: 280px;
        max-width: 1240px;
        transition: all 0.3s;
    }
    .form.stick-top {
        top: 0;
    }
    .form-group {
        position: relative;
        display: flex;
    }
    .field {
        position: relative;
        z-index: 10;
        box-sizing: border-box;
        width: 100%;
        transition: all 0.3s;
        &:hover {
            &__main {
                box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            }
        }
        &__main {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
        &__main, &__indicator {
            pointer-events: none;
        }
        &__placeholder {
            display: block;
            @media screen and (max-width: 320px) {
                text-align: center;
            }
        }
        &__label {
            position: absolute;
            top: 0;
            left: 0;
            transform: translateY(0);
            font-size: 12px;
            font-family: 'Roboto', sans-serif;
            opacity: 0;
            transition: all 0.3s;
        }
        &__label.is-visible {
            transform: translateY(-20px);
            opacity: 1;
        }
    }
    .field.shrink-left {
        width: 73%;
    }
    .field-input {
        box-sizing: border-box;
        display: block;
        width: 100%;
        padding: 15px;
        background-color: #FFFFFF;
        border-color: transparent;
        -webkit-appearance: none;
        outline: none;
    }
    .button {
        box-sizing: border-box;
        padding: 16px;
        border: 0;
        border-radius: 8px;
        font-size: 13px;
        font-family: 'Roboto', sans-serif;
        /*-webkit-appearance: none;*/
        cursor: pointer;
        transition: all 0.35s;
    }
    .button_hidden {
        opacity: 0;
    }
    .button_stick_right {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 0;
    }
</style>
