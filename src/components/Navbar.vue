<template>
  <div class="navbar">
    <v-row class="row">
      <v-col :cols="2" class="bg-wood left">
        <img src="../assets/Finex.png" alt="logo" height="37" />
      </v-col>
      <v-col :cols="10" class="bg-sunglow right">
        <div class="wrapper-hamburger">
          <button
            id="hamburger"
            name="hamburger"
            type="button"
            style="display: block"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button></div
      ></v-col>
    </v-row>
  </div>
</template>
<style lang="scss" scoped>
.v-row {
  margin: 0px;
}
.v-col-2,
.v-col-10 {
  padding: 0;
}
.navbar {
  height: 77px;
  .row {
    height: 100%;
    img {
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--textPrimary);
    }
    .right {
      border-bottom: 1px solid var(--textPrimary);
      display: flex;
      padding: 10px;
      align-items: center;
      .wrapper-hamburger {
        display: flex;
        align-items: center;
        .hamburger-line:nth-child(1) {
          width: 21px;
          margin: 2px 0;
          height: 6px;
          background-color: black;
          border-radius: 20px;
          display: block;
        }
        .hamburger-line:nth-child(2) {
          width: 42px;
          margin: 2px 0;
          height: 6px;
          background-color: black;
          border-radius: 20px;
          display: block;
        }
        .hamburger-line:nth-child(3) {
          width: 21px;
          margin: 0 2px 2px auto;
          height: 6px;
          background-color: black;
          border-radius: 20px;
          display: block;
        }
      }
    }
  }
}
</style>
