<template>
    <div class="app-wrapper">
        <TextInput></TextInput>
    </div>
</template>

<script>
    import TextInput from './components/text-input';
    export default {
        name: 'App',
        components: {
            TextInput
        }
    }
</script>

<style lang="scss">
    html, body, .app-wrapper {
        position: relative;
        margin: 0;
        height: 100%;
    }
</style>
