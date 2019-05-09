<template>
  <svg class="svg-sprite">
    <defs>
      <!-- ICON CROSS -->
      <symbol id="icon-cross" stroke-width="4px" viewBox="0 0 99 99">
        <line x1="21.5" y1="49.5" x2="77.5" y2="49.5"/>
        <line x1="49.5" y1="77.5" x2="49.5" y2="21.5"/>
      </symbol>
      <!-- ICON LITTLE ARROW -->
      <symbol id="icon-little-arrow" stroke-width="4px" stroke-linecap="round" fill="none" viewBox="0 0 19.3 32.8">
        <polyline points="2.3,2.6 16.1,16.4 2.3,30.2 "/>
      </symbol>
      <!-- ICON MENU -->
      <symbol id="icon-menu" viewBox="0 0 39 16">
        <rect width="39" height="3" rx="1.25" ry="1.25"/>
        <rect y="13" width="39" height="3" rx="1.25" ry="1.25"/>
      </symbol>
      <!-- ICON CHECK -->
      <symbol id="icon-check" stroke-width="4px" stroke-linecap="round" viewBox="0 0 99 99">
        <line x1="22.85" y1="45.51" x2="43.28" y2="65.94"/>
        <line x1="43.28" y1="65.94" x2="76.15" y2="33.06"/>
      </symbol>
      <!-- ICON ARROW -->
      <symbol id="icon-arrow" stroke-width="4px" viewBox="0 0 99 99">
        <line x1="10.77" y1="49.5" x2="85.73" y2="49.5"/>
        <polyline points="74.42 35.69 88.23 49.5 74.42 63.31"/>
      </symbol>
      <!-- ICON GLASSES -->
      <symbol id="icon-glasses" stroke-width="4px" viewBox="0 0 99 99">
        <path d="M36.1,35.7c4.3,0,7.7,3.5,7.7,7.7v11.7c0,4.3-3.5,7.7-7.7,7.7H25.3c-4.3,0-7.7-3.5-7.7-7.7V35.7H36.1z"/>
        <line x1="43.8" y1="45.5" x2="55.2" y2="45.5"/>
        <path d="M73.7,62.8H62.9c-4.3,0-7.7-3.5-7.7-7.7v0V43.4c0-4.3,3.5-7.7,7.7-7.7l0,0h18.6l0,0v19.4C81.4,59.4,78,62.8,73.7,62.8L73.7,62.8z"/>
      </symbol>
      <!-- ICON HAIR -->
      <symbol id="icon-hair" stroke-width="4px" viewBox="0 0 99 99">
        <path d="M66.17,45.6V77.29H72.6v-31A23.08,23.08,0,0,0,49.52,23.18h0A23.07,23.07,0,0,0,26.44,46.25v31h6.23V45.6a3.73,3.73,0,0,1,3.74-3.74h26A3.74,3.74,0,0,1,66.17,45.6Z"/>
      </symbol>
      <!-- ICON COCOONING -->
      <symbol id="icon-cocooning" stroke-width="4px" viewBox="0 0 99 99">
        <polygon points="65.84 43.69 65.84 66.11 33.16 66.11 33.16 43.69 23.7 43.69 23.7 75.71 23.7 75.74 75.3 75.74 75.3 75.71 75.3 43.69 65.84 43.69"/>
        <path d="M34,65.22V62.53a7.78,7.78,0,0,1,7.78-7.78H57.24A7.78,7.78,0,0,1,65,62.53v2.69"/>
        <path d="M28,42.87A19.61,19.61,0,0,1,47.6,23.26h4a19.61,19.61,0,0,1,19.6,19.61"/>
      </symbol>
      <!-- ICON MAIL -->
      <symbol id="icon-mail" viewBox="0 0 89 89">
        <path d="M74,8.2H15c-3.45,0-6.24,3.88-6.24,8.68V72.12c0,4.8,2.79,8.68,6.24,8.68H74c3.45,0,6.24-3.88,6.24-8.68V16.88C80.25,12.08,77.46,8.2,74,8.2Z"/>
        <polyline stroke-width="4px" points="19.09 22.13 44.44 37.18 69.91 22.13"/>
      </symbol>
      <!-- ICON FACEBOOK -->
      <symbol id="icon-facebook" viewBox="0 0 89 89">
        <path d="M51.12,26.7V19.58c0-3.47,2.31-4.28,3.93-4.28H65V.06L51.29,0C36,0,32.56,11.37,32.56,18.66v8H23.73V44.5h8.9V89h17.8V44.5H63.64l1.63-17.8Z"/>
      </symbol>
      <!-- ICON MOUNTAIN -->
      <symbol id="icon-mountain" viewBox="0 0 99 99">
        <polygon stroke-width="4px" points="21.5 77.3 52.47 23 83.5 77.3 21.5 77.3"/>
        <polyline stroke-width="4px" points="41.82 41.67 58.86 58.71 67.7 49.87"/>
        <rect x="19.29" y="47.94" width="4.42" height="4.42" transform="translate(-29.16 29.89) rotate(-45)"/>
        <rect x="33.29" y="22.58" width="4.42" height="4.42" transform="translate(-7.13 32.36) rotate(-45)"/>
        <rect x="81.29" y="49.37" width="4.42" height="4.42" transform="translate(-12.02 74.15) rotate(-45)"/>
      </symbol>
      <!-- ICON MOUSTACHE -->
      <symbol id="icon-moustache" stroke-width="4px" viewBox="0 0 99 99">
        <path d="M83.62,53H68.22A18.24,18.24,0,0,1,50,35.58H69.25Z"/>
        <path d="M15.38,53h15.4A18.24,18.24,0,0,0,49,35.58H29.75Z"/>
        <path d="M51.67,53.46H46.42a2.31,2.31,0,0,0-1.74,3.82l4.32,5,4.39-5A2.3,2.3,0,0,0,51.67,53.46Z"/>
      </symbol>
      <!-- ICON MUSEUM -->
      <symbol id="icon-museum" viewBox="0 0 99 99">
        <g stroke-width="4px" >
          <rect x="22.84" y="22.84" width="53.32" height="53.32"/>
          <path d="M58.4,55.53a11.16,11.16,0,0,1-17.78-.09"/>
          <path d="M40.62,55.44a11.17,11.17,0,0,1-17.78.1"/>
          <path d="M76.16,55.47a11.16,11.16,0,0,1-17.76.06"/>
          <path d="M32.67,58.28a17.18,17.18,0,1,1,33.8-.36"/>
        </g>
        <polygon points="43.02 55.2 40.62 56.8 37.89 55.65 40.62 51.98 43.02 55.2"/>
        <polygon points="56.17 55.13 58.43 56.8 60.78 55.28 58.43 51.98 56.17 55.13"/>
      </symbol>
      <!-- ICON BEACH -->
      <symbol id="icon-beach" viewBox="0 0 99 99" stroke-width="4px">
        <path d="M50,41.92a16.11,16.11,0,0,0-29.23,0Z"/>
        <path d="M78.26,41.92a16.1,16.1,0,0,0-29.22,0Z"/>
        <path d="M60.42,32.92l14.15-8.58a16.11,16.11,0,0,0-25,15.15"/>
        <line x1="49.5" y1="41.92" x2="49.5" y2="75.63"/>
        <line x1="28.75" y1="77.3" x2="70.5" y2="77.3"/>
      </symbol>
      <!-- ICON BATHROOM -->
      <symbol id="icon-bathroom" viewBox="0 0 99 99">
        <g stroke-width="4px">
          <path d="M52.24,46A13.65,13.65,0,1,0,36.9,51.39,12.87,12.87,0,0,0,34.45,59c0,7.17,5.81,15,13,15H62.3c7.16,0,13-7.8,13-15V46Z"/>
          <polyline points="20.61 32.86 25.32 37.57 20.61 42.29"/>
          <line x1="37.43" y1="37.57" x2="43.53" y2="37.57"/>
        </g>
        <rect x="73.06" y="23.18" width="4.42" height="4.42" transform="translate(4.09 60.66) rotate(-45)"/>
      </symbol>
      <!-- ICON EIFFEL TOWER -->
      <symbol id="icon-eiffelTower" stroke-width="4px">
        <path d="M21.5,76.65,34,52.48,49.47,22.35l28,54.3H61.59c0-7.78-4.31-13.09-12.09-13.09S37.41,68.87,37.41,76.65Z"/>
        <line x1="66.39" y1="54.05" x2="32.61" y2="54.05"/>
        <line x1="60.15" y1="42.37" x2="37.92" y2="42.37"/>
      </symbol>
      <!-- ICON TWITTER -->
      <symbol id="icon-twitter" viewBox="0 0 89 89">
        <path d="M88.61,17.55A37.29,37.29,0,0,1,79,20a18.21,18.21,0,0,0,7.83-9.29.28.28,0,0,0-.41-.34,37,37,0,0,1-11,4A18.41,18.41,0,0,0,62,8.7,18.22,18.22,0,0,0,43.61,26.77a18,18,0,0,0,.47,4.12A52.43,52.43,0,0,1,6.32,12.12a.1.1,0,0,0-.17,0,17.91,17.91,0,0,0,5.44,23.79.11.11,0,0,1-.07.2A18.5,18.5,0,0,1,3.75,34a.09.09,0,0,0-.14.08,24,24,0,0,0,1.24,6.62A18.49,18.49,0,0,0,18.34,51.83a18.49,18.49,0,0,1-8.14.34.1.1,0,0,0-.12.13A18.36,18.36,0,0,0,26.87,64.68a.11.11,0,0,1,.07.2A37.19,37.19,0,0,1,4.37,72.43,39.45,39.45,0,0,1,0,72.19,52.66,52.66,0,0,0,28.15,80.3c14.28,0,25.83-4.92,34.4-12.42a53,53,0,0,0,16.6-28.1,49.85,49.85,0,0,0,1.26-10.91c0-.78,0-1.56-.06-2.33A37.37,37.37,0,0,0,89,18,.29.29,0,0,0,88.61,17.55Z"/>
      </symbol>
      <!-- ICON TSHIRT -->
      <symbol id="icon-tshirt" viewBox="0 0 99 99" stroke-width="4px">
        <path d="M67.72,23.25C73,24.55,77.92,29.31,77.92,35V47.38h-9.2V76.26H30.38V47.34h-9.3V35c0-5.72,5-10.5,10.3-11.77h7a11.08,11.08,0,0,0,22.16,0Z"/>
      </symbol>
      <!-- ICON FACE -->
      <symbol id="icon-face" viewBox="0 0 99 99" stroke-width="4px">
        <path d="M26.44,23.44H72.6a0,0,0,0,1,0,0v29A23.08,23.08,0,0,1,49.52,75.56h0A23.08,23.08,0,0,1,26.44,52.48v-29a0,0,0,0,1,0,0Z"/>
        <line x1="75" y1="42.83" x2="75" y2="51.33"/>
        <line x1="24" y1="42.83" x2="24" y2="51.33"/>
      </symbol>
      <!-- ICON EYE -->
      <symbol id="icon-eye" viewBox="0 0 99 99">
        <g stroke-width="4px">
          <path d="M24.83,35.83H74.17a0,0,0,0,1,0,0V49.21a14,14,0,0,1-14,14H38.79a14,14,0,0,1-14-14V35.83A0,0,0,0,1,24.83,35.83Z"/>
          <circle cx="49.5" cy="49.5" r="10"/>
        </g>
        <rect x="47.29" y="47.29" width="4.42" height="4.42" transform="translate(-20.5 49.5) rotate(-45)"/>
      </symbol>
      <!-- ICON PARK -->
      <symbol id="icon-park" viewBox="0 0 99 99" stroke-width="4px">
        <polyline points="62.58 41.67 73.75 41.67 73.75 61.5 53.92 61.5 53.92 56.29"/>
        <path d="M46.67,21.67h15a0,0,0,0,1,0,0V44.1A13.48,13.48,0,0,1,48.18,57.57h-9A13.48,13.48,0,0,1,25.75,44.1V42.59A20.92,20.92,0,0,1,46.67,21.67Z"/>
        <line x1="43.7" y1="57.57" x2="43.7" y2="77.08"/>
        <line x1="63.84" y1="61.5" x2="63.84" y2="77.08"/>
        <line x1="22.83" y1="77.33" x2="76.17" y2="77.33"/>
      </symbol>
    </defs>
  </svg>
</template>
