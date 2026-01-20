<template>
  <div class="bg prism">
    <div class="bg--wrap">
      <div class="bg--shine">
        <div class="bg--shine__wrap">
          <div class="bg--shine__item diamond-pink"></div>
          <div class="bg--shine__item diamond-yellow"></div>
          <div class="bg--shine__item diamond-white"></div>
          <div class="bg--shine__item star-white"></div>
          <div class="bg--shine__item star-yellow i1"></div>
          <div class="bg--shine__item star-yellow i2"></div>
        </div>
      </div>

      <div class="bg--gradient">
        <div class="bg--aurora"></div>

        <div class="bg--cloud">
          <div class="bg--cloud__item i1"></div>
          <div class="bg--cloud__item i2"></div>
          <div class="bg--cloud__item i3"></div>
          <div class="bg--cloud__item i4"></div>
          <div class="bg--cloud__item i5"></div>
          <div class="bg--cloud__item i6"></div>
        </div>

        <div class="bg--moon"></div>
        <div class="bg--star">
          <div class="bg--star__item i1 green"></div>
          <div class="bg--star__item i2"></div>
          <div class="bg--star__item i3 pink"></div>
          <div class="bg--star__item i4 green"></div>
          <div class="bg--star__item i5 pink"></div>
          <div class="bg--star__item i6"></div>
          <div class="bg--star__item i7"></div>
        </div>

        <div class="bg--rainbow">
          <div class="bg--rainbow__cloud"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@charset "UTF-8";@import url(https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;500;700;800;900&display=swap);input[type=text] {
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #fff;
    outline: 0
}

.common--box {
    position: relative;
    width: 87.5vw;
    border-radius: 3.75vw;
    box-shadow: 1.75vw 1.75vw 0 0 rgba(0,0,0,.2);
    background-color: #fff;
    margin: 0 auto;
    padding: 8.125vw 0
}

@media only screen and (min-width: 769px) {
    .common--box {
        width:81.8181818182vw;
        border-radius: 2.7272727273vw;
        box-shadow: 1.2727272727vw 1.2727272727vw 0 0 rgba(0,0,0,.2);
        padding: 4.5454545455vw 0
    }
}

@media only screen and (min-width: 1100px) {
    .common--box {
        width:900px;
        border-radius: 30px;
        box-shadow: 14px 14px 0 0 rgba(0,0,0,.2);
        padding: 50px 0
    }
}

.common--box:after,.common--box:before {
    position: absolute;
    display: block;
    content: "";
    width: 75vw;
    height: 1.5vw;
    left: 50%;
    transform: translateX(-50%)
}

