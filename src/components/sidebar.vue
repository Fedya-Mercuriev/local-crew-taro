<template>
    <transition name="sidebar-slide">
        <div v-if="display" class="sidebar">
            <div class="sidebar__content">
                <div class="sidebar__title">{{ cardInfo.title }}</div>
                <div class="sidebar__description">{{ cardInfo.description }}</div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Sidebar",
        props: [
            'cardInfo'
        ],
        data() {
            return {
                info: this.cardInfo
            }
        },
        computed: {
            display() {
                return typeof this.cardInfo === 'object' && this.cardInfo !== null;
            }
        },
    }
</script>

<style lang="scss">
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        width: 350px;
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }
    .sidebar-slide-enter-active {
        transform: translateX(0);
        transition: all 0.3s ease;
    }
    .sidebar-slide-leave-active {
        transition: all 0.3s ease;
    }
</style>
