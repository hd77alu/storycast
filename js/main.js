// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuToggle && mobileNav) {
  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.hidden = isExpanded;
  });
}

// Audio Player Waveform Interaction
const waveforms = document.querySelectorAll('.audio-player__waveform');

waveforms.forEach(waveform => {
  const bars = waveform.querySelectorAll('.audio-player__bar');
  const playButton = waveform.closest('.audio-player')?.querySelector('.audio-player__button--play');
  let isPlaying = false;
  let progress = 0;

  // Click to seek
  waveform.addEventListener('click', (e) => {
    const rect = waveform.getBoundingClientRect();
    progress = ((e.clientX - rect.left) / rect.width) * 100;
    waveform.setAttribute('aria-valuenow', Math.round(progress));
    updateBars();
  });

  // Keyboard navigation
  waveform.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      progress = Math.min(100, progress + 5);
      waveform.setAttribute('aria-valuenow', Math.round(progress));
      updateBars();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      progress = Math.max(0, progress - 5);
      waveform.setAttribute('aria-valuenow', Math.round(progress));
      updateBars();
    } else if (e.key === ' ') {
      e.preventDefault();
      togglePlay();
    }
  });

  // Play/pause button
  if (playButton) {
    playButton.addEventListener('click', togglePlay);
  }

  function togglePlay() {
    isPlaying = !isPlaying;
    if (playButton) {
      playButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
      const svg = playButton.querySelector('svg');
      if (svg) {
        if (isPlaying) {
          svg.innerHTML = '<rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>';
        } else {
          svg.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
        }
      }
    }
  }

  function updateBars() {
    bars.forEach((bar, i) => {
      const barProgress = (i / bars.length) * 100;
      if (barProgress < progress) {
        bar.classList.add('audio-player__bar--active');
      } else {
        bar.classList.remove('audio-player__bar--active');
      }
    });
  }
});

// Transcript Toggle
const transcriptToggle = document.querySelector('.transcript__toggle');
const transcriptContent = document.querySelector('.transcript__content');

if (transcriptToggle && transcriptContent) {
  transcriptToggle.addEventListener('click', () => {
    const isExpanded = transcriptToggle.getAttribute('aria-expanded') === 'true';
    transcriptToggle.setAttribute('aria-expanded', !isExpanded);
    transcriptContent.hidden = isExpanded;
  });
}

// Skip link (for accessibility)
document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');
  if (mainContent && !mainContent.hasAttribute('tabindex')) {
    mainContent.setAttribute('tabindex', '-1');
  }
});

// Real Audio Player Functionality
const audio = document.getElementById('story-audio');
if (audio) {
  const playPauseBtn = document.getElementById('play-pause');
  const skipBackBtn = document.getElementById('skip-back');
  const skipForwardBtn = document.getElementById('skip-forward');
  const muteBtn = document.getElementById('mute');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const waveform = document.querySelector('.audio-player__waveform');
  const bars = waveform?.querySelectorAll('.audio-player__bar');

  // Format time helper
  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Play/Pause
  playPauseBtn?.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.setAttribute('aria-label', 'Pause');
      playPauseBtn.querySelector('svg').innerHTML = '<rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>';
    } else {
      audio.pause();
      playPauseBtn.setAttribute('aria-label', 'Play');
      playPauseBtn.querySelector('svg').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    }
  });

  // Skip back 10 seconds
  skipBackBtn?.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  // Skip forward 10 seconds
  skipForwardBtn?.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });

  // Mute/Unmute
  muteBtn?.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
    
    // Change icon based on muted state
    const svg = muteBtn.querySelector('svg');
    if (svg) {
      if (audio.muted) {
        // Muted icon (X over speaker)
        svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
      } else {
        // Unmuted icon (speaker with sound waves)
        svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
      }
    }
  });

  // Update time display and waveform
  audio.addEventListener('timeupdate', () => {
    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    if (currentTimeEl) currentTimeEl.textContent = current;
    if (durationEl) durationEl.textContent = duration;
    
    // Also update duration-bottom if exists (for home page)
    const durationBottomEl = document.getElementById('duration-bottom');
    if (durationBottomEl) durationBottomEl.textContent = duration;

    // Update waveform
    const progress = (audio.currentTime / audio.duration) * 100;
    bars?.forEach((bar, i) => {
      const barProgress = (i / bars.length) * 100;
      if (barProgress < progress) {
        bar.classList.add('audio-player__bar--active');
      } else {
        bar.classList.remove('audio-player__bar--active');
      }
    });
  });

  // Load metadata to show duration
  audio.addEventListener('loadedmetadata', () => {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
    
    // Also update duration-bottom if exists (for home page)
    const durationBottomEl = document.getElementById('duration-bottom');
    if (durationBottomEl) durationBottomEl.textContent = formatTime(audio.duration);
  });

  // Handle volume changes (including when audio is muted)
  audio.addEventListener('volumechange', () => {
    const svg = muteBtn?.querySelector('svg');
    if (svg && audio.muted) {
      svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
    } else if (svg && !audio.muted) {
      svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
    }
  });

  // Click waveform to seek
  waveform?.addEventListener('click', (e) => {
    const rect = waveform.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  });

  // Keyboard controls for waveform
  waveform?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  });
}
