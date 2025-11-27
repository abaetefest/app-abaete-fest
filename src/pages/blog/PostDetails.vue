<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-1'" class="min-h-screen full-width">
    <div class="container q-pa-md">

      <!-- Error state -->
      <div v-if="error" class="row justify-center q-py-xl">
        <div class="col-12 col-md-8">
          <q-banner class="bg-negative text-white rounded-borders shadow-2">
            <template #avatar>
              <q-icon name="mdi-alert-circle" size="48px" />
            </template>
            <div class="text-h6 q-mb-sm">Erro ao carregar o artigo</div>
            <div class="text-body2">
              Não foi possível carregar o artigo. Por favor, tente novamente mais tarde.
            </div>
            <template #action>
              <q-btn
                flat
                color="white"
                label="Voltar para Blog"
                icon="mdi-arrow-left"
                :to="{ name: 'blog' }"
                no-caps
              />
            </template>
          </q-banner>
        </div>
      </div>

      <!-- Skeleton loading state -->
      <div v-if="loading && !error" class="row justify-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="skeleton-container">
            <!-- Skeleton header -->
            <q-skeleton type="text" height="48px" class="q-mb-md" style="width: 75%;" />
            <q-skeleton type="text" height="24px" class="q-mb-lg" style="width: 30%;" />
            <!-- Skeleton featured image -->
            <q-skeleton height="400px" class="q-mb-lg rounded-borders" style="width: 100%;" />
            <!-- Skeleton content -->
            <q-skeleton type="text" class="q-mb-sm" style="width: 100%;" />
            <q-skeleton type="text" class="q-mb-sm" style="width: 100%;" />
            <q-skeleton type="text" class="q-mb-sm" style="width: 80%;" />
            <q-skeleton type="text" class="q-mb-sm" style="width: 100%;" />
            <q-skeleton type="text" class="q-mb-sm" style="width: 90%;" />
          </div>
        </div>
      </div>

      <!-- Article content -->
      <article v-if="post && !loading" class="row justify-center">
        <div class="col-12 col-md-10 col-lg-8">
          <!-- Post Header -->
          <header class="q-mb-lg">
            <h1
              class="text-h5 text-weight-bold q-mb-md"
              :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
              v-html="post.title.rendered"
            ></h1>

            <div class="row items-center justify-between q-mb-md">
              <div class="col-auto">
                <div class="row items-center text-grey-7">
                  <q-icon name="mdi-calendar-outline" size="20px" class="q-mr-xs" />
                  <span class="text-body2">{{ formatDate(post.date) }}</span>
                </div>
              </div>

              <!-- Share Buttons -->
              <div class="col-auto">
                <ShareButtons
                  v-if="post"
                  :title="getPlainText(post.title.rendered)"
                  :url="currentPageUrl"
                />
              </div>
            </div>
          </header>

          <!-- Featured Image -->
          <figure v-if="post.featured_media_url" class="q-mb-lg">
            <q-img
              :src="post.featured_media_url"
              :alt="getPlainText(post.title.rendered)"
              class="rounded-borders shadow-2"
              style="max-height: 500px;"
              fit="cover"
            >
              <template #loading>
                <q-skeleton class="full-width full-height" />
              </template>
            </q-img>
          </figure>

          <!-- Post Content -->
          <q-card
            flat
            class="q-mb-lg q-pa-lg"
            :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
          >
            <div
              class="post-content text-body1"
              :class="$q.dark.isActive ? 'text-grey-3' : 'text-grey-9'"
              v-html="post.content.rendered"
            ></div>
          </q-card>

          <!-- Post Footer -->
          <footer class="q-mt-xl q-pt-lg border-top">
            <!-- Tags -->
            <div v-if="post.tags && post.tags.length > 0" class="q-mb-lg">
              <div class="row items-center q-gutter-sm">
                <q-icon name="mdi-tag-multiple" size="24px" color="primary" />
                <q-chip
                  v-for="tag in post.tags"
                  :key="tag"
                  color="primary"
                  text-color="white"
                  icon="mdi-tag"
                  class="q-px-md"
                >
                  {{ tag }}
                </q-chip>
              </div>
            </div>

            <!-- Back to blog button -->
            <q-btn
              color="primary"
              label="Voltar para o Blog"
              icon="mdi-arrow-left"
              :to="{ name: 'blog' }"
              no-caps
              rounded
              unelevated
              class="q-mb-xl"
            />

            <!-- Related Posts -->
            <RelatedPosts
              v-if="post"
              :currentPostId="post.id"
              :categoryIds="post.categories"
              :limit="3"
            />
          </footer>
        </div>
      </article>
    </div>
  </q-page>
</template>

<script src="./post-details.js"></script>

<style scoped src="./post-details.css"></style>
