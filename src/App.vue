<template>
    <div class="app">
        <div class="app__content">
            <TextInput v-on:layout-cards="showSome($event)"></TextInput>
            <CardsLayout></CardsLayout>
        </div>
    </div>
</template>

<script>
    import TextInput from './components/text-input';
    import CardsLayout from './components/cards-layout';
    export default {
      name: 'App',
      components: {
        TextInput, CardsLayout
      },
      data() {
          return {
              cards: [

              ],
              curdsNum: 0
          }
      },
      methods: {
        showSome(maxCards) {
          alert(maxCards)
        },
        getRandomCards() {

        }
      }
    }
</script>

<style lang="scss">
    html, body, .app-wrapper {
        position: relative;
        margin: 0;
        height: 100%;
    }
    .app {
        height: 100%;
        padding: 20px 0;
        &__content {
            position: relative;
            height: 100%;
        }
    }
</style>
