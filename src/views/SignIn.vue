<template>
  <div class="container-fluid bg-primary h-full overflow-hidden">
    <div
      :class="{
        'animate__animated animate__fadeInUp': !isShown,
        'animate__animated animate__fadeOutUp': isSignedIn,
        'animate__animated animate__headShake': isShown && isError
      }"
      class="flex flex-col content-center h-full justify-center max-w-xs mx-auto px-3 text-center text-white"
      @animationend="transitionEnd"
    >
      <div class="p-8 mx-auto">
        <img
          class="h-9 mx-auto"
          src="https://sr-cilengkrang.expos.id/public/koma/theme/default-dev/img/Logo-Horizontal.png"
          :alt="appName"
        />
      </div>
      <h3 style="" class="mb-2 text-2xl font-extrabold">
        Welcome back to {{ appName }}.
      </h3>
      <p class="mb-12 text-base">
        Please login with you username and password to access ExPOS.
      </p>
      <div>
        <input
          v-model="username"
          class="bg-white/20 hover:bg-white hover:placeholder-primary hover:text-primary mb-3 outline-none placeholder-white rounded py-2 px-3 w-full"
          placeholder="Username"
          @keyup.enter="signIn"
        />
      </div>
      <div class="group relative">
        <input
          v-model="password"
          :type="passwordType"
          class="bg-white/20 hover:bg-white hover:placeholder-primary hover:text-primary mb-3 outline-none placeholder-white rounded py-2 px-3 w-full"
          placeholder="Password"
          @keyup.enter="signIn"
        />
        <i
          class="fas fa-eye absolute cursor-pointer group-hover:text-primary hover:!text-white right-3 top-3"
          @click="isPasswordTypePlaintext = !isPasswordTypePlaintext"
        ></i>
      </div>
      <div class="my-4">
        <button
          :disabled="isButtonDisabled"
          class="bg-white duration-300 disabled:bg-white/40 disabled:cursor-not-allowed disabled:text-white ease-in-out hover:bg-white/40 hover:text-white py-2 px-6 rounded text-primary"
          @click="signIn"
        >
          <i class="fas fa-sign-in-alt"></i> Sign In
        </button>
        <a class="pl-5 ease-in-out text-sm text-white" href="/"
          >Forgot password?</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/assets/js/User.js";
import App from "@/assets/js/App.js";

export default {
  name: "SignIn",
  props: {},
  data: function () {
    return {
      isShown: false,
      isSignedIn: false,
      isError: false,
      username: "",
      password: "",
      isPasswordTypePlaintext: false
      // redirectURL: ""
    };
  },
  computed: {
    appName: function () {
      return this.$store.state.appName;
    },
    isButtonDisabled: function () {
      return this.username != "" && this.password != "" ? false : true;
    },
    passwordType: function () {
      return this.isPasswordTypePlaintext ? "text" : "password";
    }
  },
  mounted: function () {
    User.createDefaultUser();
    App.initAppDB();
  },
  methods: {
    signIn: function () {
      const self = this;

      User.signIn(this.username, this.password).then(function (response) {
        if (response === true) {
          self.$store.commit("signIn");
          self.isSignedIn = true;
        } else {
          self.isError = true;
        }
      });
    },
    transitionEnd: function () {
      if (!this.isSignedIn && !this.isError) {
        this.isShown = true;
      } else if (!this.isSignedIn && this.isError) {
        this.isError = false;
      } else {
        this.$router.push("/dashboard");
      }
    }
  }
};
</script>

<style scoped></style>
