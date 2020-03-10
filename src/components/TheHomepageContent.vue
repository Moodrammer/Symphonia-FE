<template>
    <v-content class="hero-home-bg-cover">
    </v-content>
</template>

<script>
export default {
    name: "HomepageContent",
}
</script>

<style scoped>

.hero-home-bg-cover {
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
font-size: 16px;
line-height: 1.5;
font-weight: 400;
font-family: Circular, Helvetica, Arial, sans-serif, Ruble;
-webkit-box-direction: normal;
color: #FFF;
box-sizing: border-box;
position: absolute;
left: 50%;
width: 1610px;
height: 1523px;
background: url("http://localhost:8080/hero-burst.svg") no-repeat;
background-position: top -410px center;
transform: translate(-50%, 0%);
background-color: currentColor;
}

</style>