@media only screen and (min-width: 769px) {
    .common--box:after,.common--box:before {
        width:54.5454545455vw;
        height: .7272727273vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--box:after,.common--box:before {
        width:600px;
        height: 8px
    }
}

.common--box:before {
    top: 0;
    border-radius: 0 0 1.5vw 1.5vw;
    background-color: #ba5eea
}

@media only screen and (min-width: 769px) {
    .common--box:before {
        border-radius:0 0 .7272727273vw .7272727273vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--box:before {
        border-radius:0 0 8px 8px
    }
}

.common--box:after {
    bottom: 0;
    border-radius: 1.5vw 1.5vw 0 0;
    background-color: #ffcedf
}

@media only screen and (min-width: 769px) {
    .common--box:after {
        border-radius:.7272727273vw .7272727273vw 0 0
    }
}

@media only screen and (min-width: 1400px) {
    .common--box:after {
        border-radius:8px 8px 0 0
    }
}

.common--top {
    position: fixed;
    z-index: 100;
    display: block;
    bottom: 2.5vw;
    right: 2.5vw;
    width: 15vw;
    transform: translateY(0);
    transition: .3s
}

.common--top.off {
    opacity: 0;
    transform: translateY(30%);
    pointer-events: none
}

@media only screen and (min-width: 769px) {
    .common--top {
        transition:transform .3s
    }

    .common--top:hover {
        transform: translateY(-5%)
    }
}

@media only screen and (min-width: 769px) {
    .common--top {
        bottom:1.4285714286vw;
        right: 1.4285714286vw;
        width: 8.5714285714vw;
        transition: .3s
    }
}

@media only screen and (min-width: 1400px) {
    .common--top {
        bottom:20px;
        right: 20px;
        width: 120px
    }
}

.common--share {
    position: relative;
    width: 87.5vw;
    border-radius: 3.75vw;
    box-shadow: 1.75vw 1.75vw 0 0 rgba(0,0,0,.2);
    background-color: #fff;
    margin: 0 auto;
    padding: 8.125vw 0
}

@media only screen and (min-width: 769px) {
    .common--share {
        width:81.8181818182vw;
        border-radius: 2.7272727273vw;
        box-shadow: 1.2727272727vw 1.2727272727vw 0 0 rgba(0,0,0,.2);
        padding: 4.5454545455vw 0
    }
}

@media only screen and (min-width: 1100px) {
    .common--share {
        width:900px;
        border-radius: 30px;
        box-shadow: 14px 14px 0 0 rgba(0,0,0,.2);
        padding: 50px 0
    }
}

.common--share:after,.common--share:before {
    position: absolute;
    display: block;
    content: "";
    width: 75vw;
    height: 1.5vw;
    left: 50%;
    transform: translateX(-50%)
}

@media only screen and (min-width: 769px) {
    .common--share:after,.common--share:before {
        width:54.5454545455vw;
        height: .7272727273vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--share:after,.common--share:before {
        width:600px;
        height: 8px
    }
}

.common--share:before {
    top: 0;
    border-radius: 0 0 1.5vw 1.5vw;
    background-color: #ba5eea
}

@media only screen and (min-width: 769px) {
    .common--share:before {
        border-radius:0 0 .7272727273vw .7272727273vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--share:before {
        border-radius:0 0 8px 8px
    }
}

.common--share:after {
    bottom: 0;
    border-radius: 1.5vw 1.5vw 0 0;
    background-color: #ffcedf
}

@media only screen and (min-width: 769px) {
    .common--share:after {
        border-radius:.7272727273vw .7272727273vw 0 0
    }
}

@media only screen and (min-width: 1400px) {
    .common--share:after {
        border-radius:8px 8px 0 0
    }
}

.common--header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto
}

.common--header__txt {
    margin: 0 1.125vw
}

@media only screen and (min-width: 769px) {
    .common--header__txt {
        margin:0 1.8181818182vw
    }
}

@media only screen and (min-width: 1400px) {
    .common--header__txt {
        margin:0 20px
    }
}

.common--header__txt svg {
    width: 100%;
    fill: #0b3871;
    fill-rule: evenodd
}

.common--header__icon {
    background-image: url(../asset-img-prism/common/icon_header_left.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    display: block;
    width: 14vw;
    height: 7vw
}

@media only screen and (min-width: 769px) {
    .common--header__icon {
        width:8vw;
        height: 4vw;
        margin-bottom: 0
    }
}

@media only screen and (min-width: 1400px) {
    .common--header__icon {
        width:112px;
        height: 56px
    }
}

.common--header__icon.right {
    background-image: url(../asset-img-prism/common/icon_header_right.svg)
}

.common--header__icon svg {
    width: 100%;
    height: 100%;
    fill: #f8b73d;
    fill-rule: evenodd
}

.common--btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 0 auto;
    width: 61.25vw;
    height: 11.25vw;
    font-size: 4.25vw;
    border-radius: 12.5vw;
    font-weight: 900;
    background-color: #e72139;
    box-shadow: 0 2vw 0 0 #a51426;
    position: relative;
    word-break: break-all;
    white-space: nowrap
}

@media only screen and (min-width: 769px) {
    .common--btn {
        width:36.3636363636vw;
        height: 5.4545454545vw;
        font-size: 2.5454545455vw;
        box-shadow: 0 .9090909091vw 0 0 #a51426;
        transition: .3s
    }

    .common--btn:hover {
        box-shadow: none;
        transform: translateY(.9090909091vw)
    }
}

@media only screen and (min-width: 1100px) {
    .common--btn {
        width:400px;
        height: 60px;
        font-size: 28px;
        box-shadow: 0 10px 0 0 #a51426
    }

    .common--btn:hover {
        transform: translateY(10px)
    }
}

.common--btn:after {
    right: 4.375vw
}

@media only screen and (min-width: 769px) {
    .common--btn:after {
        right:1.8181818182vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--btn:after {
        right:20px
    }
}

.common--btn.next:after {
    position: absolute;
    display: block;
    content: "";
    width: 2.25vw;
    height: 2.5vw;
    background-image: url(../img/common/icon_next.png);
    background-size: cover;
    background-repeat: no-repeat
}

@media only screen and (min-width: 769px) {
    .common--btn.next:after {
        width:1.6363636364vw;
        height: 1.8181818182vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--btn.next:after {
        width:18px;
        height: 20px
    }
}

.common--btn.blank:after {
    position: absolute;
    display: block;
    content: "";
    width: 3.25vw;
    height: 2.5vw;
    background-image: url(../img/common/icon_blank.png);
    background-size: cover;
    background-repeat: no-repeat
}

@media only screen and (min-width: 769px) {
    .common--btn.blank:after {
        width:2.3636363636vw;
        height: 1.8181818182vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--btn.blank:after {
        width:26px;
        height: 20px
    }
}

.common--btn.download:after {
    position: absolute;
    display: block;
    content: "";
    width: 4.5vw;
    height: 5vw;
    background-image: url(../img/common/icon_download.png);
    background-size: cover;
    background-repeat: no-repeat
}

@media only screen and (min-width: 769px) {
    .common--btn.download:after {
        width:1.8181818182vw;
        height: 2vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--btn.download:after {
        width:20px;
        height: 22px
    }
}

.common--title {
    padding-top: 21.25vw;
    width: 88.25vw;
    margin: 0 auto
}

@media only screen and (min-width: 769px) {
    .common--title {
        padding-top:0;
        margin: 6.3636363636vw auto 0;
        width: 82.3636363636vw
    }
}

@media only screen and (min-width: 1100px) {
    .common--title {
        width:906px;
        margin: 70px auto 0
    }
}

@keyframes gradient {
    0% {
        background-position: 0 0
    }

    50% {
        background-position: 0 100%
    }

    100% {
        background-position: 0 0
    }
}

@keyframes pattern {
    0% {
        background-position: 0 0
    }

    100% {
        background-position: -20% 20%
    }
}

@keyframes diamond {
    0% {
        transform: scaleX(1)
    }

    80% {
        transform: scaleX(1)
    }

    90% {
        transform: scaleX(0)
    }

    100% {
        transform: scaleX(1)
    }
}

@keyframes star {
    0% {
        opacity: 0;
        transform: rotate(0)
    }

    20% {
        opacity: 1
    }

    40% {
        opacity: 0;
        transform: rotate(1turn)
    }

    100% {
        opacity: 0;
        transform: rotate(1turn)
    }
}

@keyframes auroras {
    0% {
        opacity: 1
    }

    20% {
        opacity: .6
    }

    80% {
        opacity: .6
    }

    100% {
        opacity: 1
    }
}

@keyframes aurora {
    0% {
        opacity: 0;
        transform: translateX(0)
    }

    1% {
        opacity: .8
    }

    80% {
        opacity: .8
    }

    99% {
        opacity: 0;
        transform: translateX(-100%)
    }

    100% {
        opacity: 0;
        transform: translateX(0)
    }
}

@keyframes cloud {
    0% {
        opacity: 0;
        transform: translateX(0)
    }

    20% {
        opacity: 1
    }

    80% {
        opacity: 1
    }

    90% {
        opacity: 0;
        transform: translateX(100%)
    }

    100% {
        opacity: 0;
        transform: translateX(0)
    }
}

@keyframes moon {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(30deg)
    }
}

@keyframes shooting-star {
    0% {
        transform: translateX(0) translateY(0);
        opacity: 0
    }

    20% {
        opacity: 1
    }

    40% {
        opacity: 1
    }

    60% {
        transform: translateX(-100%) translateY(100%);
        opacity: 0
    }

    to {
        transform: translateX(0) translateY(0);
        opacity: 0
    }
}

@keyframes shooting-star-head {
    0% {
        transform: rotate(0)
    }

    to {
        transform: rotate(-1turn)
    }
}

@keyframes rainbow {
    0% {
        -webkit-clip-path: polygon(0 0,0 0,0 100%,0 100%);
        clip-path: polygon(0 0,0 0,0 100%,0 100%);
        transform: scale(.8)
    }

    to {
        -webkit-clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
        clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
        transform: scale(1)
    }
}

@keyframes rainbow-bottom {
    0% {
        transform: scale(.8)
    }

    to {
        transform: scale(1)
    }
}

.bg {
    pointer-events: none;
    background-image: linear-gradient(0deg,#45c7e3,#7dc0fd 10%,#d3a1ff 25%,#ff99c0 50%,#d3a1ff 75%,#7dc0fd 90%,#45c7e3)
}

.bg.prism {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    overflow: hidden
}

.bg--wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    overflow: hidden
}

.bg--gradient {
    position: relative;
    top: 50%;
    left: 50%;
    width: calc(100% - 5.5vw);
    height: calc(100% - 5.5vw);
    border-radius: 5vw;
    background-size: cover;
    background-image: linear-gradient(0deg,#fff 14%,#ffd5cf 24%,#ffd5cf 46%,#ffc5d5 56%,#eaabff 67%,#72bcfe 85%,#65f2df 95%);
    overflow: hidden;
    z-index: -99;
    transform: translate3d(-50%,-50%,0);
    animation: gradient 10s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--gradient {
        width:calc(100% - 3.1428571429vw);
        height: calc(100% - 3.1428571429vw);
        border-radius: 2.8571428571vw
    }
}

.bg--gradient:before {
    content: "";
    display: block;
    background: transparent url(../asset-img-prism/bg/bg_pattern.png) repeat;
    width: 100%;
    height: 100%;
    background-size: 6.5vw auto;
    background-position: 50%;
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: overlay;
    animation: pattern 10s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--gradient:before {
        background-size:3.7142857143vw auto
    }
}

@media only screen and (min-width: 1400px) {
    .bg--gradient:before {
        background-size:52px auto
    }
}

.bg--shine {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-image: url(../asset-img-prism/bg/bg_shines_sp.png);
    background-repeat: repeat;
    background-size: 95vw auto;
    background-position: center 7vw
}

@media only screen and (min-width: 769px) {
    .bg--shine {
        background-image:url(../asset-img-prism/bg/bg_shines_pc.png);
        background-size: 95.1428571429vw;
        background-position: center 1.7142857143vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine {
        background-size:1332px;
        background-position: center 24px
    }
}

.bg--shine__wrap {
    position: relative;
    width: 100%;
    height: 100%
}

.bg--shine__item {
    position: absolute;
    width: 5vw;
    height: 5vw;
    top: 0;
    left: 0;
    background-size: contain;
    background-repeat: no-repeat
}

@media only screen and (min-width: 769px) {
    .bg--shine__item {
        width:1.4285714286vw;
        height: 1.4285714286vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item {
        width:20px;
        height: 20px
    }
}

.bg--shine__item.diamond-pink {
    background-image: url(../asset-img-prism/bg/bg_diamond_pink.png);
    top: 9vw;
    left: 68.25vw;
    animation: diamond 3s infinite 1s linear
}

@media only screen and (max-width: 769px) {
    .bg--shine__item.diamond-pink {
        width:3vw;
        height: 3vw
    }
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.diamond-pink {
        top:2.2857142857vw;
        left: 23.1428571429vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.diamond-pink {
        top:32px;
        left: 324px
    }
}

.bg--shine__item.diamond-yellow {
    background-image: url(../asset-img-prism/bg/bg_diamond_yellow.png);
    top: 6.5vw;
    left: 74.5vw;
    animation: diamond 3s infinite 2s linear
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.diamond-yellow {
        top:21.8571428571vw;
        left: 9.7142857143vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.diamond-yellow {
        top:306px;
        left: 136px
    }
}

.bg--shine__item.diamond-white {
    background-image: url(../asset-img-prism/bg/bg_diamond_white.png);
    top: 16.5vw;
    left: 50.5vw;
    animation: diamond 3s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.diamond-white {
        top:18.2857142857vw;
        left: 84.2857142857vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.diamond-white {
        top:256px;
        left: 1180px
    }
}

.bg--shine__item.star-white {
    background-image: url(../asset-img-prism/bg/bg_star_white.png);
    width: 7.5vw;
    height: 7.5vw;
    top: 21vw;
    left: 79.5vw;
    opacity: 0;
    animation: star 3s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.star-white {
        width:2.1428571429vw;
        height: 2.1428571429vw;
        top: 16.4285714286vw;
        left: 39.4285714286vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.star-white {
        width:30px;
        height: 30px;
        top: 230px;
        left: 552px
    }
}

.bg--shine__item.star-yellow {
    width: 7.5vw;
    height: 7.5vw;
    opacity: 0;
    animation: star 3s infinite 1s linear
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.star-yellow {
        width:2.1428571429vw;
        height: 2.1428571429vw;
        top: 16.4285714286vw;
        left: 39.4285714286vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.star-yellow {
        width:30px;
        height: 30px;
        top: 230px;
        left: 552px
    }
}

.bg--shine__item.star-yellow.i1 {
    background-image: url(../asset-img-prism/bg/bg_star_yellow.png);
    top: 28.5vw;
    left: 3vw
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.star-yellow.i1 {
        top:8.1428571429vw;
        left: .8571428571vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.star-yellow.i1 {
        top:114px;
        left: 12px
    }
}

.bg--shine__item.star-yellow.i2 {
    background-image: url(../asset-img-prism/bg/bg_star_yellow.png);
    top: 5vw;
    left: 30vw
}

@media only screen and (min-width: 769px) {
    .bg--shine__item.star-yellow.i2 {
        top:28.8571428571vw;
        left: 96.8571428571vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--shine__item.star-yellow.i2 {
        top:404px;
        left: 1356px
    }
}

.bg--aurora {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 61.5vw;
    background-image: url(../asset-img-prism/bg/bg_aurora_sp.png);
    background-repeat: repeat-x;
    background-size: 415vw;
    background-position: left bottom 37.5vw;
    animation: auroras 40s infinite linear;
    z-index: 2
}

@media only screen and (min-width: 769px) {
    .bg--aurora {
        background-image:url(../asset-img-prism/bg/bg_aurora_pc.png);
        height: 17.5714285714vw;
        background-size: 228.2857142857vw auto;
        background-position: 0 100%;
        animation: auroras 50s infinite linear
    }
}

@media only screen and (min-width: 1400px) {
    .bg--aurora {
        height:246px;
        background-size: 3196px auto
    }
}

.bg--aurora:after,.bg--aurora:before {
    content: "";
    display: block;
    background-image: url(../asset-img-prism/bg/bg_aurora_sp.png);
    position: absolute;
    top: 0;
    left: 0;
    background-size: contain;
    background-repeat: no-repeat;
    width: 200%
}

.bg--aurora:before {
    height: 42vw;
    top: 0;
    background-repeat: repeat-x;
    opacity: 0;
    animation: aurora 120s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--aurora:before {
        height:33.7857142857vw;
        top: -17.8571428571vw;
        left: 0
    }
}

@media only screen and (min-width: 1400px) {
    .bg--aurora:before {
        height:473px;
        top: -250px
    }
}

.bg--aurora:after {
    height: 101.75vw;
    top: -16.5vw;
    background-repeat: repeat-x;
    opacity: 0;
    animation: aurora 90s infinite linear reverse
}

@media only screen and (min-width: 769px) {
    .bg--aurora:after {
        height:12vw;
        top: -19.2857142857vw;
        left: 0
    }
}

@media only screen and (min-width: 1400px) {
    .bg--aurora:after {
        height:168px;
        top: -270px
    }
}

.bg--cloud {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0
}

.bg--cloud__item {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1
}

.bg--cloud__item.i1 {
    background-image: url(../asset-img-prism/bg/bg_cloud_back_l.png);
    top: .5vw;
    left: -20.5vw;
    width: 32.75vw;
    height: 17.5vw;
    animation: cloud 12s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--cloud__item.i1 {
        top:16.8571428571vw;
        left: -4.1428571429vw;
        width: 18.7142857143vw;
        height: 10vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--cloud__item.i1 {
        top:236px;
        left: -58px;
        width: 262px;
        height: 140px
    }
}

.bg--cloud__item.i2 {
    background-image: url(../asset-img-prism/bg/bg_cloud_back_r.png);
    top: 28.5vw;
    left: 48vw;
    width: 67vw;
    height: 35vw;
    animation: cloud 14s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--cloud__item.i2 {
        top:11.7142857143vw;
        left: 71.4285714286vw;
        width: 38.2857142857vw;
        height: 20vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--cloud__item.i2 {
        top:164px;
        left: 1000px;
        width: 536px;
        height: 280px
    }
}

.bg--cloud__item.i3 {
    background-image: url(../asset-img-prism/bg/bg_cloud_back_c.png);
    top: 81vw;
    left: 75vw;
    width: 30.25vw;
    height: 16.125vw;
    animation: cloud 13s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--cloud__item.i3 {
        top:29.2857142857vw;
        left: 81.4285714286vw;
        width: 17.2857142857vw;
        height: 9.2142857143vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--cloud__item.i3 {
        top:410px;
        left: 1140px;
        width: 242px;
        height: 129px
    }
}

.bg--cloud__item.i4 {
    background-image: url(../asset-img-prism/bg/bg_cloud_front_l.png);
    top: 67vw;
    left: 4.5vw;
    width: 37.375vw;
    height: 17.25vw;
    animation: cloud 18s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--cloud__item.i4 {
        top:26.4285714286vw;
        left: 7.4285714286vw;
        width: 21.3571428571vw;
        height: 9.8571428571vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--cloud__item.i4 {
        top:370px;
        left: 104px;
        width: 299px;
        height: 138px
    }
}

.bg--cloud__item.i5 {
    background-image: url(../asset-img-prism/bg/bg_cloud_front_r.png);
    top: 36.5vw;
    left: 66.5vw;
    width: 35.5vw;
    height: 20vw;
    animation: cloud 20s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--cloud__item.i5 {
        top:16.5vw;
        left: 82.2857142857vw;
        width: 20.3571428571vw;
        height: 11.4285714286vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--cloud__item.i5 {
        top:231px;
        left: 1152px;
        width: 185px;
        height: 160px
    }
}

.bg--cloud__item.i6 {
    background-image: url(../asset-img-prism/bg/bg_cloud_front_c.png);
    top: 90vw;
    left: 59vw;
    width: 32.375vw;
    height: 15.375vw;
    animation: cloud 19s infinite linear
}

@media only screen and (min-width: 769px) {
    .bg--cloud__item.i6 {
        top:34.5714285714vw;
        left: 72.8571428571vw;
        width: 18.5vw;
        height: 8.7857142857vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--cloud__item.i6 {
        top:484px;
        left: 1020px;
        width: 259px;
        height: 123px
    }
}

.bg--moon {
    position: absolute;
    top: 4vw;
    left: 4vw;
    width: 24.75vw;
    height: 24.75vw;
    z-index: 2;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(../asset-img-prism/bg/bg_moon.png)
}

@media only screen and (min-width: 769px) {
    .bg--moon {
        top:0;
        left: 1.4285714286vw;
        width: 14.1428571429vw;
        height: 14.1428571429vw;
        animation: moon 6s infinite linear alternate
    }
}

@media only screen and (min-width: 1400px) {
    .bg--moon {
        left:20px;
        width: 198px;
        height: 198px
    }
}

.bg--star__item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    animation: shooting-star 2s infinite linear;
    opacity: 0
}

.bg--star__item:after,.bg--star__item:before {
    content: "";
    display: block;
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat
}

.bg--star__item:before {
    top: 0;
    right: 0;
    width: 91%;
    height: 91%;
    background-image: url(../asset-img-prism/bg/bg_shootingstar_tail.png);
    background-size: contain
}

.bg--star__item:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 14%;
    height: 14%;
    background-image: url(../asset-img-prism/bg/bg_shootingstar_head.png);
    background-size: contain;
    background-repeat: no-repeat;
    transform-origin: 50% 50%;
    animation: shooting-star-head 2.2s infinite linear
}

.bg--star__item.green:before {
    background-image: url(../asset-img-prism/bg/bg_shootingstar_tail_green.png)
}

.bg--star__item.green:after {
    background-image: url(../asset-img-prism/bg/bg_shootingstar_head_green.png)
}

.bg--star__item.pink:before {
    background-image: url(../asset-img-prism/bg/bg_shootingstar_tail_pink.png)
}

.bg--star__item.pink:after {
    background-image: url(../asset-img-prism/bg/bg_shootingstar_head_pink.png)
}

.bg--star__item.i1 {
    width: 19.25vw;
    height: 19.25vw;
    top: -11.5vw;
    left: 4vw
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i1 {
        width:11vw;
        height: 11vw;
        top: 5.7857142857vw;
        left: 10.5vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i1 {
        width:154px;
        height: 154px;
        top: 81px;
        left: 147px
    }
}

.bg--star__item.i2 {
    width: 19.25vw;
    height: 19.25vw;
    top: -11vw;
    left: 88vw;
    animation: shooting-star 2s infinite .8s linear
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i2 {
        width:11vw;
        height: 11vw;
        top: 5.2857142857vw;
        left: 34.7142857143vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i2 {
        width:154px;
        height: 154px;
        top: 74px;
        left: 486px
    }
}

.bg--star__item.i3 {
    width: 38.5vw;
    height: 38.5vw;
    top: 11.5vw;
    left: 9vw
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i3 {
        width:22vw;
        height: 22vw;
        top: 1.4285714286vw;
        left: 31.1428571429vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i3 {
        width:308px;
        height: 308px;
        top: 20px;
        left: 436px
    }
}

.bg--star__item.i4 {
    width: 38.5vw;
    height: 38.5vw;
    top: 3vw;
    left: 313vw;
    animation: shooting-star 2s infinite 1s linear
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i4 {
        width:11vw;
        height: 11vw;
        top: .8571428571vw;
        left: 89.4285714286vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i4 {
        width:154px;
        height: 154px;
        top: 12px;
        left: 1252px
    }
}

.bg--star__item.i5 {
    display: none
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i5 {
        display:block;
        width: 22vw;
        height: 22vw;
        top: -4.2857142857vw;
        left: 87.1428571429vw;
        animation: shooting-star 2s infinite .8s linear
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i5 {
        width:308px;
        height: 308px;
        top: -60px;
        left: 1220px
    }
}

.bg--star__item.i6 {
    display: none
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i6 {
        display:block;
        width: 11vw;
        height: 11vw;
        top: 21.7142857143vw;
        left: 87.8571428571vw;
        animation: shooting-star 2s infinite 1s linear
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i6 {
        width:154px;
        height: 154px;
        top: 304px;
        left: 1230px
    }
}

.bg--star__item.i7 {
    display: none
}

@media only screen and (min-width: 769px) {
    .bg--star__item.i7 {
        display:block;
        width: 18.1428571429vw;
        height: 18.1428571429vw;
        top: 14.5714285714vw;
        left: 110vw;
        animation: shooting-star 2s infinite 1s linear
    }
}

@media only screen and (min-width: 1400px) {
    .bg--star__item.i7 {
        width:254px;
        height: 254px;
        top: 204px;
        left: 1540px
    }
}

.bg--rainbow:before {
    content: "";
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    width: 100%;
    height: 90vw;
    bottom: 44vw;
    background-image: url(../asset-img-prism/bg/bg_rainbow_sp.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    -webkit-clip-path: polygon(0 0,0 0,0 100%,0 100%);
    clip-path: polygon(0 0,0 0,0 100%,0 100%);
    animation: rainbow 2s ease forwards;
    z-index: 3
}

@media only screen and (min-width: 769px) {
    .bg--rainbow:before {
        background-image:url(../asset-img-prism/bg/bg_rainbow_pc.png);
        background-size: 54.5vw 28.5vw;
        height: 28.5vw;
        bottom: 10vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--rainbow:before {
        background-size:763px 399px;
        height: 399px;
        bottom: 140px
    }
}

.bg--rainbow__cloud {
    position: absolute;
    background-repeat: no-repeat;
    width: 100%;
    height: 57.5vw;
    bottom: 35vw;
    background-image: url(../asset-img-prism/bg/bg_rainbow_btm_sp.png);
    background-size: 100vw 27vw;
    background-position: 50%;
    animation: rainbow-bottom 2s ease forwards;
    z-index: 3
}

@media only screen and (min-width: 769px) {
    .bg--rainbow__cloud {
        background-image:url(../asset-img-prism/bg/bg_rainbow_btm_pc.png);
        background-size: 98.5714285714vw 16.4285714286vw;
        height: 16.4285714286vw;
        bottom: 2.8571428571vw
    }
}

@media only screen and (min-width: 1400px) {
    .bg--rainbow__cloud {
        background-size:1380px 230px;
        height: 230px;
        bottom: 40px
    }
}

.bg--rainbow__cloud:after {
    content: "";
    display: block;
    position: absolute;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    top: -26vw;
    background-image: url(../asset-img-prism/bg/bg_rainbow_back_sp.png);
    background-size: 119%;
    background-position: 0;
    z-index: -4
}

@media only screen and (min-width: 769px) {
    .bg--rainbow__cloud:after {
        display:none
    }
}



::selection {
    background: #001518;
    color: #ffcedf
}

body,html {
    height: 100%;
    color: #000;
    background-color: #fff;
    font-family: "M PLUS 1p",sans-serif;
    -webkit-font-smoothing: antialiased
}

:focus {
    outline: 0
}

* {
    box-sizing: border-box
}

body {
    width: 100%
}

a {
    color: #000;
    text-decoration: none
}

h1,h2,h3 {
    line-height: 1
}

li,ul {
    list-style: none
}

td,th,tr {
    font-weight: 400;
    text-align: left
}

img,picture {
    width: 100%
}

.pc-none {
    display: none
}

@media only screen and (max-width: 769px) {
    .pc-none {
        display:block
    }
}

@media only screen and (max-width: 769px) {
    .sp-none {
        display:none
    }
}

.wrapper {
    position: relative;
    z-index: 2
}

</style>
