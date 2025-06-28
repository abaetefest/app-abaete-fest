<template>
  <div class="optimized-image-container" :class="containerClasses">
    <!-- Placeholder/Loading state -->
    <div
      v-if="isLoading && !hasError"
      class="image-placeholder"
      :style="placeholderStyle"
    >
      <div class="loading-animation"></div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="hasError"
      class="image-error"
      :style="placeholderStyle"
    >
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z" fill="#999"/>
        </svg>
      </div>
      <p class="error-text">Erro ao carregar imagem</p>
    </div>

    <!-- Picture element with optimized images -->
    <picture v-show="!isLoading && !hasError" class="picture-element">
      <!-- WebP para navegadores modernos -->
      <source
        v-if="supportsWebP"
        :srcset="generateSrcSet('webp')"
        :sizes="sizes"
        type="image/webp"
      >
      <!-- AVIF para navegadores que suportam (mais otimizado que WebP) -->
      <source
        v-if="supportsAVIF"
        :srcset="generateSrcSet('avif')"
        :sizes="sizes"
        type="image/avif"
      >
      <!-- JPEG/PNG fallback -->
      <source
        :srcset="generateSrcSet(originalFormat)"
        :sizes="sizes"
        :type="`image/${originalFormat}`"
      >
      <!-- Imagem principal -->
      <img
        ref="mainImage"
        :src="optimizedSrc"
        :alt="alt"
        :width="width"
        :height="height"
        :loading="loading"
        :decoding="decoding"
        :class="imageClasses"
        :style="imageStyle"
        @load="onLoad"
        @error="onError"
        @loadstart="onLoadStart"
      >
    </picture>

    <!-- Caption opcional -->
    <figcaption v-if="caption" class="image-caption">
      {{ caption }}
    </figcaption>
  </div>
</template>

