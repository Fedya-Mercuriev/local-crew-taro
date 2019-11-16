<template>
    <form class="form form_center"
          :class="{ 'stick-top': questionConfirmed }"
          @submit.prevent="triggerLayOutCards"
          action=""
          method="get">
        <div class="form-group">
            <label js-text-input class="field" :class="{ 'shrink-left': questionValid }">
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
                    :class="{ 'button_hidden': !questionValid }">Давай</button>
        </div>
    </form>
</template>
<script>
    export default {
        name: "TextInput",
        data() {
            return {
                question: '',
                label: '',
                questionValid: false,
                timerId: null,
                questionConfirmed: false
            }
        },
        computed: {
            processedQuestion() {
                return this.question.replace(/[!?@#$%^&*)(+=./_\\\-\s]+/g, '');
            }
        },
        watch: {
            question(newQuestion) {
                const processedQuestion = this.processedQuestion;
                this.questionConfirmed = false;
                if (processedQuestion.length > 0 && processedQuestion.length <= 4) {
                    this.cancelRequestConfirm();
                    this.label = 'Коротковат вопрос...';
                } else if (processedQuestion.length === 0) {
                    this.label = '';
                    this.cancelRequestConfirm();
                } else if (this.getStringLocale() !== 'ru') {
                    clearTimeout(this.timerId);
                    this.label = 'По-русски!';
                } else if (processedQuestion.length > 50) {
                    this.label = 'Серьезно, остановись';
                } else if (processedQuestion.length > 25) {
                    this.label = 'Воу-воу! Полегче!';
                } else {
                    clearTimeout(this.timerId);
                    this.timerId = setTimeout(() => {
                        this.requestInputConfirm();
                    },300)
                }
            }
        },
        methods: {
            getStringLocale() {
                if (/^[\u0400-\u04FF]+/g.test(this.question) && !/\w+/.test(this.question)) {
                    return 'ru';
                }
                return 'other';
            },
            triggerLayOutCards() {
                this.$el.querySelector('input').blur();
                this.questionConfirmed = true;
                this.cancelRequestConfirm();
                this.label = '';
                if (this.questionValid) {
                    console.log('хуй');
                    this.$emit('layout-cards', Math.floor(Math.random() * (4 - 1 + 1) + 1));
                }
            },
            cancelRequestConfirm() {
                clearTimeout(this.timerId);
                this.questionValid = false;
            },
            requestInputConfirm() {
                this.questionValid = true;
                this.label = 'Похоже на вопрос. Делаю расклад?'
            },
            disapproveQuestion() {
                if (this.questionConfirmed) {
                    this.requestInputConfirm();
                    this.questionConfirmed = false;
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
        background-color: transparent;
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
