<template>
    <div class="cards-layout" :class="{ 'cards-layout_visible': display }">
        <div class="cards-layout__item" v-for="item in cards">
            <div class="card">
                <div class="card__title">{{ item.title }}</div>
                <div class="card__description">{{ item.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardsLayout",
        props: [
            'cards',
            'display'
        ],
        data() {
            return {}
        },
        methods: {
            init() {

            }
        }
    }
</script>

<style lang="scss">
    .cards-layout {
        opacity: 0;
        transition: all 0.3s;
    }
    .cards-layout_visible {
        opacity: 1;
    }
</style>
