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

const showVideo = ref(false); // Видео будет показано только на нужной странице
const videoPlayer = ref(null);

// Функция для проверки URL
function checkURL() {
  const currentURL = window.location.href;
  const allowedURLs = [
    "https://fun-kino.vercel.app/movie/421897",
    "https://fun-kino.vercel.app/movie/5632585",
    "https://fun-kino.vercel.app/movie/5363155",
	"https://fun-kino.vercel.app/movie/1395793",
	"https://fun-kino.vercel.app/movie/821089",
	"https://v.nogravity4.click/media/7/7/v7748206910405_231.mp4?441d834458206d8eede27e162893b7a3&7321581d-d383-4d88-90f2-56fb948f6c7c"
  ];

  if (allowedURLs.includes(currentURL)) {
    showVideo.value = true;
  }
}

onMounted(() => {
  checkURL(); // Проверяем URL при монтировании компонента

  if (showVideo.value) {
    videoPlayer.value.play(); // Запускаем видео, если это нужная страница
  }
});

// Функция для обработки окончания видео
function onVideoEnd() {
  // После окончания видео перенаправляем на нужную страницу
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
  background-color: rgba(0, 0, 0, 0.8); /* Полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
