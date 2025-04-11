<template>
  <BackgroundSpace />
  <MenuNavigation />
  <div class="router-view-container">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>

  <!-- Видео блок, который отображается при заходе на сайт -->
  <div v-if="showVideo" class="video-container">
    <video ref="videoPlayer" width="100%" controls @ended="onVideoEnd">
      <source src="/videos/path_to_your_video.mp4" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BackgroundSpace from '@/components/BackgroundSpace.vue';
import MenuNavigation from '@/components/MenuNavigation.vue';

const showVideo = ref(false);
const videoPlayer = ref(null);

// Разрешённые страницы, на которых показывается видео
function checkURL() {
  const currentURL = window.location.href;
  const allowedURLs = [
    "https://fun-kino.vercel.app/movie/421897",
    "https://fun-kino.vercel.app/movie/5632585",
    "https://fun-kino.vercel.app/movie/5363155",
    "https://fun-kino.vercel.app/movie/1395793",
    "https://fun-kino.vercel.app/movie/821089"
  ];

  if (allowedURLs.includes(currentURL)) {
    showVideo.value = true;
  }
}

// 🚫 Функция для удаления рекламы по нескольким доменам
function removeAds() {
  const blockedDomains = [
    "cdn-t.b5c1d2e8c9982e3b965a27ac72ru7284cc.com",
    "ads.example.com",
    "another-ad-source.net"
  ];

  document.querySelectorAll('video, iframe, script, source').forEach(el => {
    const srcAttr = el.src || el.getAttribute('src');
    if (srcAttr && blockedDomains.some(domain => srcAttr.includes(domain))) {
      el.remove();
      console.log("🚫 Удалена реклама с:", srcAttr);
    }
  });
}

onMounted(() => {
  checkURL();

  if (showVideo.value && videoPlayer.value) {
    videoPlayer.value.play();
  }

  // Удаление рекламы сразу
  removeAds();

  // Повторно удалять рекламу каждые 2 секунды (на случай динамической загрузки)
  setInterval(removeAds, 2000);
});

// После окончания видео — переход на главную
function onVideoEnd() {
  window.location.href = "https://fun-kino.vercel.app";
}
</script>

<style>
@import '@/assets/main.css';

#app {
  position: relative;
  z-index: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
