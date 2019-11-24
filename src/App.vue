<template>
    <div class="app">
        <div class="app__content">
            <TextInput
                    v-on:layout-cards="setCardsNum($event)"
                    v-on:reset-card-pack="resetCardPack"
                    v-on:hide-cards="hideCards">
            </TextInput>
            <CardsLayout
                    :cards="selectedCards"
                    :display="displayCards"
                    v-on:display-card-info="displayCardInfo"
            >
            </CardsLayout>
            <Sidebar :cardInfo="selectedCard"></Sidebar>
        </div>
    </div>
</template>

<script>
    import TextInput from './components/text-input';
    import CardsLayout from './components/cards-layout';
    import Sidebar from './components/sidebar';
    export default {
      name: 'App',
      components: {
        TextInput, CardsLayout, Sidebar
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
                  {
                      id: 5,
                      image: '',
                      title: 'BBB',
                      description: '....'
                  },
                  {
                      id: 6,
                      image: '',
                      title: 'CCC',
                      description: '....'
                  },
                  {
                      id: 7,
                      image: '',
                      title: 'DDD',
                      description: '....'
                  },
                  {
                      id: 8,
                      image: '',
                      title: 'EEE',
                      description: '....'
                  },
                  {
                      id: 9,
                      image: '',
                      title: 'FFF',
                      description: '....'
                  },
              ],
              displayCards: false,
              cardsNum: 0,
              question: '',
              selectedCards: [],
              selectedCard: null
          }
      },
      watch: {
          cardsNum(newValue) {
              this.getCardsPack(newValue);
          }
      },
      methods: {
          displayCardsLayout() {
              this.displayCards = true;
          },
          hideCards() {
              this.displayCards = false;
          },
          resetCardPack() {
              this.selectedCards = [];
          },
          setCardsNum(question) {
              if (question.toLowerCase() !== this.question.toLowerCase()) {
                  this.question = question;
                  this.generateRandomCardsNumber();
              } else {
                  this.displayCardsLayout();
              }
          },
          generateRandomCardsNumber() {
            this.cardsNum = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          },
          getCardsPack(cardsNumber) {
              for (let i = 0; i < cardsNumber; i++) {
                  this.selectedCards.push(this.getRandomCard());
              }
              this.displayCardsLayout();
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
          },
          displayCardInfo(selectedCard) {
              this.selectedCard = selectedCard;
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
