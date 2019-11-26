<template>
    <transition name="slide-fade">
        <div class="cards-layout" v-if="display">
            <div class="cards-layout__list">
                <div class="cards-layout-list">
                    <div class="cards-layout-list__item" v-for="(item, index) in cards">
                        <Card :itemInfo="item"
                              v-on:card-info="displayCardInfo($event)"
                        ></Card>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Card from './card';
    export default {
        name: "CardsLayout",
        props: [
            'cards',
            'display'
        ],
        components: { Card },
        data() {
            return {}
        },
        methods: {
            init() {

            },
            displayCardInfo(cardInfo) {
                this.$emit('display-card-info', cardInfo);
            }
        }
    }
</script>

<style lang="scss">
    .cards-layout {
        position: absolute;
        top: 90px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        pointer-events: none;
        &__list {
            display: flex;
            padding: 0 20px;
        }
    }
    .cards-layout-list {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0 -20px;
        &__item {
            margin: 0 10px 20px;
            pointer-events: auto;
        }
    }
    .slide-fade-leave-active {
        transition: all 0.3s ease;
    }
    .slide-fade-enter-active {
        transition: all 0.5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>
