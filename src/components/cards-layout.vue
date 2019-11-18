<template>
    <div class="cards-layout">
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
            'cards'
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

</style>
