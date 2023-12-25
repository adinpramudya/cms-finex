<template>
  <div class="navbar">
    <v-row class="row">
      <v-col :cols="2" class="bg-wood left">
        <img src="../assets/Finex.png" alt="logo" height="37" />
      </v-col>
      <v-col :cols="10" class="bg-sunglow right">
        <div class="d-flex justify-space-between w-100">
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
            </button>
          </div>
          <v-row justify="end" class="ml-auto">
            <v-menu min-width="200px" rounded>
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                  <v-avatar color="brown" size="large">
                    <span class="text-h5">AD</span>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <div class="mx-auto text-center">
                    <v-avatar color="brown">
                      <span class="text-h5">AD</span>
                    </v-avatar>
                    <h3 class="mt-4">{{ currentUser?.username }}</h3>

                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="logout">
                      Logout
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-row>
        </div>
      </v-col>
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
<script>
import router from "@/router";
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";
import { ref } from "vue";

export default {
  data: () => ({}),
  methods: {
    logout() {
      this.app.logout();
    },
  },
  setup() {
    const currentUser = ref();
    const app = useAppStore();
    onMounted(() => {
      const storedTokenString = localStorage.getItem("currentUser");
      currentUser.value = storedTokenString
        ? JSON.parse(storedTokenString)
        : null;
    });
    return { currentUser, app };
  },
};
</script>
