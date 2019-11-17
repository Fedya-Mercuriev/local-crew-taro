<template>
    <div class="app">
        <div class="app__content">
            <TextInput v-on:layout-cards="setCardsNum($event)"></TextInput>
            <CardsLayout :cards="selectedCards"></CardsLayout>
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
                  {
                      id: 1,
                      image: '',
                      title: 'XXX',
                      description: '....'
                  },
                  {
                      id: 2,
                      image: '',
                      title: 'YYY',
                      description: '....'
                  },
                  {
                      id: 3,
                      image: '',
                      title: 'ZZZ',
                      description: '....'
                  },
                  {
                      id: 4,
                      image: '',
                      title: 'AAA',
                      description: '....'
                  },

              ],
              cardsNum: 0,
              selectedCards: []
          }
      },
      watch: {
          cardsNum(newValue) {
              this.getCardsPack(newValue);
          }
      },
      methods: {
          setCardsNum(cardsNumber) {
              this.cardsNum = cardsNumber;
          },
        getCardsPack(cardsNumber) {
              for (let i = 0; i < cardsNumber; i++) {
                  this.selectedCards.push(this.getRandomCard());
              }
        },
          getRandomCard() {
              const index = Math.floor(Math.random() * (this.cards.length - 1 + 1) + 1) - 1;
              let selectedCard = this.cards[index];

              if (this.cardIsUnique(selectedCard)) {
                  return selectedCard;
              } else {
                  selectedCard = this.getRandomCard();
              }
              return selectedCard;
          },
          cardIsUnique(card) {
              let isUnique = true;
              if (!this.selectedCards.length) return isUnique;
              for (let i = 0; i < this.selectedCards.length; i++) {
                  if (card.id === this.selectedCards[i].id) {
                      isUnique = false;
                      break;
                  }
              }
              return isUnique;
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
        box-sizing: border-box;
        height: 100%;
        padding: 20px 0;
        &__content {
            position: relative;
            height: 100%;
        }
    }
</style>
