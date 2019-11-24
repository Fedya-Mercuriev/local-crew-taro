<template>
    <div class="card" @click="getCardInfo" :data-index="index">
        <div class="card__title">{{ itemInfo.title }}</div>
        <div class="card__description">{{ itemInfo.description }}</div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: [
            'itemInfo',
            'index'
        ],
        data() {
            return {

            }
        },
        methods: {
            getCardInfo() {
                this.$emit('card-info', this.itemInfo);
            }
        }
    }
</script>

<style lang="scss">
    .card {
        width: 150px;
        height: 230px;
        border-radius: 6px;
        background: pink;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
            transform: scale(0.95);
        }
    }
</style>
