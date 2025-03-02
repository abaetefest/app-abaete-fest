<!-- ImageZoom.vue -->
<template>
  <div class="image-zoom-container" ref="container">
    <q-img :src="src" :ratio="ratio" class="image-zoom" :style="{
      transform: `scale(${zoom})`,
      transformOrigin: `${originX}px ${originY}px`
    }" @mousemove="handleMouseMove" @mousedown="handleMouseDown" @mouseup="isDragging = false"
      @mouseleave="isDragging = false" @wheel.prevent="handleWheel" />

    <div class="zoom-controls">
      <q-btn size="lg" color="white" text-color="primary" icon="mdi-arrow-left" @click="$emit('close')" label="Sair" no-caps />
      <q-btn size="lg" color="white" text-color="primary" icon="refresh" @click="resetZoom" />
      <q-btn size="lg" color="white" text-color="primary" icon="zoom_out" @click="zoomOut" />
      <q-btn size="lg" color="white" text-color="primary" icon="zoom_in" @click="zoomIn" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageZoom',

  props: {
    src: {
      type: String,
      required: true
    },
    ratio: {
      type: [Number, String],
      default: 16 / 9
    },
    maxZoom: {
      type: Number,
      default: 5
    },
    minZoom: {
      type: Number,
      default: 0.5
    },
    zoomStep: {
      type: Number,
      default: 0.2
    }
  },

  data () {
    return {
      zoom: 1,
      originX: 0,
      originY: 0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0
    }
  },

  methods: {
    zoomIn () {
      if (this.zoom < this.maxZoom) {
        this.zoom = Math.min(this.zoom + this.zoomStep, this.maxZoom)
      }
    },

    zoomOut () {
      if (this.zoom > this.minZoom) {
        this.zoom = Math.max(this.zoom - this.zoomStep, this.minZoom)
      }
    },

    resetZoom () {
      this.zoom = 1
      this.originX = 0
      this.originY = 0
    },

    handleWheel (event) {
      const rect = this.$refs.container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Definir o ponto de origem para o zoom
      this.originX = x
      this.originY = y

      // Determinar a direção do zoom
      if (event.deltaY < 0) {
        this.zoomIn()
      } else {
        this.zoomOut()
      }
    },

    handleMouseDown (event) {
      this.isDragging = true
      this.lastMouseX = event.clientX
      this.lastMouseY = event.clientY
    },

    handleMouseMove (event) {
      if (this.isDragging && this.zoom > 1) {
        const deltaX = event.clientX - this.lastMouseX
        const deltaY = event.clientY - this.lastMouseY

        this.originX -= deltaX
        this.originY -= deltaY

        this.lastMouseX = event.clientX
        this.lastMouseY = event.clientY
      }
    }
  }
}
</script>

<style scoped>
.image-zoom-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.image-zoom {
  cursor: move;
  transition: transform 0.1s ease;
  border-radius: 15px;
}

.zoom-controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 5px;
  display: flex;
}
</style>
