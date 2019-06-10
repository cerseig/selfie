<template>
  <div class="about">
    <div class="about__container">
      <img class="about__illustration" :src="`${publicPath}/img/team.png`">
      <p class="about__message">{{ $t('about.message') }}</p>
      <h2 class="about__title">{{ $t('about.team.title') }}:</h2>
      <ul class="about__list">
        <li class="about__item"><a href="https://leatanda.fr/" target="_blank">Léa TANDA _ Développeuse</a></li>
        <li class="about__item"><a href="https://circegrand.fr/#/" target="_blank">Circé GRAND _ Développeuse</a></li>
        <li class="about__item"><a href="http://justine-lenouvel.fr/" target="_blank">Justine LENOUVEL _ Designer</a></li>
        <li class="about__item"><a href="http://anastasiiagulenko.com/" target="_blank">Anastasiia GULENKO _ Designer</a></li>
      </ul>
      <h2 class="about__title">{{ $t('about.acknowledgements.title') }}:</h2>
      <p class="about__message">{{ $t('about.acknowledgements.message') }}</p>
      <img class="about__school-logos" :src="`${publicPath}/img/logos/logo-gobelins-cci.png`">
    </div>
  </div>
</template>

<script>

export default {
  name: 'About',
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}

</script>

<style scoped lang="scss">

  .about {
    padding: 5rem 0;

    width: 100%;
    height: 100%;

    position: relative;

    background-color: $color__white;
    overflow-y: scroll;

    &__container {
      max-width: 80%;
      margin: 0 auto;
    }

    &__illustration {
      width: 100%;
      max-width: 680px;
      margin-bottom: 3rem;
    }

    &__school-logos {
      width: 150px;
    }

    &__title {
      margin: 6rem 0 3rem 0;

      font-size: 3.5rem;
      font-weight: 700;
    }

    &__message {
      font-size: 1.8rem;
      line-height: 3rem;
    }

    &__item {
      font-size: 2rem;
      font-weight: 300;
      line-height: 3.5rem;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px)  {
    .about {
      padding: 5rem 0;

      &__container {
        max-width: 80%;
      }

      &__illustration {
        width: 80%;
        margin-bottom: 4rem;
      }

      &__title {
        margin: 8rem 0 4rem 0;

        font-size: 5rem;
      }

      &__message {
        font-size: 2.2rem;
        line-height: 3.5rem;
      }

      &__item {
        font-size: 2.2rem;
        line-height: 3.5rem;
      }
    }
  }

</style>