<script>
export default {
  name: 'OptimizedImage',

  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: null
    },
    height: {
      type: [Number, String],
      default: null
    },
    quality: {
      type: Number,
      default: 85,
      validator: (value) => value >= 1 && value <= 100
    },
    sizes: {
      type: String,
      default: '(max-width: 600px) 100vw, 600px'
    },
    loading: {
      type: String,
      default: 'lazy',
      validator: (value) => ['lazy', 'eager'].includes(value)
    },
    decoding: {
      type: String,
      default: 'async',
      validator: (value) => ['async', 'sync', 'auto'].includes(value)
    },
    responsive: {
      type: Boolean,
      default: true
    },
    breakpoints: {
      type: Array,
      default: () => [300, 600, 900, 1200]
    },
    objectFit: {
      type: String,
      default: 'cover',
      validator: (value) => ['cover', 'contain', 'fill', 'scale-down', 'none'].includes(value)
    },
    borderRadius: {
      type: String,
      default: '10px'
    },
    caption: {
      type: String,
      default: null
    },
    aspectRatio: {
      type: String,
      default: null // Ex: '16/9', '4/3', '1/1'
    },
    placeholder: {
      type: String,
      default: null // URL de imagem placeholder
    },
    blurHash: {
      type: String,
      default: null // BlurHash string para placeholder
    },
    priority: {
      type: Boolean,
      default: false // Para imagens críticas (LCP)
    }
  },

  emits: ['load', 'error', 'loadstart'],

  data() {
    return {
      isLoading: true,
      hasError: false,
      supportsWebP: false,
      supportsAVIF: false,
      intersectionObserver: null,
      isInViewport: false
    }
  },

  computed: {
    originalFormat() {
      if (!this.src) return 'jpg'

      const extension = this.src.split('.').pop().toLowerCase()
      return ['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(extension) ? extension : 'jpg'
    },

    optimizedSrc() {
      const format = this.supportsAVIF ? 'avif' : this.supportsWebP ? 'webp' : this.originalFormat

      return this.optimizeImage(this.src, {
        width: this.width || 600,
        height: this.height,
        format,
        quality: this.quality
      })
    },

    imageClasses() {
      return [
        'optimized-image',
        {
          loading: this.isLoading,
          error: this.hasError,
          responsive: this.responsive,
          priority: this.priority
        }
      ]
    },

    containerClasses() {
      return [
        'image-wrapper',
        {
          'has-aspect-ratio': this.aspectRatio,
          'is-loading': this.isLoading,
          'has-error': this.hasError
        }
      ]
    },

    imageStyle() {
      const styles = {
        objectFit: this.objectFit,
        borderRadius: this.borderRadius
      }

      if (this.aspectRatio) {
        styles.aspectRatio = this.aspectRatio
      }

      return styles
    },

    placeholderStyle() {
      const styles = {
        borderRadius: this.borderRadius
      }

      if (this.aspectRatio) {
        styles.aspectRatio = this.aspectRatio
      } else if (this.width && this.height) {
        styles.aspectRatio = `${this.width} / ${this.height}`
      }

      if (this.placeholder) {
        styles.backgroundImage = `url(${this.placeholder})`
        styles.backgroundSize = 'cover'
        styles.backgroundPosition = 'center'
      }

      return styles
    }
  },

  mounted() {
    this.checkFormatSupport()
    this.setupIntersectionObserver()

    // Para imagens prioritárias, carrega imediatamente
    if (this.priority) {
      this.isInViewport = true
    }
  },

  beforeUnmount() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
    }
  },

  methods: {
    // Verifica suporte a formatos modernos
    async checkFormatSupport() {
      if (typeof window === 'undefined') return

      // Verifica WebP
      this.supportsWebP = await this.checkImageFormatSupport('webp')

      // Verifica AVIF
      this.supportsAVIF = await this.checkImageFormatSupport('avif')
    },

    // Helper para verificar suporte a formato específico
    checkImageFormatSupport(format) {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        canvas.width = 1
        canvas.height = 1

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(false)
          return
        }

        // Tenta converter para o formato
        canvas.toBlob((blob) => {
          resolve(!!blob)
        }, `image/${format}`, 0.1)
      })
    },

    // Configura Intersection Observer para lazy loading
    setupIntersectionObserver() {
      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        this.isInViewport = true
        return
      }

      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isInViewport = true
              this.intersectionObserver.disconnect()
            }
          })
        },
        {
          rootMargin: '50px' // Carrega quando está 50px próximo da viewport
        }
      )

      this.intersectionObserver.observe(this.$el)
    },

    // Otimiza imagem usando Netlify Image CDN
    optimizeImage(url, options = {}) {
      if (!url) return ''

      const { width = 600, height, format = 'auto', quality = 85 } = options

      // Se for imagem do S3, usa Netlify Image CDN
      if (url.includes('abaete-fest.s3.amazonaws.com')) {
        let netlifyUrl = `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&fm=${format}`
        if (height) netlifyUrl += `&h=${height}&fit=crop`
        return netlifyUrl
      }

      // Para outras imagens externas, pode usar outros serviços
      if (url.startsWith('http') && !url.includes(window.location.hostname)) {
        // Exemplo: Cloudinary, ImageKit, etc.
        // return `https://res.cloudinary.com/your-cloud/image/fetch/w_${width},q_${quality},f_${format}/${encodeURIComponent(url)}`
      }

      // Para imagens locais, retorna original
      return url
    },

    // Gera srcset responsivo
    generateSrcSet(format) {
      if (!this.responsive || !this.src || !this.isInViewport) {
        return this.optimizedSrc
      }

      return this.breakpoints
        .map(size => {
          const optimizedUrl = this.optimizeImage(this.src, {
            width: size,
            height: this.height ? Math.round((this.height / this.width) * size) : undefined,
            format,
            quality: this.quality
          })
          return `${optimizedUrl} ${size}w`
        })
        .join(', ')
    },

    // Event handlers
    onLoadStart() {
      this.isLoading = true
      this.hasError = false
      this.$emit('loadstart')
    },

    onLoad(event) {
      this.isLoading = false
      this.hasError = false

      // Remove will-change após carregamento para otimizar performance
      if (this.$refs.mainImage) {
        this.$refs.mainImage.style.willChange = 'auto'
      }

      this.$emit('load', event)
    },

    onError(event) {
      this.isLoading = false
      this.hasError = true

      console.warn('Erro ao carregar imagem:', this.src)
      this.$emit('error', event)
    },

    // Método público para recarregar imagem
    reload() {
      this.isLoading = true
      this.hasError = false

      if (this.$refs.mainImage) {
        this.$refs.mainImage.src = this.optimizedSrc
      }
    },

    // Método público para obter dimensões da imagem
    getDimensions() {
      if (this.$refs.mainImage && this.$refs.mainImage.complete) {
        return {
          width: this.$refs.mainImage.naturalWidth,
          height: this.$refs.mainImage.naturalHeight
        }
      }
      return null
    }
  }
}
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.image-wrapper.has-aspect-ratio {
  aspect-ratio: var(--aspect-ratio);
}

.picture-element {
  display: block;
  width: 100%;
  height: 100%;
}

.optimized-image {
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: opacity;
}

.optimized-image.priority {
  will-change: transform, opacity;
}

.optimized-image.loading {
  opacity: 0;
}

.optimized-image:not(.loading) {
  opacity: 1;
}

.optimized-image.responsive {
  max-width: 100%;
  height: auto;
}

/* Placeholder styles */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.loading-animation {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #161931;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error styles */
.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  color: #999;
}

.error-icon {
  margin-bottom: 8px;
  opacity: 0.6;
}

.error-text {
  font-size: 14px;
  margin: 0;
  text-align: center;
}

/* Caption styles */
.image-caption {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
  font-style: italic;
}

/* Responsive breakpoints */
@media (max-width: 600px) {
  .optimized-image {
    border-radius: 8px;
  }

  .image-placeholder,
  .image-error {
    border-radius: 8px;
  }
}

/* Performance optimizations */
@media (prefers-reduced-motion: reduce) {
  .optimized-image {
    transition: none;
  }

  .loading-animation {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .image-placeholder {
    background-color: #e0e0e0;
    border: 2px solid #333;
  }

  .image-error {
    background-color: #e0e0e0;
    border: 2px solid #333;
    color: #333;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .image-placeholder {
    background-color: #2a2a2a;
  }

  .image-error {
    background-color: #2a2a2a;
    color: #ccc;
  }

  .image-caption {
    color: #ccc;
  }

  .loading-animation {
    border-color: #555;
    border-top-color: #75fbcf;
  }
}

/* Print styles */
@media print {
  .optimized-image {
    max-width: 100% !important;
    height: auto !important;
  }

  .image-placeholder,
  .image-error {
    display: none;
  }
}
</style>
