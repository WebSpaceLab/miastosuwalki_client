<script setup>
const props = defineProps({
  history: {
    type: Object,
    require: true,
    default: () => {},
  },
  sport: {
    type: Object,
    require: true,
    default: () => {},
  },
  nature: {
    type: Object,
    require: true,
    default: () => {},
  },
  town: {
    type: Object,
    require: true,
    default: () => {},
  },
  technology: {
    type: Object,
    require: true,
    default: () => {},
  },
  culture: {
    type: Object,
    require: true,
    default: () => {},
  },
  ads: {
    type: Object,
    require: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
const isTooltip = ref(false);
// const loading = ref(true);
// let showTopBar = ref(false);
// const top = ref([]);
</script>

<template>
  <!-- ====== Hero Section Start -->
  <section
    id="hero"
    class="relative container mx-auto px-10 mt-10 mb-6 box-border"
  >
    <div
      v-if="ads.top"
      class="relative rounded-lg h-20 sm:h-30 md:h-40 lg:h-60 xl:h-80 2xl:h-96 mb-8"
    >
      <x-slider-carousel
        :items="ads.top"
        :indicator="false"
        :interval-time="7000"
      >
        <template
          v-for="(item, index) in ads.top"
          :key="index"
          #[`slide-${index}`]
        >
          <nuxtLink
            @mouseover="isTooltip = true"
            @mouseleave="isTooltip = false"
            class="w-auto relative h-full flex justify-center items-center"
            :href="item.targetUrl"
            rel="nofollow"
            alt="ads tobar"
            target="_blank"
          >
            <img
              :src="item.previewUrl"
              :alt="item.name"
              class="w-auto h-full object-cover rounded-lg"
            />

            <x-tooltip
              class="hidden lg:flex top-0 left-0 w-[80%] text-white text-sm lg:text-lg rounded-lg p-2"
              v-if="item.description && isTooltip"
              :text="item.description"
            />
          </nuxtLink>
        </template>
      </x-slider-carousel>
    </div>

    <div
      class="flex h-full flex-col lg:flex-row justify-center items-center box-border"
    >
      <div
        class="w-full h-full hidden lg:grid lg:grid-cols-3 xl:grid-rows-3 xl:grid-cols-4 gap-8 box-border"
      >
        <div
          class="relative w-full max-h-120 lg:col-span-2 lg:row-span-2 rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticle
            v-if="town"
            :article="town"
            :loading="town.isLoading"
            class="hidden lg:flex"
          >
            <template #decoration>
              <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                <DecorationDots />
              </span>
            </template>
          </CardArticle>

          <CardArticleMedium
            v-if="history"
            :article="history"
            class="flex lg:hidden"
            :loading="history.isLoading"
          />
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <CardArticleMedium
            v-if="sport"
            :article="sport"
            :loading="sport.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <CardArticleMedium
            v-if="nature"
            :article="nature"
            :loading="nature.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full max-h-120 lg:col-span-2 lg:row-span-2 rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticle
            v-if="history"
            :article="history"
            :loading="history.isLoading"
          >
            <template #decoration>
              <span
                class="absolute hidden lg:flex lg:-right-5 -bottom-5 z-[-1]"
              >
                <DecorationDots />
              </span>
            </template>
          </CardArticle>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <CardArticleMedium
            v-if="technology"
            :article="technology"
            :loading="technology.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <CardArticleMedium
            v-if="culture"
            :article="culture"
            :loading="culture.isLoading"
          ></CardArticleMedium>
        </div>
      </div>

      <div
        class="w-full grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 box-border"
      >
        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticleMedium
            v-if="town"
            :article="town"
            :loading="town.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticleMedium
            v-if="sport"
            :article="sport"
            :loading="sport.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticleMedium
            v-if="nature"
            :article="nature"
            :loading="nature.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticleMedium
            v-if="history"
            :article="history"
            :loading="history.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticleMedium
            v-if="technology"
            :article="technology"
            :loading="technology.isLoading"
          ></CardArticleMedium>
        </div>

        <div
          class="relative w-full h-full rounded-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <CardArticleMedium
            v-if="culture"
            :article="culture"
            :loading="culture.isLoading"
          ></CardArticleMedium>
        </div>
      </div>

      <div
        v-if="ads.sidebar"
        class="relative rounded-lg w-full max-h-[600px] md:max-w-[300px] overflow-hidden mt-8 lg:mt-0 lg:ml-8"
      >
        <x-slider-carousel
          :items="ads.sidebar"
          :indicator="false"
          :interval-time="7000"
        >
          <template
            v-for="(item, index) in ads.sidebar"
            :key="index"
            #[`slide-${index}`]
          >
            <a
              class="w-auto h-full flex justify-center items-center"
              :href="item.targetUrl"
              rel="nofollow"
              alt="ads tobar"
              target="_blank"
            >
              <img
                :src="item.previewUrl"
                :alt="item.name"
                class="w-full lg:h-full object-cover"
              />
            </a>
          </template>
        </x-slider-carousel>
      </div>
      <!-- 
             -->
    </div>
  </section>

  <!-- ====== Hero Section End -->
</template>
